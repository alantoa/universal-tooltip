import type {
  TooltipTriggerProps,
  TooltipArrowProps,
} from "@radix-ui/react-tooltip";
import * as Tooltip from "@radix-ui/react-tooltip";
import React, { useMemo } from "react";
import { Text, ViewProps, View } from "react-native";

import { ContentProps, RootProps } from "./universal-tooltip.types";
import "./styles.css";

export type TriggerProps = ViewProps & TooltipTriggerProps;

export const Trigger = ({ children, ...rest }: TriggerProps) => {
  return (
    <Tooltip.Trigger asChild {...rest}>
      <div>{children}</div>
    </Tooltip.Trigger>
  );
};
export const Root = ({ children, onDismiss, open, ...rest }: RootProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root
        onOpenChange={(state) => {
          if (open === undefined && state === false) {
            onDismiss?.();
          }
        }}
        open={open}
        {...rest}
      >
        {children}
      </Tooltip.Root>
    </Tooltip.Provider>
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
    <Tooltip.Portal>
      <Tooltip.Content
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
            <Text style={[fontStyle, { color: textColor, fontSize: textSize }]}>
              {text}
            </Text>
          ) : (
            children
          )}
        </View>
        <Tooltip.Arrow fill={backgroundColor ?? "#000"} />
      </Tooltip.Content>
    </Tooltip.Portal>
  );
};

export type ArrowProps = ViewProps & TooltipArrowProps;
export const Arrow = ({ children, ...rest }: ArrowProps) => {
  return <Tooltip.Arrow {...rest}>{children}</Tooltip.Arrow>;
};
