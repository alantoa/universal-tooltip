import type {
  PopoverContentProps,
  PopoverTriggerProps,
  PopoverArrowProps,
  PopoverProps,
} from "@radix-ui/react-popover";
import React from "react";
import type { TextStyle, ViewProps } from "react-native";

export type TriggerProps = ViewProps & PopoverTriggerProps;

export type ContentProps = ViewProps &
  PopoverContentProps & {
    text?: string;
    sideOffset?: number;
    side?: "left" | "right" | "bottom" | "top";
    fontStyle?: TextStyle;
    borderRadius?: number;
    backgroundColor?: string;
    textColor?: string;
    textSize?: number;
    fontWeight?: "bold" | "normal";
    presetAnimation?: "none" | "fadeIn" | "zoomIn";
    dismissDuration?: number;
    showDuration?: number;
    disableTapToDismiss?: boolean;
    onTap?: () => void;
    containerStyle?: {
      paddingTop?: number;
      paddingRight?: number;
      paddingBottom?: number;
      paddingLeft?: number;
    };
  };
export type UniversalTooltipViewProps = ContentProps & {
  children?: React.ReactNode | JSX.Element;
};
export type ArrowProps = ViewProps & PopoverArrowProps;

export type RootProps = ViewProps &
  PopoverProps & {
    onDismiss?: () => void;
    /**
     * Android only
     */
    disableDismissWhenTouchOutside?: boolean;
  };
