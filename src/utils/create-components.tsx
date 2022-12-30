import React from "react";

export type DisplayNames =
  | "Provider"
  | "Portal"
  | "Root"
  | "Content"
  | "Trigger"
  | "Arrow"
  | "Text";

export const createComponent = <Props extends any>(
  Component: React.ComponentType<Props>,
  displayName: DisplayNames
) => {
  const TooltipComponent: React.FC<Props> = (props: Props) => {
    return <Component {...(props as any)} />;
  };
  TooltipComponent.displayName = displayName;

  return TooltipComponent;
};
