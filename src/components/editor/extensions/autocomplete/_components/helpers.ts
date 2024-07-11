export function shouldShowMenu(parentText: string, parentOffset: number) {
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

  while (parentText[end] != " " && end != parentText.length) {
    end++;
  }

  return [start, end] as const;
}
