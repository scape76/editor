import { editorConfig } from "@/config/editor";
import TTBulletList from "@tiptap/extension-bullet-list";

export const BulletList = TTBulletList.configure({
  keepMarks: true,
  keepAttributes: true,
}).extend({
  addKeyboardShortcuts() {
    return {
      [editorConfig.shortcuts.bulletList]: () => {
        return this.editor.commands.toggleBulletList();
      },
    };
  },
});
