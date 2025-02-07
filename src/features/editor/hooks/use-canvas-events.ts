import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  save,
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", () => save());
      canvas.on("object:removed", () => save());
      canvas.on("object:modified", () => save());

      // Shape 생성
      canvas.on("selection:created", (event) => {
        setSelectedObjects(event.selected ?? []);
      });

      // 선택한 Shape 수정
      canvas.on("selection:updated", (event) => {
        setSelectedObjects(event.selected ?? []);
      });

      // Shape선택해제
      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:added");
        canvas.off("selection:removed");
        canvas.off("selection:modified");
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [save, canvas, setSelectedObjects, clearSelectionCallback]);
};
