import { getMarkRange } from "@tiptap/core";
import {
  LinkOptions as TiptapLinkOptions,
  Link as TTLink,
} from "@tiptap/extension-link";
import { Plugin, TextSelection, Selection } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { GeneralOptions } from "@/types";

export interface LinkOptions
  extends TiptapLinkOptions,
    GeneralOptions<LinkOptions> {}

// export const Link = TTLink.extend<LinkOptions>({
//   inclusive: false,
//   addOptions() {
//     return { ...this.parent?.(), openOnClick: true,
//         button: ({editor, t}) => {
//             return {
//                 component: LinkEditPop
//             }
//         }
//      };
//   },
// });

export const Link = TTLink.extend({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleClick: (view: EditorView, pos: number) => {
            const { schema, doc, tr } = view.state;
            const range = getMarkRange(doc.resolve(pos), schema.marks.link);
            if (!range) return false;
            const $start = doc.resolve(range.from);
            const $end = doc.resolve(range.to);
            const transaction = tr.setSelection(
              new TextSelection($start, $end)
            );
            view.dispatch(transaction);
          },
        },
      }),
    ];
  },
}).configure({
  openOnClick: false,
  autolink: false,
  linkOnPaste: false,
});
