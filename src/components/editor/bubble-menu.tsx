import { BubbleMenu, BubbleMenuProps } from "@tiptap/react";
import { useCurrentEditor } from "@/context/editor-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  popoverVariants,
} from "../ui/popover";
import { Toggle } from "../ui/toggle";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Separator } from "../ui/separator";
import { NodesMenuPopover } from "./nodes-menu-popover";
import { SetLinkPopover } from "./extensions/link/_components/set-link-popover";
import { HighlightToggle } from "./extensions/highlight/_components/highlight-toggle";

interface EditorBubbleMenuProps
  extends Omit<BubbleMenuProps, "children" | "editor"> {
  children?: React.ReactNode;
}

export function EditorBubbleMenu({
  children,
  ...props
}: EditorBubbleMenuProps) {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <BubbleMenu
      pluginKey={"my-bubble-menu"}
      editor={editor}
      {...props}
      className={cn(
        popoverVariants({ variant: "toolbar" }),
        "flex items-center gap-1 !max-w-auto !w-auto"
      )}
      tippyOptions={{ maxWidth: "auto" }}
    >
      <NodesMenuPopover />
      <Separator orientation="vertical" className="h-8" />
      <Toggle
        size={"sm"}
        pressed={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Icons.bold className="size-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Icons.italic className="size-4" />
      </Toggle>
      <Toggle
        size={"sm"}
        pressed={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Icons.strikethrough className="size-4" />
      </Toggle>
      <SetLinkPopover />
      <HighlightToggle />
      {children}
    </BubbleMenu>
  );
}
