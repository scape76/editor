import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export * from "./with";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortcutToKbd(shortcut: string) {
  return shortcut
    .replaceAll("Mod", "⌘")
    .replaceAll("shift", "⇧")
    .replaceAll("-", " + ")
    .toUpperCase();
}
