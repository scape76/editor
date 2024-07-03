// taken from https://github.com/sadmann7/file-uploader

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUploader } from "@/components/file-uploader";
import { Icons } from "@/components/icons";
import { useCurrentEditor } from "@/context/editor-context";

export function ImageUploadDialog() {
  const { editor } = useCurrentEditor();

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      console.log(e.key === "i", e.shiftKey, e.metaKey || e.ctrlKey);
      if (
        (e.key === "i" || e.key === "I") &&
        e.shiftKey &&
        (e.metaKey || e.ctrlKey)
      ) {
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const onUpload = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (file?.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        editor.chain().setImage({ src: url }).focus().run();
      }
    },
    [editor]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"xs"}>
          <Icons.image className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
          maxFiles={1}
          maxSize={1 * 1024 * 1024}
          onValueChange={(files) => onUpload(files)}
        />
      </DialogContent>
    </Dialog>
  );
}
