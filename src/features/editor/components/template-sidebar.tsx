import Image from "next/image";

import { cn } from "@/lib/utils";

import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ActiveTool, Editor } from "@/features/editor/types";
import { AlertTriangleIcon, LoaderIcon } from "lucide-react";
import {
  ResponseType,
  useGetTemplates,
} from "@/features/projects/api/use-get-templates";
import { useConfirm } from "@/hooks/use-confirm";

interface ImageSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const TemplateSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ImageSidebarProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to replace the current project with this template.",
  );

  const { data, isLoading, isError } = useGetTemplates({
    limit: "20",
    page: "1",
  });

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = async (template: ResponseType["data"][0]) => {
    // TODO: Check if template is pro
    const ok = await confirm();
    if (ok) {
      editor?.loadJson(template.json);
    }
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "templates" ? "visible" : "hidden",
      )}
    >
      <ConfirmDialog />
      <ToolSidebarHeader
        title="Templates"
        description="Choose from a variety of templates to get started"
      />

      {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && (
        <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
          <AlertTriangleIcon className="size-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Fail to fetch templates
          </p>
        </div>
      )}

      <ScrollArea>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.map((template) => {
                return (
                  <button
                    key={template.id}
                    onClick={() => onClick(template)}
                    className="group relative w-full overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
                    style={{
                      aspectRatio: `${template.width}/${template.height}`,
                    }}
                  >
                    <Image
                      fill
                      src={template.thumbnailUrl ?? ""}
                      alt={template.name ?? "Template"}
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 transition group-hover:opacity-100">
                      {template.name}
                    </div>
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
