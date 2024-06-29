import { editorConfig } from "@/config/editor";
import TTBold from "@tiptap/extension-bold";

export const Bold = TTBold.extend({
  addKeyboardShortcuts() {
    return {
      [editorConfig.shortcuts.bold]: () => {
        return this.editor.chain().focus().toggleBold().run();
      },
    };
  },
});
