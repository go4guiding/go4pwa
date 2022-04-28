import { PropsWithChildren, useMemo } from 'react';

import { AwardThemeColour, ThemeColour } from 'types/app';
import { HTMLButtonProps, HTMLDivProps } from 'types/html';
import { buildClassName, randomString } from 'utilities/string';
import Button from 'components/ui/button';
import Collapse from 'components/ui/collapse';

import styles from './accordion.module.scss';

export type AccordionItemProps = HTMLDivProps &
  PropsWithChildren<{
    label: string;
    expanded?: boolean;
    color?: ThemeColour | AwardThemeColour;
    toggleProps?: HTMLButtonProps;
    onToggled?: (expanded: boolean) => void;
  }>;

function AccordionItem(props: AccordionItemProps) {
  const {
    children,
    className,
    id,
    label,
    expanded = false,
    color,
    toggleProps = {},
    onToggled,
    ...otherProps
  } = props;

  const { className: toggleClassName, ...otherToggleProps } = toggleProps;
  const randomId = useMemo(() => randomString(), []);
  const itemId = useMemo(() => id || randomId, [id, randomId]);

  const buttonId = `${itemId}_button`;
  const collapseId = `${itemId}_content`;

  const ariaLabel = `${expanded ? 'Hide' : 'Show'} ${label} content`;
  const newClassName = buildClassName(
    expanded ? styles.item_expanded : styles.item,
    className
  );

  const newToggleClassName = buildClassName(
    color ? styles[color] : null,
    toggleClassName
  );

  return (
    <div id={itemId} {...otherProps} className={newClassName}>
      <Button
        {...otherToggleProps}
        id={buttonId}
        block
        color="none"
        aria-label={ariaLabel}
        aria-controls={collapseId}
        className={newToggleClassName}
        onClick={() => onToggled?.(expanded)}
      >
        <span>{label}</span>
      </Button>

      <Collapse id={collapseId} show={expanded} aria-labelledby={buttonId}>
        {children}
      </Collapse>
    </div>
  );
}

export default AccordionItem;
