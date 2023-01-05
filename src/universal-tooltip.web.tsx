import type { PopoverArrowProps } from "@radix-ui/react-popover";
import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";

import React, { useMemo, Fragment } from "react";
import { Text, View } from "react-native";

import {
  ContentProps,
  RootProps,
  TriggerProps,
} from "./universal-tooltip.types";
import "./styles.css";
import { isDesktopWeb } from "./utils/platform";

const TooltipTrigger = isDesktopWeb() ? Tooltip.Trigger : Popover.Trigger;
const TooltipProvider = isDesktopWeb() ? Tooltip.Provider : Fragment;
const TooltipRoot = isDesktopWeb() ? Tooltip.Root : Popover.Root;
const TooltipArrow = isDesktopWeb() ? Tooltip.Arrow : Popover.Arrow;
const TooltipContent = isDesktopWeb() ? Tooltip.Content : Popover.Content;
const TooltipPortal = isDesktopWeb() ? Tooltip.Portal : Popover.Portal;

export const Trigger = ({ children, ...rest }: TriggerProps) => {
  return (
    <TooltipTrigger asChild {...rest}>
      <div>{children}</div>
    </TooltipTrigger>
  );
};
export const Root = ({ children, onDismiss, open, ...rest }: RootProps) => {
  return (
    <TooltipProvider>
      <TooltipRoot
        onOpenChange={(state) => {
          if (open === undefined && state === false) {
            onDismiss?.();
          }
        }}
        open={open}
        {...rest}
      >
        {children}
      </TooltipRoot>
    </TooltipProvider>
  );
};

export const Content = ({ children, ...rest }: ContentProps) => {
  const {
    style,
    side,
    dismissDuration,
    containerStyle,
    text,
    fontStyle,
    textColor,
    textSize,
    presetAnimation,
    backgroundColor,
    borderRadius,
    className,
    fontWeight,
    onTap,
    ...restProps
  } = rest;

  const animationClass = useMemo(() => {
    switch (presetAnimation) {
      case "fadeIn":
        return `tooltip-fade-in-${side ?? "top"}`;
      case "zoomIn":
        return "tooltip-zoom-in";
      default:
        return "";
    }
  }, [presetAnimation]);

  return (
    <TooltipPortal>
      <TooltipContent
        side={side}
        className={`${animationClass} ${className}`}
        {...restProps}
      >
        <View
          // @ts-ignore
          onClick={onTap}
          style={[containerStyle, { backgroundColor, borderRadius }, style]}
        >
          {text ? (
            <Text
              style={[
                fontStyle,
                { color: textColor, fontSize: textSize, fontWeight },
              ]}
            >
              {text}
            </Text>
          ) : (
            children
          )}
        </View>
        <TooltipArrow fill={backgroundColor ?? "#000"} />
      </TooltipContent>
    </TooltipPortal>
  );
};
