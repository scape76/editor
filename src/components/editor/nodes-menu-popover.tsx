import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useCurrentEditor } from "@/context/editor-context";
import { ButtonProps } from "react-day-picker";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Editor } from "@tiptap/react";

export const nodesMenuItems = {
  paragraph: {
    title: "Paragraph",
    icon: Icons.paragraph,
  },
  h1: {
    title: "Heading 1",
    icon: Icons.h1,
  },
  h2: {
    title: "Heading 2",
    icon: Icons.h2,
  },
  h3: {
    title: "Heading 3",
    icon: Icons.h3,
  },
  h4: {
    title: "Heading 4",
    icon: Icons.h4,
  },
};

const getCurrentNodePresentation = (editor: Editor) => {
  if (editor.isActive("heading", { level: 1 })) return nodesMenuItems["h1"];
  else if (editor.isActive("heading", { level: 2 }))
    return nodesMenuItems["h2"];
  else if (editor.isActive("heading", { level: 3 }))
    return nodesMenuItems["h3"];
  else if (editor.isActive("heading", { level: 4 }))
    return nodesMenuItems["h4"];
  return nodesMenuItems["paragraph"];
};

export function NodesMenuPopover() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const { title, icon: Icon } = getCurrentNodePresentation(editor);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Icon className="size-4 mr-2" />
          {title}
          <ChevronDown className="size-4 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!w-[150px]" variant={"toolbar"}>
        <div className="grid gap-1 w-full">
          <NodeButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            active={editor.isActive("paragraph")}
          >
            <Icons.paragraph className="size-4 mr-2" />
            Paragraph
          </NodeButton>
          <NodeButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
          >
            <Icons.h1 className="size-4 mr-2" />
            Heading 1
          </NodeButton>
          <NodeButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            <Icons.h2 className="size-4 mr-2" />
            Heading 2
          </NodeButton>
          <NodeButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
          >
            <Icons.h3 className="size-4 mr-2" />
            Heading 3
          </NodeButton>
          <NodeButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            active={editor.isActive("heading", { level: 4 })}
          >
            <Icons.h4 className="size-4 mr-2" />
            Heading 4
          </NodeButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function NodeButton({
  className,
  children,
  active = false,
  ...props
}: ButtonProps & { active?: boolean }) {
  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className={cn("justify-start", { "bg-accent": active }, className)}
      {...props}
    >
      {children}
      {active && <Icons.check className="size-4 ml-auto" />}
    </Button>
  );
}
