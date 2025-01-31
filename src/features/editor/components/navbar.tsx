"use client";

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
import { BsCloudCheck as BsCloudCheckIcon } from "react-icons/bs";
import {
  ChevronDownIcon,
  DownloadIcon,
  MousePointerClickIcon,
  Redo2Icon,
  Undo2Icon,
} from "lucide-react";

export const Navbar = () => {
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
              onClick={() => {
                // TODO: JSON 파일열기기능
              }}
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
            onClick={() => {
              // TODO: 포인터 전환 기능
            }}
            className="" // TODO: 동적 스타일 추가
          >
            <MousePointerClickIcon className="size-4" />
          </Button>
        </Hint>

        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              // TODO: 뒤로 되돌리기 기능
            }}
            className="" // TODO: 동적 스타일 추가
          >
            <Undo2Icon className="size-4" />
          </Button>
        </Hint>

        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              // TODO: 앞으로 되돌리기 기능
            }}
            className="" // TODO: 동적 스타일 추가
          >
            <Redo2Icon className="size-4" />
          </Button>
        </Hint>

        <Separator orientation="vertical" className="mx-2" />

        <div className="flex items-center gap-x-2">
          <BsCloudCheckIcon className="size-5 text-muted-foreground" />
          <div className="text-xs text-muted-foreground">Saved</div>
        </div>

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
                onClick={() => {
                  //TODO: JSON파일로 저장
                }}
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
                onClick={() => {
                  //TODO: PNG파일로 저장
                }}
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
                onClick={() => {
                  //TODO: JPG파일로 저장
                }}
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
                onClick={() => {
                  //TODO: SVG파일로 저장
                }}
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
          {/* TODO: 사용자 버튼  */}
        </div>
      </div>
    </nav>
  );
};
