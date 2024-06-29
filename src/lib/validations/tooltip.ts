import * as vb from "valibot";

export const tooltipSchema = vb.object({
  text: vb.pipe(
    vb.string(),
    vb.minLength(1, "Should be minimum 1 character long")
  ),
  description: vb.pipe(vb.string(), vb.minLength(1, "Should be minimum 1 character long")),
});

export type TooltipSchemaInputs = vb.InferOutput<typeof tooltipSchema>;
