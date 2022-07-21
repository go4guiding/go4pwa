import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { HTMLDivProps } from 'types/html';
import { AwardThemeColour, ThemeColour } from 'types/app';

import notImplemented from 'utilities/notImplemented';
import { buildClassName } from 'utilities/string';
import styles from './accordion.module.scss';

export const accordionStyles = styles;

export type AccordionProps = HTMLDivProps &
  PropsWithChildren<{
    expandedItems?: number[];
    multiple?: boolean;
    noCollapseAll?: boolean;
    color?: ThemeColour | AwardThemeColour;
    onItemsChanged?: (expandedItems: number[]) => void;
  }>;

export type AccordionState = {
  color?: ThemeColour | AwardThemeColour;
  expandedItems: number[];
  onItemChange: (index: number) => void;
};

const initialState: AccordionState = {
  expandedItems: [],
  onItemChange: notImplemented('onItemChange')
};

export const Context = createContext(initialState);

function Accordion(props: AccordionProps) {
  const {
    children,
    className,
    multiple,
    noCollapseAll = false,
    color,
    expandedItems: initialExpandedItems = [],
    onItemsChanged,
    ...otherProps
  } = props;

  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const newClassName = buildClassName(styles.base, className);

  const onItemChange = (index: number) => {
    const newExpandedItems = !multiple
      ? expandedItems.filter((value) => value === index)
      : [...expandedItems];
    const indexOf = newExpandedItems.indexOf(index);

    if (indexOf === -1) newExpandedItems.push(index);
    else if (newExpandedItems.length !== 1 || !noCollapseAll)
      newExpandedItems.splice(indexOf, 1);

    setExpandedItems(newExpandedItems);
  };

  // TODO: Refactor these three effects
  useEffect(() => {
    if (noCollapseAll && expandedItems.length === 0) {
      if (initialExpandedItems.length === 0) setExpandedItems([0]);
      else setExpandedItems([initialExpandedItems[0]]);
    }
  }, [noCollapseAll, expandedItems, initialExpandedItems, setExpandedItems]);

  useEffect(() => {
    if (!multiple && expandedItems.length > 1)
      setExpandedItems([expandedItems[0]]);
  }, [multiple, expandedItems, setExpandedItems]);

  useEffect(() => {
    if (initialExpandedItems.length > 1 && multiple)
      setExpandedItems(initialExpandedItems);
    else if (initialExpandedItems.length > 1 && !multiple)
      setExpandedItems([initialExpandedItems[0]]);
    else if (initialExpandedItems.length === 1)
      setExpandedItems(initialExpandedItems);
    else if (noCollapseAll) setExpandedItems([0]);
  }, []);
  // END TODO

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
