import { useCurrentEditor } from "@/context/editor-context";

export function EditorHTML() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const html = editor.getHTML();

  return <span>{html}</span>;
}
