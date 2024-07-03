"use client";

import * as React from "react";

import StarterKit from "@tiptap/starter-kit";
import { EditorBubbleMenu } from "./bubble-menu";
import "@/styles/editor.css";
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
} from "./extensions";
import { EditorHTML } from "./editor-html";
import { EditorFloatingMenu } from "./floating-menu";
import { ImageUploadDialog } from "./extensions/image/_components/image-upload-dialog";

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
        <EditorBubbleMenu />
        <LinkBubbleMenu />
        <EditorHTML />
        <ImageUploadDialog />
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
