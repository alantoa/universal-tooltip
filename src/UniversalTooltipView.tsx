import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { UniversalTooltipViewProps } from './UniversalTooltip.types';

const NativeView: React.ComponentType<UniversalTooltipViewProps> =
  requireNativeViewManager('UniversalTooltip');

export default function UniversalTooltipView(props: UniversalTooltipViewProps) {
  return <NativeView {...props} />;
}
