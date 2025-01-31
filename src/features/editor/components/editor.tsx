"use client";

import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { useEditor } from "@/features/editor/hooks/use-editor";

export const Editor = () => {
  const { init } = useEditor();

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
  }, [init]);

  return (
    <div className="flex h-full flex-col">
      <div className="absolute flex h-full w-full">
        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <div ref={containerRef} className="h-full flex-1 bg-muted">
            <canvas ref={canvasRef} />
          </div>
        </main>
      </div>
    </div>
  );
};
