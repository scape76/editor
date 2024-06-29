import * as React from "react";
import TTHighlight from "@tiptap/extension-highlight";
import { editorConfig } from "@/config/editor";

export const Highlight = TTHighlight.extend({
  addStorage() {
    return {
      color: editorConfig.defaultHighlight,
    };
  },
  addKeyboardShortcuts() {
    return {
      [editorConfig.shortcuts.highlight]: () => {
        if (this.editor.isActive("highlight")) {
          return this.editor.chain().focus().unsetHighlight().run();
        } else {
          return this.editor
            .chain()
            .focus()
            .setHighlight({ color: this.storage.color })
            .run();
        }
      },
    };
  },
}).configure({
  multicolor: true,
});
