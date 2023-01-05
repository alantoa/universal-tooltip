import { requireNativeViewManager } from "expo-modules-core";
import React, { Children } from "react";
import { StyleSheet, View, processColor, Platform } from "react-native";

import {
  ContentProps,
  RootProps,
  TriggerProps,
  UniversalTooltipViewProps,
} from "./universal-tooltip.types";
import { createComponent } from "./utils/create-components";
import { pickChild } from "./utils/pick-child";

const NativeView: React.ComponentType<UniversalTooltipViewProps> =
  requireNativeViewManager("UniversalTooltip");

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
