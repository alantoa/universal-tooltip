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
};
export type UniversalTooltipViewProps = ContentProps & {
  open?: boolean;
  children?: React.ReactNode | JSX.Element;
};
