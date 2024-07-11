import { useCurrentEditor } from "@/context/editor-context";
import { BubbleMenu } from "@tiptap/react";
import emojis from "./emojis.json";
import * as React from "react";
import { AutocompleteList } from "./autocomplete-list";
import { AutocompleteItem } from "..";
import { getInputBounds, shouldShowMenu } from "./helpers";

export function AutocompleteBubbleMenu() {
  const [input, setInput] = React.useState("");
  const [show, setShow] = React.useState(false);

  const { editor } = useCurrentEditor();

  React.useEffect(() => {
    const { doc } = editor.view.state;
    const pos = doc.resolve(editor.state.selection.anchor);

    const nodeText = pos.parent.textContent;
    const offset = pos.parentOffset;

    const shouldShow = shouldShowMenu(nodeText, offset);

    if (shouldShow) {
      const [start, end] = getInputBounds(nodeText, offset);
      const input = nodeText.slice(start + 1, end);
      setInput(input);
      setShow(true);
    } else {
      setShow(false);
    }
  }, [editor.view.state, editor.state.selection]);

  const filteredItems = React.useMemo(() => {
    const filtered = emojis
      .filter((item) => {
        return item.value.includes(input);
      })
      .splice(0, 5);
    return filtered;
  }, [input]);

  const onSelect = React.useCallback(
    (item: AutocompleteItem) => {
      const { doc } = editor.view.state;
      const pos = doc.resolve(editor.state.selection.anchor);
    },
    [editor.view.state]
  );

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ placement: "bottom-start" }}
      shouldShow={({ editor, view }) => {
        const { schema, doc, tr } = view.state;
        const pos = doc.resolve(editor.state.selection.anchor);

        const shouldShow = shouldShowMenu(
          pos.parent.textContent,
          pos.parentOffset
        );

        console.log("show: ", shouldShow);

        return shouldShow;
      }}
    >
      <AutocompleteList items={filteredItems} onSelect={onSelect} />
    </BubbleMenu>
  );
}
