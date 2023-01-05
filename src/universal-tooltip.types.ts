import type {
  TooltipProps,
  TooltipContentProps,
} from "@radix-ui/react-tooltip";
import React from "react";
import type { TextStyle, ViewProps } from "react-native";

export type ContentProps = ViewProps &
  TooltipContentProps & {
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

export type RootProps = ViewProps &
  TooltipProps & {
    onDismiss?: () => void;
    /**
     * Android only
     */
    disableDismissWhenTouchOutside?: boolean;
  };
