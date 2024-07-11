import { cn } from "@/lib/utils";
import * as React from "react";
import { AutocompleteItem } from "..";

interface AutocompleteListProps {
  items: AutocompleteItem[];
  onSelect: (item: AutocompleteItem) => void;
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
    const listener = (e: KeyboardEvent) => {
      switch (e.key) {
        case "n":
        case "j":
        case "ArrowDown": {
          next(e);
          break;
        }
        case "p":
        case "k":
        case "ArrowUp": {
          console.log("in here!");
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
          e.stopPropagation();
          onSelect(items[active]);
          break;
        }
      }
      // e.preventDefault();
      // e.stopPropagation();
    };
    if (items.length) window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [items, active]);

  if (!items.length) return null;

  return (
    <div className="h-full w-full overflow-hidden rounded-md bg-popover text-popover-foreground rounded-md">
      <ul className="overflow-hidden p-1 text-foreground flex flex-col gap-1">
        {items.map((item, i) => (
          <span
            key={item.value}
            className={cn("text-xs text-muted-foreground p-1 rounded-md", {
              "bg-accent": active == i,
            })}
          >
            {item.label} :{item.value}:
          </span>
        ))}
      </ul>
    </div>
  );
}
