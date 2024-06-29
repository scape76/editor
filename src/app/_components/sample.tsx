"use client";

import * as React from "react";
import { Editor, EditorSkeleton } from "@/components/editor/editor";
import { Icons } from "@/components/icons";
import { Switch } from "@/components/ui/switch";

export function Sample() {
  const [isMounted, setIsMounted] = React.useState(false);

  return (
    <section className="w-full">
      {!isMounted && <EditorSkeleton />}
      <Editor onMount={() => setIsMounted(true)} />
    </section>
  );
}
