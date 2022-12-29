import React from "react";

export const TooltipDisplayName = {
  Portal: "Portal",
  Provider: "Provider",
  Root: "Root",
  Content: "Content",
  Trigger: "Trigger",
  Arrow: "Arrow",
} as const;

type DisplayNames = typeof TooltipDisplayName;

export const createComponent = <Props extends any>(
  Component: React.ComponentType<Props>,
  displayName: DisplayNames[keyof DisplayNames]
) => {
  const TooltipComponent: React.FC<Props> = (props: Props) => {
    return <Component {...(props as any)} />;
  };
  TooltipComponent.displayName = displayName;

  return TooltipComponent;
};
