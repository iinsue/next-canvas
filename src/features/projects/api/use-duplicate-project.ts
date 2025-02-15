import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["duplicate"]["$post"],
  200 // error Response 타입은 제외하기 위해 추가
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["duplicate"]["$post"]
>["param"];

// Error는 기본 Native Error 타입
export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.projects[":id"].duplicate.$post({
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to duplicate project");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Failed to duplicate project", { id: "error" });
    },
  });

  return mutation;
};
