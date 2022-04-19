import { PropsWithChildren, useContext, useMemo } from 'react';

import { HTMLButtonProps, HTMLDivProps } from 'types/html';
import { buildClassName, randomString } from 'utilities/string';
import Button from 'components/ui/button';
import Collapse from 'components/ui/collapse';

import { Context as AccordionContext } from './Accordion';
import styles from './accordion.module.scss';

export type AccordionItemProps = HTMLDivProps &
  PropsWithChildren<{
    label: string;
    toggleProps?: HTMLButtonProps;
  }>;

function AccordionItem(props: AccordionItemProps) {
  const { color, expandedItems, onItemChange } = useContext(AccordionContext);
  const {
    children,
    className,
    id,
    label,
    toggleProps = {},
    ...otherProps
  } = props;

  const { className: toggleClassName, ...otherToggleProps } = toggleProps;
  const randomId = useMemo(() => randomString(), []);
  const itemId = useMemo(
    () => id || `accordion_item_${randomId}`,
    [id, randomId]
  );

  const buttonId = `${itemId}_button`;
  const collapseId = `${itemId}_content`;

  const expanded = expandedItems.includes(itemId);
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
        onClick={() => onItemChange(itemId)}
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
