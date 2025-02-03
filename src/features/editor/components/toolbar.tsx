import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const selectedObject = editor?.canvas.getActiveObject();

  const getProperty = (property: any) => {
    if (!selectedObject) return null;

    return selectedObject.get(property);
  };

  const fillColor = editor?.getActiveFillColor();

  const [properties, setProperties] = useState({ fillColor });

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />
    );
  }

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      <Hint label="Color" side="bottom" sideOffset={5}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onChangeActiveTool("fill")}
          className={cn(activeTool === "fill" && "bg-gray-100")}
        >
          <div
            className="size-4 rounded-md border"
            style={{ backgroundColor: fillColor }}
          />
        </Button>
      </Hint>
    </div>
  );
};
