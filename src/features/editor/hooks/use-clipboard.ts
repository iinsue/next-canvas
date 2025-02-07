import { fabric } from "fabric";
import { useCallback, useRef } from "react";

interface UseClipboardProps {
  canvas: fabric.Canvas | null;
}

export const useClipboard = ({ canvas }: UseClipboardProps) => {
  const clipboard = useRef<any>(null);

  const copy = useCallback(() => {
    canvas?.getActiveObject()?.clone((cloned: any) => {
      clipboard.current = cloned;
    });
  }, [canvas]);

  const paste = useCallback(() => {
    if (!clipboard.current) return;

    clipboard.current.clone((clonedObj: any) => {
      canvas?.discardActiveObject();

      // 복제된 객체는 원본과 구별하기위해 살짝 왼쪽에 생성
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      });

      if (clonedObj.type === "activeSelection") {
        clonedObj.canvas = canvas;
        clonedObj.forEachObject((object: any) => {
          canvas?.add(object);
        });
        clonedObj.setCoords();
      } else {
        canvas?.add(clonedObj);
      }

      clipboard.current.left += 10;
      clipboard.current.top += 10;
      canvas?.setActiveObject(clonedObj);
      canvas?.requestRenderAll();
    });
  }, [canvas]);

  return { copy, paste };
};
