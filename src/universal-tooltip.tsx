import { requireNativeViewManager } from "expo-modules-core";
import React, { Children } from "react";
import {
  StyleSheet,
  View,
  processColor,
  Platform,
  ViewProps,
} from "react-native";

import {
  ContentProps,
  RootProps,
  TextProps,
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
  const [withoutTextChildren, textChildren] = pickChild(contentChild, Text);
  const text = textChildren?.[0];

  return (
    <NativeView
      backgroundColor={processColor(backgroundColor)}
      textColor={processColor(textColor)}
      {...contentRestProps}
      {...rest}
      {...text?.props}
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
      <View style={[style, StyleSheet.absoluteFillObject]} {...rest}>
        {children}
      </View>
    );
  },
  "Content"
);

export const Text = createComponent<TextProps>(({ children }) => {
  return <>{children}</>;
}, "Text");

// Todo: support custom view
export const CustomView = createComponent<ViewProps>(
  ({ children, ...rest }) => {
    return <View {...rest}>{children}</View>;
  },
  "CustomView"
);
