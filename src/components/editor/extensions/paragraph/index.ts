import { editorConfig } from "@/config/editor";
import TTParagraph from "@tiptap/extension-paragraph";

export const Paragraph = TTParagraph.extend({
  addKeyboardShortcuts() {
    return {
        [editorConfig.shortcuts.paragraph]: () => {
        return this.editor.chain().focus().setParagraph().run();
      },
    };
  },
});
