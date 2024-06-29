import { editorConfig } from "@/config/editor";
import TTHeading, { Level } from "@tiptap/extension-heading";

const headingLevels = Array.from({ length: 4 }).map((_, i) => i + 1);

export const Heading = TTHeading.extend({
  addKeyboardShortcuts() {
    return {
      ...headingLevels.reduce(
        (acc, level) => ({
          ...acc,
          [editorConfig.shortcuts.heading(level as Level)]: () => {
            return this.editor
              .chain()
              .focus()
              .toggleHeading({ level: level as Level })
              .run();
          },
        }),
        {}
      ),
    };
  },
});
