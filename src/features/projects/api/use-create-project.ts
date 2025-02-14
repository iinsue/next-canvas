import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

// /api/ai/generate의 POST요청타입
type ResponseType = InferResponseType<
  (typeof client.api.projects)["$post"],
  200 // error를 제외하기 위해 추가
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)["$post"]
>["json"];

// Error는 기본 Native Error 타입
export const useCreateProject = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Project created", { id: "success" });

      // TODO: Invalidate "projects" query
    },
    onError: () => {
      toast.error("Failed to create project", { id: "error" });
    },
  });

  return mutation;
};
