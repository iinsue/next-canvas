"use client";

import { useFilePicker } from "use-file-picker";
import { useMutationState } from "@tanstack/react-query";

import { ActiveTool, Editor } from "@/features/editor/types";
import { Logo } from "@/features/editor/components/logo";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CiFileOn as CiFileOnIcon } from "react-icons/ci";
import {
  BsCloudCheck as BsCloudCheckIcon,
  BsCloudSlash as BsCloudSlashIcon,
} from "react-icons/bs";
import {
  ChevronDownIcon,
  DownloadIcon,
  LoaderIcon,
  MousePointerClickIcon,
  Redo2Icon,
  Undo2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@/features/auth/components/user-button";

interface NavbarProps {
  id: string;
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Navbar = ({
  id,
  editor,
  activeTool,
  onChangeActiveTool,
}: NavbarProps) => {
  const data = useMutationState({
    filters: {
      mutationKey: ["project", { id }],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });

  const currentStatus = data[data.length - 1];

  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";

  // 파일열기
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="flex h-[68px] w-full items-center gap-x-8 border-b p-4 lg:pl-[34px]">
      <Logo />
      <div className="flex h-full w-full items-center gap-x-1">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              File <ChevronDownIcon className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2 [&_svg]:size-8"
              onClick={() => openFilePicker()}
            >
              <CiFileOnIcon />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-2" />

        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("select")}
            className={cn(activeTool === "select" && "bg-gray-100")}
          >
            <MousePointerClickIcon className="size-4" />
          </Button>
        </Hint>

        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button
            disabled={!editor?.canUndo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.onUndo()}
            className="" // TODO: 동적 스타일 추가
          >
            <Undo2Icon className="size-4" />
          </Button>
        </Hint>

        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button
            disabled={!editor?.canRedo()}
            variant="ghost"
            size="icon"
            onClick={() => editor?.onRedo()}
            className="" // TODO: 동적 스타일 추가
          >
            <Redo2Icon className="size-4" />
          </Button>
        </Hint>

        <Separator orientation="vertical" className="mx-2" />

        {isPending && (
          <div className="flex items-center gap-x-2">
            <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Saving...</div>
          </div>
        )}

        {!isPending && !isError && (
          <div className="flex items-center gap-x-2">
            <BsCloudCheckIcon className="size-5 text-green-600" />
            <div className="text-xs text-muted-foreground">Saved</div>
          </div>
        )}

        {!isPending && isError && (
          <div className="flex items-center gap-x-2">
            <BsCloudSlashIcon className="size-5 text-destructive" />
            <div className="text-xs text-muted-foreground">Failed to save</div>
          </div>
        )}

        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Export
                <DownloadIcon className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2 [&_svg]:size-8"
                onClick={() => editor?.saveJson()}
              >
                <CiFileOnIcon />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-x-2 [&_svg]:size-8"
                onClick={() => editor?.savePng()}
              >
                <CiFileOnIcon />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-x-2 [&_svg]:size-8"
                onClick={() => editor?.saveJpg()}
              >
                <CiFileOnIcon />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex items-center gap-x-2 [&_svg]:size-8"
                onClick={() => editor?.saveSvg()}
              >
                <CiFileOnIcon />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UserButton />
        </div>
      </div>
    </nav>
  );
};
