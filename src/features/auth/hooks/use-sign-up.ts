import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

// /api/users의 POST요청타입
type ResponseType = InferResponseType<(typeof client.api.users)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.users)["$post"]>["json"];

// Error는 기본 Native Error 타입
export const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.users.$post({ json });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(`${errorJson.error}`);
      }

      return await response.json();
    },
    onError: (error) => {
      toast.error(`${error.message}`, { id: "error" });
    },
    onSuccess: () => {
      toast.success("User created", { id: "success" });
    },
  });

  return mutation;
};
