import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to UniversalTooltip.web.ts
// and on native platforms to UniversalTooltip.ts
import UniversalTooltipModule from './UniversalTooltipModule';
import UniversalTooltipView from './UniversalTooltipView';
import { ChangeEventPayload, UniversalTooltipViewProps } from './UniversalTooltip.types';

// Get the native constant value.
export const PI = UniversalTooltipModule.PI;

export function hello(): string {
  return UniversalTooltipModule.hello();
}

export async function setValueAsync(value: string) {
  return await UniversalTooltipModule.setValueAsync(value);
}

const emitter = new EventEmitter(UniversalTooltipModule ?? NativeModulesProxy.UniversalTooltip);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { UniversalTooltipView, UniversalTooltipViewProps, ChangeEventPayload };
