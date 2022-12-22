import * as React from 'react';

import { UniversalTooltipViewProps } from './UniversalTooltip.types';

export default function UniversalTooltipView(props: UniversalTooltipViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
