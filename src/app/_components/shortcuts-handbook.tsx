import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { editorConfig } from "@/config/editor";
import { cn, shortcutToKbd } from "@/lib/utils";
import { Level } from "@tiptap/extension-heading";
import { Book } from "lucide-react";

export function ShortcutsHandbook() {
  return (
    <Accordion type="single" collapsible className="w-full mb-4">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center">
            Shortcuts <Book className="size-4 ml-2" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-3">
          <div>
            <Shortcut>{shortcutToKbd(editorConfig.shortcuts.bold)}</Shortcut> to
            toggle <strong>bold</strong> mark
          </div>
          <div>
            <Shortcut>{shortcutToKbd(editorConfig.shortcuts.italic)}</Shortcut>{" "}
            to toggle <i>italic</i> mark
          </div>
          <div>
            <Shortcut>{shortcutToKbd(editorConfig.shortcuts.strike)}</Shortcut>{" "}
            to toggle <s>strikethrough</s> mark
          </div>
          <div>
            <Shortcut>
              {shortcutToKbd(editorConfig.shortcuts.highlight)}
            </Shortcut>{" "}
            to toggle{" "}
            <mark
              style={{
                backgroundColor: editorConfig.defaultHighlight,
                color: "#fff",
              }}
            >
              highlight
            </mark>{" "}
            mark
          </div>
          <div>
            <Shortcut>
              {shortcutToKbd(
                editorConfig.shortcuts.heading("(1,4)" as unknown as Level)
              )}
            </Shortcut>{" "}
            to apply heading node
          </div>
          <div>
            <Shortcut>
              {shortcutToKbd(editorConfig.shortcuts.paragraph)}
            </Shortcut>{" "}
            to apply paragraph node
          </div>
          <div>
            <Shortcut>
              {shortcutToKbd(editorConfig.shortcuts.bulletList)}
            </Shortcut>{" "}
            to apply bullet list node
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function Shortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "rounded border bg-muted px-1.5 py-0.5 text-sm tracking-widest opacity-80",
        className
      )}
      {...props}
    />
  );
}
