import { useState } from "react";
import { HexColorPicker } from "react-colorful";

import { Icons } from "@/components/icons";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import { useCurrentEditor } from "@/context/editor-context";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function HighlightToggle() {
  const [open, setOpen] = useState(false);
  const { editor } = useCurrentEditor();
  const [color, setColor] = useState(editor.storage.highlight.color);

  const isActive = editor.isActive("highlight");

  return (
    <div className="flex gap-2">
      <Toggle
        size={"sm"}
        pressed={isActive}
        onClick={() => {
          if (isActive) {
            editor.chain().focus().unsetHighlight().run();
          } else {
            editor.chain().focus().setHighlight({ color }).run();
          }
        }}
      >
        <Icons.highlight className="size-4" />
      </Toggle>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(toggleVariants({ size: "sm" }), "px-4")}
          style={{ background: color }}
        ></PopoverTrigger>
        <PopoverContent className="w-auto">
          <HexColorPicker
            color={color}
            onChange={(color) => {
              editor.storage.highlight.color = color;
              setColor(color);
            }}
          ></HexColorPicker>
        </PopoverContent>
      </Popover>
    </div>
  );
}
