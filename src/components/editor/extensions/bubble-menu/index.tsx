import TTBubbleMenu, { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";

const BubbleMenu = TTBubbleMenu.configure({
  shouldShow: () => false,
});

export { BubbleMenu };
