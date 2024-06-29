import { PropsWithChildren, createContext, useContext } from "react";
import { useEditor, type Editor } from "@tiptap/react";
import { EditorOptions } from "@tiptap/core";

interface EditorContextValue {
  editor: Editor | null;
}

const EditorContext = createContext<EditorContextValue>({ editor: null });

const useCurrentEditor = () => {
  const editorContext = useContext(EditorContext);

  if (!editorContext || !editorContext.editor) {
    throw new Error("useCurrentEditor should be used within <EditorProvider>");
  }

  return editorContext as { editor: Editor };
};

export type EditorProviderProps = PropsWithChildren<Partial<EditorOptions>>;

function EditorProvider({ children, ...editorOptions }: EditorProviderProps) {
  const editor = useEditor(editorOptions);

  if (!editor) {
    return null;
  }

  return (
    <EditorContext.Provider value={{ editor }}>
      {children}
    </EditorContext.Provider>
  );
}

export { EditorProvider, useCurrentEditor };
