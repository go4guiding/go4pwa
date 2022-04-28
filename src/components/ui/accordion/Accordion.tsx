import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState
} from 'react';

import { HTMLDivProps } from 'types/html';
import { AwardThemeColour, Storybookable, ThemeColour } from 'types/app';

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

function Accordion(props: AccordionProps & Storybookable) {
  const {
    children,
    className,
    multiple,
    noCollapseAll,
    color,
    expandedItems: initialExpandedItems = [],
    story = false,
    onItemsChanged,
    ...otherProps
  } = props;

  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const newClassName = buildClassName(styles.base, className);

  const updateExpandedItems = useCallback(
    (items: number[]) => {
      const newExpandedItems = !multiple
        ? items.filter((_, i) => i === 0)
        : items;

      if (noCollapseAll && newExpandedItems.length === 0)
        newExpandedItems.push(0);

      setExpandedItems(newExpandedItems);
    },
    [noCollapseAll, multiple, setExpandedItems]
  );

  const onItemChange = (index: number) => {
    const newExpandedItems = multiple
      ? [...expandedItems]
      : expandedItems.filter((value) => value === index);
    const indexOf = newExpandedItems.indexOf(index);

    if (indexOf === -1) newExpandedItems.push(index);
    else newExpandedItems.splice(indexOf, 1);

    if (noCollapseAll && newExpandedItems.length === 0) {
      updateExpandedItems(initialExpandedItems);
      return;
    }

    setExpandedItems(newExpandedItems);
  };

  useEffect(
    () => updateExpandedItems(initialExpandedItems),
    [updateExpandedItems]
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
