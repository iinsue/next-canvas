import { cn } from "@/lib/utils";

import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { ScrollArea } from "@/components/ui/scroll-area";

import { ActiveTool, Editor, filters } from "@/features/editor/types";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "filter" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Filter"
        description="Apply a filter to selected image"
      />

      <ScrollArea>
        <div className="space-y-1 border-b p-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="lg"
              onClick={() => editor?.changeImageFilter(filter)}
              className="h-16 w-full justify-start text-left"
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
