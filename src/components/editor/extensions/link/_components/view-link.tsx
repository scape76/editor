import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCurrentEditor } from "@/context/editor-context";

interface ViewLinkProps {
  onEdit: () => void;
}

export function ViewLink({ onEdit }: ViewLinkProps) {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const { href, target } = editor.getAttributes("link");

  return (
    <div className="flex items-center gap-2">
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : ""}
        className="underline text-blue-400"
      >
        {href}
      </a>
      <Separator orientation="vertical" className="h-6" />
      <Button size="xs" variant={"ghost"} onClick={onEdit}>
        <Icons.edit className="size-4" />
      </Button>
      <Button
        size="xs"
        variant={"ghost"}
        onClick={() => {
          editor.commands.unsetLink();
        }}
      >
        <Icons.unlink className="size-4" />
      </Button>
    </div>
  );
}
