import React from "react";
import type { ViewProps } from "react-native";
import type {
  TooltipTriggerProps,
  TooltipProps,
  TooltipContentProps,
  TooltipPortalProps,
  TooltipArrowProps,
  TooltipProviderProps,
} from "@radix-ui/react-tooltip";

export type ContentProps = ViewProps & {
  text?: string;
  paddings?: number[];
  sideOffset?: number;
  side?: "left" | "right" | "bottom" | "top";
  fontStyle?: {
    fontSize?: number;
  };
  presetAnimation?: "none" | "fadeIn" | "zoomIn";
  dismissDuration?: number;
  showDuration?: number;
  open?: boolean;
  disableTapToDismiss?: boolean;
  onTap?: () => void;
  onDismiss?: () => void;
};
export type UniversalTooltipViewProps = ContentProps & {
  children?: React.ReactNode | JSX.Element;
};
