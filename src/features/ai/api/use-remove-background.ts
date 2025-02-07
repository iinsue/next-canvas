import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

// /api/ai/generate의 POST요청타입
type ResponseType = InferResponseType<
  (typeof client.api.ai)["remove-bg"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.ai)["remove-bg"]["$post"]
>["json"];

// Error는 기본 Native Error 타입
export const useRemoveBg = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.ai["remove-bg"].$post({ json });
      return await response.json();
    },
  });

  return mutation;
};
