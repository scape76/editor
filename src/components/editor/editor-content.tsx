import { EditorContent as TTEditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { textareaVariants } from "../ui/textarea";
import { useCurrentEditor } from "@/context/editor-context";

export function EditorContent() {
  const { editor } = useCurrentEditor();

  return (
    <TTEditorContent
      editor={editor}
      className={cn(
        textareaVariants(),
        "outline-none relative rounded-b-md rounded-t-none border-t-0",
        {
          "outline-none": editor?.isFocused,
          "cursor-not-allowed opacity-50": !editor?.isEditable,
        }
      )}
    />
  );
}
