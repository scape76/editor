import { useState } from "react";
import { BubbleMenu } from "@tiptap/react";
import { useCurrentEditor } from "@/context/editor-context";
import { ViewLink } from "./extensions/link/_components/view-link";
import { popoverVariants } from "../ui/popover";
import { cn } from "@/lib/utils";
import { EditLink } from "./extensions/link/_components/edit-link";

export function LinkBubbleMenu() {
  const { editor } = useCurrentEditor();

  const [showEdit, setShowEdit] = useState(false);

  return (
    <BubbleMenu
      shouldShow={({ editor }) => editor.isActive("link")}
      editor={editor}
      tippyOptions={{ placement: "bottom-start", maxWidth: "auto" }}
      className={cn(popoverVariants({ variant: "toolbar" }), "px-2")}
    >
      {showEdit ? (
        <EditLink close={() => setShowEdit(false)} />
      ) : (
        <ViewLink onEdit={() => setShowEdit(true)} />
      )}
    </BubbleMenu>
  );
}
