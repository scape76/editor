import { editorConfig } from "@/config/editor";
import TTItalic from "@tiptap/extension-bold";

export const Italic = TTItalic.extend({
  addKeyboardShortcuts() {
    return {
      [editorConfig.shortcuts.italic]: () => {
        return this.editor.chain().focus().toggleItalic().run();
      },
    };
  },
});
