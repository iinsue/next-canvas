"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "@/features/editor/components/editor";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface EditorProjectPageProps {
  projectId: string;
}

const EditorProjectIdPage = ({
  params,
}: {
  params: Promise<EditorProjectPageProps>;
}) => {
  const { projectId } = use(params);
  const { data, isLoading, isError } = useGetProject(projectId);

  if (isLoading || !data) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-5">
        <TriangleAlertIcon className="size-6 text-muted-foreground" />
        <p className="font-semibold text-muted-foreground">
          Fail to fetch project
        </p>
        <Button asChild>
          <Link href="/">
            <span className="font-semibold">Back to Home</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Editor initialData={data} />
    </>
  );
};

export default EditorProjectIdPage;
