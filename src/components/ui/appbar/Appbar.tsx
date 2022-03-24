import { PropsWithChildren } from 'react';

import { AwardThemeColour } from 'types/app';
import { HTMLElementProps } from 'types/html';
import buildClassName from 'utilities/buildClassName';
import Toolbar, { ToolbarProps } from 'components/ui/toolbar';
import styles from './appbar.module.scss';

export type AppbarProps = HTMLElementProps &
  PropsWithChildren<{
    position?: 'absolute' | 'fixed' | 'static' | 'sticky' | 'relative';
    color?: AwardThemeColour;
    bottom?: boolean;
  }>;

function Appbar(props: AppbarProps) {
  const { children, className, position, color, bottom, ...otherProps } = props;
  const Tag = bottom ? 'footer' : 'header';

  const bottomClassName = bottom ? styles.bottom : null;
  const positionClassName = position ? styles[position] : null;
  const colorClassName = color ? styles[color] : styles.default;
  const newClassName = buildClassName(
    positionClassName,
    bottomClassName,
    colorClassName,
    className
  );

  return (
    <Tag {...otherProps} className={newClassName}>
      {children}
    </Tag>
  );
}

export const AppbarWithToolbar = (props: AppbarProps & ToolbarProps) => {
  const { children, fluid, align, ...otherProps } = props;

  return (
    <Appbar {...otherProps}>
      <Toolbar fluid={fluid} align={align}>
        {children}
      </Toolbar>
    </Appbar>
  );
};

export default Appbar;
