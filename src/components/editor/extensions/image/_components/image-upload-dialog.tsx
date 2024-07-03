import { useEffect, useState } from "react";
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

export function ImageUploadDialog() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    console.log("in here!");
    const listener = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "i" && e.ctrlKey && e.shiftKey) {
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <Dialog>
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
          maxFiles={8}
          maxSize={8 * 1024 * 1024}
          onValueChange={setFiles}
        />
      </DialogContent>
    </Dialog>
  );
}
