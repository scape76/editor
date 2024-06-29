import { useEffect } from "react";
import { valibotResolver } from "@hookform/resolvers/valibot";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentEditor } from "@/context/editor-context";
import { useForm } from "react-hook-form";
import { LinkSchemaInputs, linkSchema } from "@/lib/validations/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronLeft } from "lucide-react";

interface EditLinkProps {
  close: () => void;
}

export function EditLink({ close }: EditLinkProps) {
  const { editor } = useCurrentEditor();

  const form = useForm<LinkSchemaInputs>({
    resolver: valibotResolver(linkSchema),
    defaultValues: {
      href: "",
      text: "",
    },
  });

  useEffect(() => {
    const selection = editor?.state.selection;

    const text = selection
      ? editor?.state.doc.textBetween(selection.from, selection.to, " ")
      : "";

    const href = editor?.getAttributes("link").href ?? "";

    form.reset({ href, text });
  }, [editor, editor?.state.selection]);

  if (!editor) return null;

  const onSubmit = ({ href, text }: LinkSchemaInputs) => {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .insertContent({
        type: "text",
        text,
        marks: [
          {
            type: "link",
            attrs: {
              href,
              target: "_blank",
            },
          },
        ],
      })
      .setLink({ href })
      .run();
    close();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-2">
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="href"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Href</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between items-center">
          <Button
            type="button"
            size={"icon"}
            variant={"outline"}
            aria-label="Cancel editing"
            onClick={close}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button type="submit" className="ml-auto">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
