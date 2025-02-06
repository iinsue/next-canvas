import { z } from "zod";
import { Hono } from "hono";
import { replicate } from "@/lib/replicate";
import { zValidator } from "@hono/zod-validator";

const app = new Hono().post(
  "/generate-image",
  // Add verification
  zValidator("json", z.object({ prompt: z.string() })),

  async (context) => {
    const { prompt } = context.req.valid("json");

    const input = {
      prompt:
        'black forest gateau cake spelling out the words "FLUX SCHNELL", tasty, food photography, dynamic shot',
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

    return context.json({ data: response[0] });
  },
);

export default app;
