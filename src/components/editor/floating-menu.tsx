import { FloatingMenu, FloatingMenuProps } from "@tiptap/react";
import { useCurrentEditor } from "@/context/editor-context";
import { popoverVariants } from "../ui/popover";

interface EditorFloatingMenuProps
  extends Omit<FloatingMenuProps, "children" | "editor"> {
  children?: React.ReactNode;
}

export function EditorFloatingMenu({
  children,
  ...props
}: EditorFloatingMenuProps) {
  const { editor } = useCurrentEditor();

  return (
    <FloatingMenu
      editor={editor}
      {...props}
      className={popoverVariants({ variant: "toolbar" })}
    >
      This is the floating menu
      {children}
    </FloatingMenu>
  );
}
