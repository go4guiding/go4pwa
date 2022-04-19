import { PropsWithChildren, useEffect, useMemo } from 'react';
import { HTMLDivProps } from 'types/html';
import { buildClassName, randomString } from 'utilities/string';
import styles from './collapse.module.scss';

export type CollapseProps = HTMLDivProps &
  PropsWithChildren<{
    show: boolean;
  }>;

function Collapse(props: CollapseProps) {
  const { children, className, id, show, ...otherProps } = props;

  const newId = useMemo(() => id || `collapse_${randomString()}`, [id]);
  const newClassName = buildClassName(styles.base, className);

  useEffect(() => {
    const element = document.getElementById(newId);
    const height = element?.scrollHeight || 0;

    if (show && element) element.style.height = `${height}px`;
    else if (element) element.style.height = '0';
  }, [show, newId]);

  return (
    <div id={newId} {...otherProps} className={newClassName}>
      {children}
    </div>
  );
}

export default Collapse;
