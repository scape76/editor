import * as React from "react";
import { BubbleMenu } from "@tiptap/react";
import { useCurrentEditor } from "@/context/editor-context";
import emojis from "../emojis.json";
import { AutocompleteList } from "./autocomplete-list";
import {
  getInputBounds,
  getResolvedInputBounds,
  isAutocompleteActive,
} from "../helpers";
import { AutocompleteItem } from "../types";

export function AutocompleteBubbleMenu() {
  const [input, setInput] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [currentBounds, setCurrentBounds] = React.useState<null | {
    start: number;
    end: number;
  }>(null);

  const { editor } = useCurrentEditor();

  React.useEffect(() => {
    const { doc } = editor.view.state;
    const pos = doc.resolve(editor.state.selection.anchor);

    const nodeText = pos.parent.textContent;
    const offset = pos.parentOffset;

    const shouldShow = isAutocompleteActive(editor.view.state);

    if (shouldShow) {
      const { start, end } = getInputBounds(nodeText, offset);
      const input = nodeText.slice(start + 1, end);
      setCurrentBounds(getResolvedInputBounds(nodeText, offset, pos.pos));
      setInput(input);
      setShow(true);
    } else {
      setCurrentBounds(null);
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
    (item: AutocompleteItem | null) => {
      if (!currentBounds || !item) return;
      const { tr } = editor.view.state;

      const transaction = tr.insertText(
        item.label,
        currentBounds.start,
        currentBounds.end
      );

      editor.view.dispatch(transaction);
    },
    [editor.view.state, editor.state.selection, currentBounds]
  );

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ placement: "bottom-start" }}
      shouldShow={({ editor }) => {
        return isAutocompleteActive(editor.view.state);
      }}
    >
      {show && <AutocompleteList items={filteredItems} onSelect={onSelect} />}
    </BubbleMenu>
  );
}
