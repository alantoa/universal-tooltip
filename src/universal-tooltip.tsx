import type {
  TooltipTriggerProps,
  TooltipProps,
  TooltipContentProps,
  TooltipPortalProps,
  TooltipArrowProps,
  TooltipProviderProps,
} from "@radix-ui/react-tooltip";
import { requireNativeViewManager } from "expo-modules-core";
import React, { Children, ReactElement } from "react";
import { ViewProps } from "react-native";

import { UniversalTooltipViewProps } from "./universal-tooltip.types";
import { createComponent } from "./utils/create-components";

const NativeView: React.ComponentType<UniversalTooltipViewProps> =
  requireNativeViewManager("UniversalTooltip");

function UniversalTooltip(props: UniversalTooltipViewProps) {
  return <NativeView {...props} />;
}

export type ProviderProps = ViewProps & TooltipProviderProps;

export const Provider = createComponent(({ children }: ProviderProps) => {
  // console.log(children?.valueOf());

  // const onlySpans = Children.filter(children, (child) => {
  //   console.log(child);

  //   console.log(child.type === "View");
  // });

  return <>{Children.only(<>{children}</>)}</>;
}, "Provider");

export type RootProps = ViewProps & TooltipProps;

export const Root = createComponent(({ children }: RootProps) => {
  return <>{Children.only(<>{children}</>)}</>;
}, "Root");

export type TriggerProps = ViewProps & TooltipTriggerProps;
export const Trigger = createComponent(({ children }: TriggerProps) => {
  return <>{Children.only(children)}</>;
}, "Trigger");

export type PortalProps = ViewProps & TooltipPortalProps;
export const Portal = createComponent(({ children }: PortalProps) => {
  return <>{Children.only(<>{children}</>)}</>;
}, "Portal");

export type ContentProps = ViewProps & TooltipContentProps;
export const Content = createComponent(({ children }: ContentProps) => {
  return <>{Children.only(<>{children}</>)}</>;
}, "Arrow");

export type ArrowProps = ViewProps & TooltipArrowProps;
export const Arrow = createComponent(({ children }: ArrowProps) => {
  return <>{Children.only(<>{children}</>)}</>;
}, "Arrow");
