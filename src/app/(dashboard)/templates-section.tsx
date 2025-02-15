"use client";

import {
  ResponseType,
  useGetTemplates,
} from "@/features/projects/api/use-get-templates";

import { LoaderIcon, TriangleAlertIcon } from "lucide-react";

import { TemplateCard } from "./template-card";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { useRouter } from "next/navigation";

export const TemplatesSection = () => {
  const router = useRouter();
  const mutation = useCreateProject();

  const { data, isLoading, isError } = useGetTemplates({
    page: "1",
    limit: "4",
  });

  const onClick = (template: ResponseType["data"][0]) => {
    // TODO: Check if template is Pro

    mutation.mutate(
      {
        name: `${template.name} project`,
        json: template.json,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Start from a template</h3>
        <div className="flex h-32 items-center justify-center">
          <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Start from a template</h3>
        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <TriangleAlertIcon className="size-6 text-muted-foreground" />
          <p>Failed to load templates</p>
        </div>
      </div>
    );
  }

  if (!data?.length) return null;

  return (
    <div className="text-lg font-semibold">
      <h3>Start from a template</h3>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {data?.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name}
            imageSrc={template.thumbnailUrl ?? ""}
            disabled={mutation.isPending}
            description={`${template.width} x ${template.height} px`}
            width={template.width}
            height={template.height}
            onClick={() => onClick(template)}
            isPro={template.isPro}
          />
        ))}
      </div>
    </div>
  );
};
