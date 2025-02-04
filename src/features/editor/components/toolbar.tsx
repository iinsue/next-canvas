import { cn } from "@/lib/utils";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { ActiveTool, Editor } from "@/features/editor/types";

import { BsBorderWidth as BsBorderWidthIcon } from "react-icons/bs";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

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
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />
    );
  }

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      <div className="flex h-full items-center justify-center">
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

      <div className="flex h-full items-center justify-center">
        <Hint label="Stroke color" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("stroke-color")}
            className={cn(activeTool === "stroke-color" && "bg-gray-100")}
          >
            <div
              className="size-4 rounded-md border-2 bg-white"
              style={{ borderColor: strokeColor }}
            />
          </Button>
        </Hint>
      </div>

      <div className="flex h-full items-center justify-center">
        <Hint label="Stroke width" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("stroke-width")}
            className={cn(
              "[&_svg]:size-4",
              activeTool === "stroke-width" && "bg-gray-100",
            )}
          >
            <BsBorderWidthIcon />
          </Button>
        </Hint>
      </div>

      <div className="flex h-full items-center justify-center">
        <Hint label="Bring forward" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.bringForward()}
            className="[&_svg]:size-4"
          >
            <ArrowUpIcon />
          </Button>
        </Hint>
      </div>

      <div className="flex h-full items-center justify-center">
        <Hint label="Send backwards" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor?.sendBackwards()}
            className="[&_svg]:size-4"
          >
            <ArrowDownIcon />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
