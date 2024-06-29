import * as vb from "valibot";

export const linkSchema = vb.object({
  text: vb.pipe(
    vb.string(),
    vb.minLength(1, "Should be minimum 1 character long")
  ),
  href: vb.pipe(vb.string(), vb.url("Should be a real URL")),
});

export const editLinkSchema = vb.omit(linkSchema, ["text"]);

export type LinkSchemaInputs = vb.InferOutput<typeof linkSchema>;
export type EditLinkSchemaInputs = vb.InferOutput<typeof editLinkSchema>;
