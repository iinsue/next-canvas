import { InferResponseType } from "hono";
import { useInfiniteQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

// 성공시 반환되는 타입
export type ResponseType = InferResponseType<
  (typeof client.api.projects)["$get"],
  200
>;

export const useGetProjects = () => {
  const query = useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      // Client에서 Query는 String으로 넘겨야 합니다.
      // Server에서 Coerce를 통해 Number로 변환합니다.
      const response = await client.api.projects.$get({
        query: {
          page: (pageParam as number).toString(),
          limit: "5",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }

      return response.json();
    },
  });

  return query;
};
