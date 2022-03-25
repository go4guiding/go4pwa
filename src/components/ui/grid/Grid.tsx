import { PropsWithChildren } from 'react';

import { HTMLDivProps } from 'types/html';
import { buildClassName } from 'utilities/string';
import styles from './grid.module.scss';

type GridProps = HTMLDivProps &
  PropsWithChildren<{
    columns: number;
    noGutters?: boolean;
    collapse?: boolean;
  }>;

function Grid(props: GridProps) {
  const { children, className, columns, noGutters, collapse, ...otherProps } =
    props;

  const columnClassName = styles[`columns-${columns}`];
  const gutterClassName = (noGutters && styles[`no-gutters`]) || null;
  const collapseClassName = (collapse && styles.collapse) || null;
  const newClassName = buildClassName(
    styles.container,
    columnClassName,
    gutterClassName,
    collapseClassName,
    className
  );

  return (
    <div {...otherProps} className={newClassName}>
      {children}
    </div>
  );
}

export default Grid;
