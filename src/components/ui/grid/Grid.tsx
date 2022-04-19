import { PropsWithChildren } from 'react';

import { HTMLDivProps } from 'types/html';
import { buildClassName } from 'utilities/string';
import styles from './grid.module.scss';

export const gridStyles = styles;

export type GridColumnOptions = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

type GridProps = HTMLDivProps &
  PropsWithChildren<{
    columns: number | GridColumnOptions;
    noGutters?: boolean;
    collapse?: boolean;
  }>;

function Grid(props: GridProps) {
  const { children, className, columns, noGutters, collapse, ...otherProps } =
    props;

  const columnClassName =
    typeof columns === 'number'
      ? styles[`columns_${columns}`]
      : Object.keys(columns).reduce(
          (acc, key) =>
            acc.concat([
              styles[
                `columns_${key}_${(columns as Record<string, number>)[key]}`
              ]
            ]),
          [] as string[]
        );

  const gutterClassName = (noGutters && styles.noGutters) || null;
  const collapseClassName = (collapse && styles.collapse) || null;
  const newClassName = buildClassName(
    styles.container,
    ...(typeof columnClassName === 'string'
      ? [columnClassName]
      : columnClassName),
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
