// taken from https://github.com/Seedsa/echo-editor/blob/main/src/type.ts

import type {
  Editor as CoreEditor,
  Extension,
  JSONContent,
} from "@tiptap/core";
import type { Editor } from "@tiptap/react";
import { Icons } from "@/components/icons";
export type { Editor, JSONContent } from "@tiptap/core";

/**
 * Represents the general options for Tiptap extensions.
 */
export interface GeneralOptions<T> {
  /** Enabled divider */
  divider: boolean;
  /** Enabled spacer */
  spacer: boolean;
  /** Button view function */
  button: ButtonView<T>;
  /** Show on Toolbar */
  toolbar?: boolean;
}

/**
 * Represents the props for the ButtonView component.
 */
export interface ButtonViewReturnComponentProps {
  /** Method triggered when action is performed */
  action?: (value?: any) => void;
  /** Whether it is in the active state */
  isActive?: () => boolean;
  /** Button icon */
  icon?: keyof typeof Icons;
  /** Text displayed on hover */
  tooltip?: string;
  [x: string]: any;
}

/**
 * Represents the slots for the ButtonView component.
 */
export interface ButtonViewReturnComponentSlots {
  /** Dialog slot */
  dialog: () => any;
  [x: string]: () => any;
}

/**
 * Represents the return value for the ButtonView component.
 */
export interface ButtonViewReturn {
  /** Component */
  component: unknown;
  /** Component props */
  componentProps: ButtonViewReturnComponentProps;
  /** Component slots */
  componentSlots?: ButtonViewReturnComponentSlots;
}

/**
 * Represents the parameters for the ButtonView function.
 */
export interface ButtonViewParams<T = any> {
  /** Editor object */
  editor: Editor;
  /** Extension object */
  extension: Extension<T>;
  /** Translation function */
  t: (path: string) => string;
}

/**
 * Represents the ButtonView function.
 */
export interface ButtonView<T = any> {
  (options: ButtonViewParams<T>): ButtonViewReturn | ButtonViewReturn[];
}
