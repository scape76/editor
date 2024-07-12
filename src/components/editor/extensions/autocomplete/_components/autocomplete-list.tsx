import * as React from "react";
import { cn } from "@/lib/utils";
import { AutocompleteItem } from "../types";
import { motion } from "framer-motion";

interface AutocompleteListProps {
  items: AutocompleteItem[];
  onSelect: (item: AutocompleteItem | null) => void;
}

export function AutocompleteList({ items, onSelect }: AutocompleteListProps) {
  const [active, setActive] = React.useState(0);

  const last = () => setActive(items.length - 1);

  const first = () => setActive(0);

  const next = (e: KeyboardEvent) => {
    e.preventDefault();

    if (e.metaKey) {
      last();
    } else {
      setActive((p) => (p + 1 == items.length ? 0 : p + 1));
    }
  };

  const prev = (e: KeyboardEvent) => {
    e.preventDefault();

    if (e.metaKey) {
      first();
    } else {
      setActive((p) => (p - 1 < 0 ? items.length - 1 : p - 1));
    }
  };

  React.useEffect(() => {
    setActive((prev) => {
      if (prev >= items.length) {
        return 0;
      }

      return prev;
    });
  }, [items]);

  React.useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown": {
          next(e);
          break;
        }
        case "ArrowUp": {
          prev(e);
          break;
        }
        case "Home": {
          e.preventDefault();
          first();
          break;
        }
        case "End": {
          e.preventDefault();
          last();
          break;
        }
        case "Enter": {
          e.preventDefault();
          onSelect(items.length ? items[active] : null);
          break;
        }
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [items, active]);

  if (!items.length) return null;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      initial={{ opacity: 0 }}
      className="h-full w-full overflow-hidden bg-popover text-popover-foreground rounded-md"
    >
      <ul className="overflow-hidden p-1 text-foreground flex flex-col gap-1">
        {items.map((item, i) => (
          <li
            role="button"
            key={item.value}
            className={cn(
              "text-xs text-muted-foreground p-1 rounded-md hover:bg-accent w-full text-start relative",
              { "bg-accent": active === i }
            )}
            onClick={() => {
              onSelect(item);
            }}
          >
            {item.label} :{item.value}:
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
