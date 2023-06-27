import * as React from 'react';
import type { SpacingProps } from '../../shared/types';
import type { StepIndicatorProps } from './StepIndicator';
export interface StepIndicatorSidebarProps
  extends SpacingProps,
    Pick<StepIndicatorProps, 'mode' | 'current_step' | 'data'>,
    Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'> {
  internalId?: string;
  showInitialData?: boolean;
  /**
   * <em>(required)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
   */
  sidebar_id: string;
}
export default class StepIndicatorSidebar extends React.Component<
  StepIndicatorSidebarProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
