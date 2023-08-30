import { requireNativeViewManager } from "expo-modules-core";
import React, { Children, Fragment } from "react";
import { StyleSheet, View, processColor } from "react-native";

import {
  ContentProps,
  RootProps,
  TextProps,
  TriggerProps,
  UniversalTooltipViewProps,
  ArrowProps,
} from "./universal-tooltip.types";
import { createComponent } from "./utils/create-components";
import { pickChild } from "./utils/pick-child";

const NativeView: React.ComponentType<UniversalTooltipViewProps> =
  requireNativeViewManager("UniversalTooltip");

export const Portal = Fragment;

export const Trigger = createComponent(({ children }: TriggerProps) => {
  return <>{Children.only(children)}</>;
}, "Trigger");

export const Root = createComponent(({ children, ...rest }: RootProps) => {
  const [withoutTriggerChildren, triggerChildren] = pickChild(
    children,
    Trigger,
  );
  const content = withoutTriggerChildren?.[0];
  const contentProps =
    content.type === Content ? content?.props : content?.props?.children?.props;
  const {
    children: contentChild,
    backgroundColor,
    ...contentRestProps
  } = contentProps;
  const [, textChildren] = pickChild(contentChild, Text);
  const text = textChildren?.[0];
  const { style: textStyle, ...textProps } = text?.props ?? {};
  const [, arrowChildren] = pickChild(contentChild, Arrow);
  const arrow = arrowChildren?.[0];
  const { width: arrowWidth, height: arrowHeight } = arrow?.props ?? {};

  return (
    <NativeView
      backgroundColor={processColor(backgroundColor)}
      arrowWidth={arrowWidth}
      arrowHeight={arrowHeight}
      textStyle={{
        ...textStyle,
        ...(textStyle?.color ? { color: processColor(textStyle?.color) } : {}),
      }}
      {...contentRestProps}
      {...rest}
      {...textProps}
    >
      {withoutTriggerChildren}
      {triggerChildren}
    </NativeView>
  );
}, "Root");

export const Content = createComponent<ContentProps>(
  ({ children, style, backgroundColor, ...rest }) => {
    if (children && (children as JSX.Element[])?.length > 1) {
      return (
        <View style={[style, StyleSheet.absoluteFillObject]} {...rest}>
          {children[0]}
        </View>
      );
    }
    return (
      <View style={[style, StyleSheet.absoluteFillObject]} {...rest}>
        {children}
      </View>
    );
  },
  "Content",
);
export const Arrow = createComponent(({ children }: ArrowProps) => {
  return <>{Children.only(children)}</>;
}, "Arrow");

export const Text = createComponent<TextProps>(() => {
  return <></>;
}, "Text");
