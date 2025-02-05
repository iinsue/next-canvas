import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { useGetImages } from "@/features/images/api/use-get-images";

import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ActiveTool, Editor } from "@/features/editor/types";
import { AlertTriangleIcon, LoaderIcon } from "lucide-react";

interface ImageSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ImageSidebarProps) => {
  const { data, isLoading, isError } = useGetImages();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "images" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your canvas"
      />

      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
          <AlertTriangleIcon className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Fail to fetch images</p>
        </div>
      )}

      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.map((image) => {
                return (
                  <button
                    key={image.id}
                    onClick={() => editor?.addImage(image.urls.regular)}
                    className="group relative h-[100px] w-full overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
                  >
                    <Image
                      fill
                      src={image.urls.small}
                      alt={image.alt_description || "Image"}
                      className="object-cover"
                    />
                    <Link
                      target="_blank"
                      href={image.links.html}
                      className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 transition hover:underline group-hover:opacity-100"
                    >
                      {image.user.name}
                    </Link>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
