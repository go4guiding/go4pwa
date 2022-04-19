import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { HTMLDivProps } from 'types/html';
import { AwardThemeColour, Storybookable, ThemeColour } from 'types/app';

import notImplemented from 'utilities/notImplemented';
import { buildClassName } from 'utilities/string';
import styles from './accordion.module.scss';

export const accordionStyles = styles;

export type AccordionProps = HTMLDivProps &
  PropsWithChildren<{
    expandedItems?: string[];
    multiple?: boolean;
    noAllCollapsed?: boolean;
    color?: ThemeColour | AwardThemeColour;
    onItemsChanged?: (expandedItems: string[]) => void;
  }>;

export type AccordionState = {
  color?: ThemeColour | AwardThemeColour;
  expandedItems: string[];
  onItemChange: (id: string) => void;
};

const initialState: AccordionState = {
  expandedItems: [],
  onItemChange: notImplemented('onItemChange')
};

export const Context = createContext(initialState);

function Accordion(props: AccordionProps & Storybookable) {
  const {
    children,
    className,
    multiple,
    noAllCollapsed,
    color,
    expandedItems: initialExpandedItems = [],
    story = false,
    onItemsChanged,
    ...otherProps
  } = props;

  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const newClassName = buildClassName(styles.base, className);

  const onItemChange = (itemId: string) => {
    const newExpandedItems = multiple
      ? [...expandedItems]
      : expandedItems.filter((id) => id === itemId);
    const indexOf = newExpandedItems.indexOf(itemId);

    if (indexOf === -1) newExpandedItems.push(itemId);
    else newExpandedItems.splice(indexOf, 1);

    if (noAllCollapsed && !newExpandedItems.length)
      newExpandedItems.push(
        ...(initialExpandedItems.length > 0 ? initialExpandedItems : [itemId])
      );

    setExpandedItems(newExpandedItems);
  };

  useEffect(
    () => setExpandedItems(initialExpandedItems),
    !story ? [initialExpandedItems, setExpandedItems] : []
  );

  useEffect(() => {
    if (typeof onItemsChanged === 'function') onItemsChanged(expandedItems);
  }, [expandedItems, onItemsChanged]);

  return (
    <div {...otherProps} className={newClassName}>
      <Context.Provider value={{ color, expandedItems, onItemChange }}>
        {children}
      </Context.Provider>
    </div>
  );
}

export default Accordion;
