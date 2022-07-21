import { PropsWithChildren } from 'react';

import { HTMLDivProps } from 'types/html';
import { buildClassName } from 'utilities/string';
import styles from './toolbar.module.scss';

export type ToolbarProps = HTMLDivProps &
  PropsWithChildren<{
    fluid?: boolean;
    align?: 'left' | 'center' | 'right';
  }>;

function Toolbar(props: ToolbarProps) {
  const { children, className, fluid, align, ...otherProps } = props;

  const alignClassName = align ? styles[align] : null;
  const containerClassName = fluid ? 'container-fluid' : 'container';
  const newClassName = buildClassName(
    styles.base,
    alignClassName,
    containerClassName,
    className
  );

  return (
    <div {...otherProps} className={newClassName}>
      {children}
    </div>
  );
}

export default Toolbar;
