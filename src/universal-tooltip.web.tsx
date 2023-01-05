import type { PopoverArrowProps } from "@radix-ui/react-popover";
import * as Popover from "@radix-ui/react-popover";
import React, { useMemo, useState } from "react";
import { Text, ViewProps, View } from "react-native";

import {
  ArrowProps,
  ContentProps,
  RootProps,
  TriggerProps,
} from "./universal-tooltip.types";
import "./styles.css";
import { isMobileWeb } from "./utils/platform";

export const Trigger = ({ children, ...rest }: TriggerProps) => {
  return (
    <Popover.Trigger asChild {...rest}>
      <div>{children}</div>
    </Popover.Trigger>
  );
};
export const Root = ({ children, onDismiss, open, ...rest }: RootProps) => {
  return (
    <Popover.Root
      onOpenChange={(state) => {
        if (open === undefined && state === false) {
          onDismiss?.();
        }
      }}
      open={open}
      {...rest}
    >
      {children}
    </Popover.Root>
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
    <Popover.Portal>
      <Popover.Content
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
        <Popover.Arrow fill={backgroundColor ?? "#000"} />
      </Popover.Content>
    </Popover.Portal>
  );
};

export const Arrow = ({ children, ...rest }: ArrowProps) => {
  return <Popover.Arrow {...rest}>{children}</Popover.Arrow>;
};
