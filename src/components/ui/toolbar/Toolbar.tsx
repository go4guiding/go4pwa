import { PropsWithChildren } from 'react';

import { HTMLDivProps } from 'types/html';
import buildClassName from 'utilities/buildClassName';
import styles from './toolbar.module.scss';

export type ToolbarProps = HTMLDivProps &
  PropsWithChildren<{
    fluid?: boolean;
    align?: 'left' | 'center' | 'right';
  }>;

function Toolbar(props: ToolbarProps) {
  const { children, className, fluid, align, ...otherProps } = props;

  const fluidClassName = fluid ? styles.fluid : styles.base;
  const alignClassName = align ? styles[align] : null;
  const newClassName = buildClassName(
    fluidClassName,
    alignClassName,
    className
  );

  return (
    <div {...otherProps} className={newClassName}>
      {children}
    </div>
  );
}

export default Toolbar;
