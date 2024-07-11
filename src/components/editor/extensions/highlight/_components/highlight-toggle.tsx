import { memo, useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { Icons } from "@/components/icons";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import { useCurrentEditor } from "@/context/editor-context";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import { debounce } from "lodash";

export function HighlightToggle() {
  const [open, setOpen] = useState(false);
  const { editor } = useCurrentEditor();
  const [color, setColor] = useState(editor.storage.highlight.color);

  const isActive = editor.isActive("highlight");

  const onColorChange = useCallback(
    (color: string) => {
      editor.storage.highlight.color = color;
      editor.chain().focus().setHighlight({ color }).run();
      setColor(color);
    },
    [editor]
  );

  return (
    <div className="flex">
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
        <Icons.highlight className="size-4" highlightColor={color} />
      </Toggle>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} className="h-8 px-0.5">
            <ChevronDown className="size-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto" align="start" side="top">
          <ColorPicker color={color} onChange={onColorChange} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

const ColorPicker = memo(
  ({ color, onChange }: { color: string; onChange: (c: string) => void }) => {
    return <HexColorPicker color={color} onChange={debounce(onChange, 200)} />;
  }
);

ColorPicker.displayName = "ColorPicker";
