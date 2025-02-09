import { fabric } from "fabric";
import { useEvent } from "react-use";

interface UseHotKeysProps {
  canvas: fabric.Canvas | null;
  undo: () => void;
  redo: () => void;
  save: (skip?: boolean) => void;
  copy: () => void;
  paste: () => void;
}

export const useHotkeys = ({
  canvas,
  undo,
  redo,
  save,
  copy,
  paste,
}: UseHotKeysProps) => {
  useEvent("keydown", (event) => {
    const isCtrlKey = event.ctrlKey || event.metaKey;
    const isBackspace = event.key === "Backspace";
    const isInput = ["INPUT", "TEXTAREA"].includes(
      (event.target as HTMLElement).tagName,
    );

    if (isInput) return;

    // Backspace = Delete
    if (isBackspace) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }

    // Del = Delete
    if (event.key === "Delete") {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }

    // Ctrl + z = Undo
    if (isCtrlKey && event.key === "z") {
      event.preventDefault();
      undo();
    }

    // Ctrl + y = Redo
    if (isCtrlKey && event.key === "y") {
      event.preventDefault();
      redo();
    }

    // Ctrl + c = Copy
    if (isCtrlKey && event.key === "c") {
      event.preventDefault();
      copy();
    }

    // Ctrl + v = Paste
    if (isCtrlKey && event.key === "v") {
      event.preventDefault();
      paste();
    }

    // Ctrl + s = Save
    if (isCtrlKey && event.key === "s") {
      event.preventDefault();
      save(true);
    }

    // Ctrl + a = 객체 모두 선택
    if (isCtrlKey && event.key === "a") {
      event.preventDefault();
      canvas?.discardActiveObject();

      const allObjects = canvas
        ?.getObjects()
        .filter((object) => object.selectable);

      canvas?.setActiveObject(
        new fabric.ActiveSelection(allObjects, { canvas }),
      );

      canvas?.renderAll();
    }
  });
};
