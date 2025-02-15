"use client";

import React from "react";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

import { useGetProjects } from "@/features/projects/api/use-get-projects";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  AlertTriangleIcon,
  CopyIcon,
  FileIcon,
  LoaderIcon,
  MoreHorizontalIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProjectsSection = () => {
  const router = useRouter();

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();

  if (status === "pending") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent projects</h3>
        <div className="jutify-center flex h-32 flex-col items-center gap-y-4">
          <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent projects</h3>
        <div className="jutify-center flex h-32 flex-col items-center gap-y-4">
          <AlertTriangleIcon className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Failed to load projects
          </p>
        </div>
      </div>
    );
  }

  if (!data.pages.length) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent projects</h3>
        <div className="jutify-center flex h-32 flex-col items-center gap-y-4">
          <SearchIcon className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No projects found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent projects</h3>
      <Table>
        <TableBody>
          {data.pages.map((group, index) => (
            <React.Fragment key={index}>
              {group.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    className="flex cursor-pointer items-center gap-x-2 font-medium"
                    onClick={() => router.push(`editor/${project.id}`)}
                  >
                    <FileIcon className="size-6" />
                    {project.name}
                  </TableCell>

                  <TableCell
                    className="hidden cursor-pointer md:table-cell"
                    onClick={() => router.push(`editor/${project.id}`)}
                  >
                    {project.width} x {project.height} px
                  </TableCell>

                  <TableCell
                    className="hidden cursor-pointer md:table-cell"
                    onClick={() => router.push(`editor/${project.id}`)}
                  >
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </TableCell>

                  <TableCell className="flex items-center justify-end">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="[&_svg]:size-4"
                          disabled={false}
                        >
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-60" align="end">
                        <DropdownMenuItem
                          className="h-10 cursor-pointer [&_svg]:size-4"
                          disabled={false}
                          onClick={() => {}}
                        >
                          <CopyIcon className="mr-2" />
                          <span>Make a copy</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="h-10 cursor-pointer [&_svg]:size-4"
                          disabled={false}
                          onClick={() => {}}
                        >
                          <TrashIcon className="mr-2" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      {hasNextPage && (
        <div className="jusitfy-center flex w-full items-center pt-4">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};
