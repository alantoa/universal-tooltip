import React from "react";
import type { TextStyle, ViewProps } from "react-native";
import type {
  TooltipTriggerProps,
  TooltipProps,
  TooltipContentProps,
  TooltipPortalProps,
  TooltipArrowProps,
  TooltipProviderProps,
} from "@radix-ui/react-tooltip";

export type ContentProps = ViewProps &
  TooltipContentProps & {
    text?: string;
    sideOffset?: number;
    side?: "left" | "right" | "bottom" | "top";
    fontStyle?: TextStyle;
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
  };
