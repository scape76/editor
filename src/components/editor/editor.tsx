"use client";

import * as React from "react";

import "@/styles/editor.css";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent } from "./editor-content";
import { EditorProvider } from "@/context/editor-context";
import { LinkBubbleMenu } from "./link-bubble-menu";
import { textareaVariants } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import {
  Strike,
  Heading,
  Bold,
  BulletList,
  Highlight,
  Italic,
  Link,
  Paragraph,
  Image,
  BubbleMenu,
} from "./extensions";
import { EditorHTML } from "./editor-html";
import { AutocompleteBubbleMenu } from "./extensions/autocomplete/_components/autocomplete-bubble-menu";
import { Autocomplete } from "./extensions/autocomplete";
import { EditorToolbar } from "./editor-toolbar";

// define your extensions right here
const extensions = [
  StarterKit,
  Link,
  Highlight,
  Strike,
  Heading,
  Paragraph,
  Bold,
  Italic,
  BulletList,
  Image,
  BubbleMenu,
  Autocomplete,
];

const content = `<p></p><p>Look 😃 at these emojis 💛</p><p>you can start typing <code>:</code> for an autocomplete.</p><p></p><p>You can checkout <a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/scape76/editor">github </a>repo to see the implementation</p><p></p><img src="https://scape76.com/thorfinn.webp" width="162">`;

export interface EditorProps {
  onMount: () => void;
}

export function Editor({ onMount }: EditorProps) {
  React.useEffect(() => {
    onMount();
  }, []);

  return (
    <div className="relative">
      <EditorProvider content={content} extensions={extensions}>
        <EditorToolbar />
        <EditorContent />
        {/* <EditorBubbleMenu /> */}
        <LinkBubbleMenu />
        {process.env.NODE_ENV === "development" && <EditorHTML />}
        <AutocompleteBubbleMenu />
      </EditorProvider>
    </div>
  );
}

export const EditorSkeleton = () => {
  return (
    <div
      className={cn(
        textareaVariants(),
        "cursor-not-allowed opacity-50 flex flex-col gap-2"
      )}
    >
      <Skeleton className="h-6 w-[265px]" />
      <Skeleton className="h-6 w-[320px]" />
      <Skeleton className="h-6 w-64" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};
