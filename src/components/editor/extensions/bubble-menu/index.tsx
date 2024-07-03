import { isTextSelection } from "@tiptap/core";
import TTBubbleMenu, { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";

const BubbleMenu = TTBubbleMenu
  .configure
  //   {
  //   shouldShow: ({ view, state, from, to, editor }) => {
  //     const { doc, selection } = state;
  //     const { empty } = selection;

  //     const isEmptyTextBlock =
  //       !doc.textBetween(from, to).length && isTextSelection(state.selection);

  //     const hasEditorFocus = view.hasFocus();

  //     if (
  //       !hasEditorFocus ||
  //       empty ||
  //       isEmptyTextBlock ||
  //       !editor.isEditable ||
  //       editor.isActive("image")
  //     ) {
  //       return false;
  //     }

  //     return true;
  //   },
  // }
  ();

export { BubbleMenu };
