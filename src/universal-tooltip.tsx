import type {
  TooltipTriggerProps,
  TooltipArrowProps,
} from "@radix-ui/react-tooltip";
import { requireNativeViewManager } from "expo-modules-core";
import React, { Children } from "react";
import { StyleSheet, View, processColor, Platform } from "react-native";
import type { ViewProps } from "react-native";

import {
  ContentProps,
  RootProps,
  UniversalTooltipViewProps,
} from "./universal-tooltip.types";
import { pickChild } from "./utils/collections";
import { createComponent } from "./utils/create-components";

const NativeView: React.ComponentType<UniversalTooltipViewProps> =
  requireNativeViewManager("UniversalTooltip");

export type TriggerProps = ViewProps & TooltipTriggerProps;

export const Trigger = createComponent(({ children }: TriggerProps) => {
  return <>{Children.only(children)}</>;
}, "Trigger");

export const Root = createComponent(({ children, ...rest }: RootProps) => {
  const [withoutTriggerChildren, triggerChildren] = pickChild(
    children,
    Trigger
  );
  const content = withoutTriggerChildren?.[0];
  const {
    children: contentChild,
    backgroundColor,
    textColor,
    ...contentRestProps
  } = content?.props;
  return (
    <NativeView
      backgroundColor={processColor(backgroundColor)}
      textColor={processColor(textColor)}
      {...contentRestProps}
      {...rest}
    >
      {/* Todo: support custom view on Android */}
      {Platform.OS === "ios" ? withoutTriggerChildren : null}
      {triggerChildren}
    </NativeView>
  );
}, "Root");

export const Content = createComponent<ContentProps>(
  ({ children, style, ...rest }) => {
    return (
      <View
        style={[style, StyleSheet.absoluteFillObject]}
        nativeID="Content"
        {...rest}
      >
        {children}
      </View>
    );
  },
  "Content"
);

export type ArrowProps = ViewProps & TooltipArrowProps;
export const Arrow = createComponent(({ children }: ArrowProps) => {
  return <View>{Children.only(<>{children}</>)}</View>;
}, "Arrow");
