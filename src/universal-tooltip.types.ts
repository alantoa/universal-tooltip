import type {
  TooltipProps,
  TooltipContentProps,
  TooltipTriggerProps,
} from "@radix-ui/react-tooltip";
import React from "react";
import type { TextStyle, ViewProps } from "react-native";

export type TriggerProps = ViewProps & TooltipTriggerProps;
export type TextProps = {
  style?: TextStyle;
  textColor?: string;
  textSize?: number;
  fontWeight?: "bold" | "normal";
  text?: string;
};

export type ContentProps = ViewProps &
  TooltipContentProps & {
    sideOffset?: number;
    side?: "left" | "right" | "bottom" | "top";
    borderRadius?: number;
    backgroundColor?: string;
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
