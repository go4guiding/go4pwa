import { HTMLProps } from 'react';
import { ThemeColour } from 'types/app';

import buildClassName from 'utilities/buildClassName';
import styles from './spinner.module.scss';

type SpinnerProps = HTMLProps<HTMLDivElement> & {
  busy?: boolean;
  label?: string;
  color?: ThemeColour;
  large?: boolean;
};

function Spinner(props: SpinnerProps) {
  const {
    className,
    color,
    large = false,
    busy = true,
    label = 'The content is loading',
    ...otherProps
  } = props;

  const size = (large && styles.large) || null;
  const newClassName = buildClassName(
    styles[color || 'default'],
    size,
    className
  );

  return (
    <div
      {...otherProps}
      role="status"
      aria-busy={busy}
      aria-label={label}
      className={newClassName}
    />
  );
}

export default Spinner;
