import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { Editor } from "@/features/editor/types";

import { MinimizeIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";

interface FooterProps {
  editor: Editor | undefined;
}

export const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className="z-[49] flex h-[52px] w-full shrink-0 flex-row-reverse items-center gap-x-1 overflow-x-auto border-t bg-white p-2 px-4">
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor?.autoZoom()}
          className="h-full [&_svg]:size-4"
        >
          <MinimizeIcon />
        </Button>
      </Hint>

      <Hint label="Zoom in" side="top" sideOffset={10}>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor?.zoomIn()}
          className="h-full [&_svg]:size-4"
        >
          <ZoomInIcon />
        </Button>
      </Hint>

      <Hint label="Zoom in" side="top" sideOffset={10}>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor?.zoomOut()}
          className="h-full [&_svg]:size-4"
        >
          <ZoomOutIcon />
        </Button>
      </Hint>
    </footer>
  );
};
