import { useState, useEffect } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCurrentEditor } from "@/context/editor-context";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LinkSchemaInputs, linkSchema } from "@/lib/validations/link";
import { valibotResolver } from "@hookform/resolvers/valibot";

interface SetLinkPopoverProps {}

export function SetLinkPopover({}: SetLinkPopoverProps) {
  const [open, setOpen] = useState(false);

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
    const selectedText = selection
      ? editor?.state.doc.textBetween(selection.from, selection.to, " ")
      : "";

    form.reset({ text: selectedText });
  }, [editor?.state.selection]);

  if (!editor) return null;

  const onSubmit = ({ text, href }: LinkSchemaInputs) => {
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

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="xs" variant={"ghost"} disabled={editor.isActive("link")}>
          <Icons.link className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-2"
          >
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
            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
