import { EditorState } from "@tiptap/pm/state";

export function isAutocompleteActive(state: EditorState) {
  const pos = state.doc.resolve(state.selection.anchor);

  const parentText = pos.parent.textContent;
  const parentOffset = pos.parentOffset;

  let currentIdx = parentOffset - 1;

  while (currentIdx >= 0) {
    if (parentText[currentIdx] === " ") return false;
    if (parentText[currentIdx] === ":") return true;
    currentIdx--;
  }

  return false;
}

export function getInputBounds(parentText: string, parentOffset: number) {
  let start = parentOffset,
    end = parentOffset;

  while (parentText[start] != ":" && start > 0) {
    start--;
  }

  while (parentText[end] != " " && end < parentText.length) {
    end++;
  }

  return { start, end };
}

export function getResolvedInputBounds(
  parentText: string,
  parentOffset: number,
  resolvedPos: number
) {
  let start = parentOffset,
    end = parentOffset;

  let resStart = resolvedPos,
    resEnd = resolvedPos;

  while (parentText[start] != ":" && start > 0) {
    start--;
    resStart--;
  }

  while (parentText[end] != " " && end < parentText.length) {
    end++;
    resEnd++;
  }

  return { start: resStart, end: resEnd };
}
