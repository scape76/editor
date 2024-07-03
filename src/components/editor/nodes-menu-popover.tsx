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
    onClick: (editor: Editor) => editor.chain().focus().setParagraph().run(),
    isActive: (editor: Editor) => editor.isActive("paragraph"),
  },
  h1: {
    title: "Heading 1",
    icon: Icons.h1,
    onClick: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 1 }),
  },
  h2: {
    title: "Heading 2",
    icon: Icons.h2,
    onClick: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 2 }),
  },
  h3: {
    title: "Heading 3",
    icon: Icons.h3,
    onClick: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 3 }),
  },
  h4: {
    title: "Heading 4",
    icon: Icons.h4,
    onClick: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 4 }),
  },
  bulletList: {
    title: "Bullet list",
    icon: Icons.ul,
    onClick: (editor: Editor) =>
      editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive("bulletList"),
  },
};

const nodeItems = Object.values(nodesMenuItems);

export function NodesMenuPopover() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const { title, icon: Icon } =
    nodeItems.find((item) => item.isActive(editor)) ?? nodeItems[0];

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
          {nodeItems.map(({ title, onClick, isActive, icon: Icon }, i) => (
            <NodeButton
              onClick={() => onClick(editor)}
              active={isActive(editor)}
              key={i}
            >
              <Icon className="size-4 mr-2" />
              {title}
            </NodeButton>
          ))}
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
