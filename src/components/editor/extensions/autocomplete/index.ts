import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { isAutocompleteActive } from "./helpers";

export const Autocomplete = Extension.create({
  name: "autocomplete",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("eventHandler"),
        props: {
          handleKeyDown: (view, event) => {
            if (event.key === "Enter" && !event.shiftKey)
              return isAutocompleteActive(view.state);
          },
        },
      }),
    ];
  },
});
