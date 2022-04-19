import {
  PropsWithChildren,
  useState,
  MouseEvent as ReactMouseEvent
} from 'react';

import { ThemeColour } from 'types/app';
import { HTMLButtonProps } from 'types/html';
import { buildClassName } from 'utilities/string';
import styles from './button.module.scss';

type ButtonMouseEvent = ReactMouseEvent<HTMLButtonElement, MouseEvent>;

type ButtonProps = HTMLButtonProps &
  PropsWithChildren<{
    color?: ThemeColour | 'none';
    block?: boolean;
  }>;

function Button(props: ButtonProps) {
  const {
    children,
    className,
    color = 'default',
    block = false,
    disabled,
    onMouseUp,
    onMouseDown,
    ...otherProps
  } = props;

  const [isPressed, setIsPressed] = useState(false);
  const newClassName = buildClassName(
    styles.base,
    color !== 'none' ? styles[color] : null,
    block ? styles.block : null,
    className
  );

  const mouseUpHandler = (event: ButtonMouseEvent) => {
    if (typeof onMouseUp === 'function') onMouseUp(event);
    setIsPressed(false);
  };

  const mouseDownHandler = (event: ButtonMouseEvent) => {
    if (typeof onMouseDown === 'function') onMouseDown(event);
    setIsPressed(true);
  };

  return (
    <button
      type="button"
      {...otherProps}
      aria-pressed={isPressed}
      aria-disabled={disabled}
      disabled={disabled}
      className={newClassName}
      onMouseUp={mouseUpHandler}
      onMouseDown={mouseDownHandler}
    >
      {children}
    </button>
  );
}

export default Button;
