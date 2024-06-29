"use client";

import * as React from "react";

import StarterKit from "@tiptap/starter-kit";
import { Link } from "./extensions/link";
import { Highlight } from "./extensions/highlight";
import { EditorBubbleMenu } from "./bubble-menu";
import "@/styles/editor.css";
import { EditorContent } from "./editor-content";
import { EditorProvider } from "@/context/editor-context";
import { LinkBubbleMenu } from "./link-bubble-menu";
import { textareaVariants } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Strike } from "./extensions/strike";
import { Heading } from "./extensions/heading";
import { Paragraph } from "./extensions/paragraph";
import { EditorHTML } from "./editor-html";
import { Bold } from "./extensions/bold";
import { Italic } from "./extensions/italic";

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
];

const content = `<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://scape76.com"><strong>Hello World!</strong></a></p><p><mark data-color="#a29797" style="background-color: #a29797; color: inherit">highlighting is fun!</mark></p><p><strong>some old bold style</strong></p><p><s>strikethough</s></p>`;

export interface EditorProps {
  onMount: () => void;
}

export function Editor({ onMount }: EditorProps) {
  React.useEffect(() => {
    onMount();
  }, []);

  return (
    <>
      <EditorProvider content={content} extensions={extensions}>
        <EditorContent />
        {/* {withFloatingMenu && <EditorFloatingMenu />} */}
        <EditorBubbleMenu />
        <LinkBubbleMenu />
        <EditorHTML />
      </EditorProvider>
    </>
  );
}

export const EditorSkeleton = () => {
  return (
    <div className={cn(textareaVariants(), "cursor-not-allowed opacity-50")}>
      <Skeleton className="h-5 w-64" />
    </div>
  );
};
