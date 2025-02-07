import { z } from "zod";
import { Hono } from "hono";
import { replicate } from "@/lib/replicate";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .post(
    "/generate-image",
    // Add verification
    zValidator("json", z.object({ prompt: z.string() })),

    async (context) => {
      const { prompt } = context.req.valid("json");

      const input = {
        prompt: prompt,
        go_fast: true,
        megapixels: "1",
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "webp",
        output_quality: 80,
        num_inference_steps: 4,
      };

      const output = await replicate.run("black-forest-labs/flux-schnell", {
        input,
      });

      const response = output as Array<string>;

      // 이미지를 파일형태로 반환하고 싶을때 사용할 코드
      // 이때 lib/relicate.ts 에서 useFileOutput:false를 true로 변경하던지 삭제해야 합니다.
      /* const response = output as ReadableStream[];
    const reader = response[0].getReader();
    const result = await reader.read();
    const imageData = result.value;
    // Blob으로 변환하고 URL 생성
    const blob = new Blob([imageData], { type: "image/webp" });
    const imageUrl = URL.createObjectURL(blob); */

      return context.json({ data: response[0] });
    },
  )
  .post(
    "/remove-bg",
    zValidator("json", z.object({ image: z.string() })),
    async (context) => {
      const { image } = context.req.valid("json");

      const input = { image: image };

      const output: unknown = await replicate.run(
        "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
        { input },
      );

      const response = output as string;

      return context.json({ data: response });
    },
  );

export default app;
