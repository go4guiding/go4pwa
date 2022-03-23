import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

import buildClassName from 'utilities/buildClassName';
import styles from './grid.module.scss';

type HTMLDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

type GridProps = HTMLDivProps &
  PropsWithChildren<{
    columns: number;
    noGutters?: boolean;
    condensed?: boolean;
  }>;

function Grid(props: GridProps) {
  const { children, className, columns, noGutters, condensed, ...otherProps } =
    props;

  const columnClassName = styles[`columns-${columns}`];
  const gutterClassName = (noGutters && styles[`no-gutters`]) || null;
  const condensedClassName = (condensed && styles.condensed) || null;
  const newClassName = buildClassName(
    styles.container,
    columnClassName,
    gutterClassName,
    condensedClassName,
    className
  );

  return (
    <div {...otherProps} className={newClassName}>
      {children}
    </div>
  );
}

export default Grid;
