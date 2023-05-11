import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";
import React, { useMemo, Fragment } from "react";
import { Text as RNText, View } from "react-native";

import {
  ContentProps,
  RootProps,
  TextProps,
  TriggerProps,
} from "./universal-tooltip.types";
import "./styles.css";
import { pickChild } from "./utils/pick-child";
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
    side,
    dismissDuration,
    containerStyle,
    presetAnimation,
    backgroundColor,
    borderRadius,
    onTap,
    className,
    disableTapToDismiss,
    maxWidth,
    ...restProps
  } = rest;
  const [, triggerChildren] = pickChild(children, Text);

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
  console.log(maxWidth);

  return (
    <TooltipPortal>
      <TooltipContent
        side={side}
        className={`${animationClass} ${className}`}
        onClick={onTap}
        {...restProps}
      >
        <View
          style={[
            (triggerChildren as any)?.length > 0
              ? { backgroundColor, borderRadius, maxWidth, ...containerStyle }
              : {},
          ]}
        >
          {children}
        </View>
        <TooltipArrow fill={backgroundColor ?? "#000"} />
      </TooltipContent>
    </TooltipPortal>
  );
};
export const Text = ({
  style,
  textColor,
  textSize,
  fontWeight,
  text,
  ...rest
}: TextProps) => {
  return (
    <RNText
      style={[style, { color: textColor, fontSize: textSize, fontWeight }]}
      {...rest}
    >
      {text}
    </RNText>
  );
};
