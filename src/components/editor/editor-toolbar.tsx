import { Toolbar } from "@/components/ui/toolbar";
import { useCurrentEditor } from "@/context/editor-context";
import { NodesMenuPopover } from "./nodes-menu-popover";
import { Separator } from "../ui/separator";
import { Icons } from "../icons";
import { SetLinkPopover } from "./extensions/link/_components/set-link-popover";
import { HighlightToggle } from "./extensions/highlight/_components/highlight-toggle";
import { ToolbarButton } from "./_components/toolbar-button";
import { Toggle } from "../ui/toggle";
import { ImageUploadDialog } from "./extensions/image/_components/image-upload-dialog";

export function EditorToolbar() {
  const { editor } = useCurrentEditor();

  return (
    <Toolbar className="supports-backdrop-blur:bg-background/60 sticky p-2 left-0 top-[-5px] z-[20] w-full rounded-t-lg border-b border bg-background/95 backdrop-blur">
      <NodesMenuPopover />
      <Separator orientation="vertical" className="h-8" />
      <ToolbarButton
        size={"sm"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        tip="bold"
        asChild
      >
        <Toggle pressed={editor.isActive("bold")}>
          <Icons.bold className="size-4" />
        </Toggle>
      </ToolbarButton>
      <ToolbarButton
        asChild
        tip="italic"
        size={"sm"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Toggle pressed={editor.isActive("italic")}>
          <Icons.italic className="size-4" />
        </Toggle>
      </ToolbarButton>
      <ToolbarButton
        asChild
        tip="strikethrough"
        size={"sm"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Toggle pressed={editor.isActive("strike")}>
          <Icons.strikethrough className="size-4" />
        </Toggle>
      </ToolbarButton>
      <SetLinkPopover />
      <HighlightToggle />
      <ImageUploadDialog />
    </Toolbar>
  );
}
