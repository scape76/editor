import { Level } from "@tiptap/extension-heading";

export const editorConfig = {
  defaultHighlight: "#a29797",
  shortcuts: {
    heading: (level: Level) => `Mod-shift-${level}`,
    paragraph: "Mod-shift-p",
    highlight: "Mod-h",
    strike: "Mod-s",
    italic: "Mod-i",
    bold: "Mod-b",
    bulletList: "Mod-shift-b",
  },
};
