import { useState } from "react";

import { cn } from "@/lib/utils";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { isTextType } from "@/features/editor/utils";

import { ActiveTool, Editor, FONT_WEIGHT } from "@/features/editor/types";

import { RxTransparencyGrid } from "react-icons/rx";
import {
  FaBold as FaBoldIcon,
  FaItalic as FaItalicIcon,
  FaStrikethrough as FaStrikethroughIcon,
  FaUnderline as FaUnderlineIcon,
} from "react-icons/fa";
import { BsBorderWidth as BsBorderWidthIcon } from "react-icons/bs";
import {
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
} from "lucide-react";

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
  // fontWeight만 state로 별도로 관리하지 않고 통일성있게 properties에서 관리하도록 수정
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() ?? FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLinethrough = editor?.getActiveFontLinethrough();
  const initialFontUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontWeight: initialFontWeight,
    fontFamily: initialFontFamily,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
  });

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);

  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) return;

    editor?.changeTextAlign(value);
    setProperties((current) => ({ ...current, textAlign: value }));
  };

  const toggleBold = () => {
    if (!selectedObject) return;

    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor?.changeFontWeight(newValue);
    setProperties((current) => ({ ...current, fontWeight: newValue }));
  };

  const toggleItalic = () => {
    if (!selectedObject) return;

    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";

    editor?.changeFontStyle(newValue);
    setProperties((current) => ({ ...current, fontStyle: newValue }));
  };

  const toggleLinethrough = () => {
    if (!selectedObject) return;

    const newValue = properties.fontLinethrough ? false : true;

    editor?.changeFontLinethrough(newValue);
    setProperties((current) => ({ ...current, fontLinethrough: newValue }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) return;

    const newValue = properties.fontUnderline ? false : true;

    editor?.changeFontUnderline(newValue);
    setProperties((current) => ({ ...current, fontUnderline: newValue }));
  };

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
              style={{ backgroundColor: properties.fillColor }}
            />
          </Button>
        </Hint>
      </div>

      {!isText && (
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
                style={{ borderColor: properties.strokeColor }}
              />
            </Button>
          </Hint>
        </div>
      )}

      {!isText && (
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
      )}

      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onChangeActiveTool("font")}
              className={cn(
                "w-auto px-2 text-sm font-medium [&_svg]:size-4",
                activeTool === "font" && "bg-gray-100",
              )}
            >
              <div className="max-w-[100px] truncate">
                {properties.fontFamily}
              </div>
              <ChevronDownIcon className="ml-2" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBold}
              className={cn(
                "[&_svg]:size-4",
                properties.fontWeight > 500 && "bg-gray-100",
              )}
            >
              <FaBoldIcon />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleItalic}
              className={cn(
                "[&_svg]:size-4",
                properties.fontStyle === "italic" && "bg-gray-100",
              )}
            >
              <FaItalicIcon />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleUnderline}
              className={cn(
                "[&_svg]:size-4",
                properties.fontUnderline && "bg-gray-100",
              )}
            >
              <FaUnderlineIcon />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Strike" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLinethrough}
              className={cn(
                "[&_svg]:size-4",
                properties.fontLinethrough && "bg-gray-100",
              )}
            >
              <FaStrikethroughIcon />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Align left" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onChangeTextAlign("left")}
              className={cn(
                "[&_svg]:size-4",
                properties.textAlign === "left" && "bg-gray-100",
              )}
            >
              <AlignLeftIcon />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Align center" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onChangeTextAlign("center")}
              className={cn(
                "[&_svg]:size-4",
                properties.textAlign === "center" && "bg-gray-100",
              )}
            >
              <AlignCenterIcon />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex h-full items-center justify-center">
          <Hint label="Align right" side="bottom" sideOffset={5}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onChangeTextAlign("right")}
              className={cn(
                "[&_svg]:size-4",
                properties.textAlign === "right" && "bg-gray-100",
              )}
            >
              <AlignRightIcon />
            </Button>
          </Hint>
        </div>
      )}

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

      <div className="flex h-full items-center justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("opacity")}
            className={cn(
              activeTool === "opacity" && "bg-gray-100",
              "[&_svg]:size-4",
            )}
          >
            <RxTransparencyGrid />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
