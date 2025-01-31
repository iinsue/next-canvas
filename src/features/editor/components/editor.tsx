"use client";

import { fabric } from "fabric";
import { useEffect, useRef } from "react";

import { useEditor } from "@/features/editor/hooks/use-editor";

import { Footer } from "@/features/editor/components/footer";
import { Navbar } from "@/features/editor/components/navbar";
import { Toolbar } from "@/features/editor/components/toolbar";
import { Sidebar } from "@/features/editor/components/sidebar";

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
      <Navbar />
      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar />
        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar />
          <div
            ref={containerRef}
            className="h-[calc(100%-124px)] flex-1 bg-muted"
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};
