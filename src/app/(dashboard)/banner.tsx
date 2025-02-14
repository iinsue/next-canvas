"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useCreateProject } from "@/features/projects/api/use-create-project";

import { Button } from "@/components/ui/button";

import { ArrowRight, SparklesIcon } from "lucide-react";

export const Banner = () => {
  const router = useRouter();
  const mutation = useCreateProject();

  const onClick = () => {
    mutation.mutate(
      {
        name: "Untitled project",
        json: "",
        width: 900,
        height: 1200,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      },
    );
  };

  return (
    <>
      <div
        className={cn(
          "flex aspect-[5/1] min-h-[248px] items-center gap-x-6 rounded-xl p-6",
          "bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5]",
        )}
      >
        <div className="hidden size-28 items-center justify-center rounded-full bg-white/50 md:flex">
          <div className="flex size-20 items-center justify-center rounded-full bg-white">
            <SparklesIcon className="h-20 fill-[#0073ff] text-[#0073ff]" />
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <h1 className="text-xl font-semibold text-white md:text-3xl">
            Visualize your ideas with Canvas
          </h1>
          <p className="mb-2 text-xs text-white md:text-sm">
            Turn inspiration into design in no time. Simply upload an image and
            let AI do the rest.
          </p>
          <Button
            variant="secondary"
            className="w-[160px] [&_svg]:size-4"
            onClick={onClick}
            disabled={mutation.isPending}
          >
            <span className="text-sm font-semibold">Start creating</span>
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </>
  );
};
