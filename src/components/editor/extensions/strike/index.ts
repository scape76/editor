import { editorConfig } from "@/config/editor";
import TTStrike from "@tiptap/extension-strike";

export const Strike = TTStrike.extend({
  addKeyboardShortcuts() {
    return {
      [editorConfig.shortcuts.strike]: () => {
        return this.editor.chain().focus().toggleStrike().run();
      },
    };
  },
});
