import { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Transition } from 'common';
import { HTMLDivProps } from 'types/html';
import { buildClassName } from 'utilities/string';
import styles from './modal.module.scss';

export type ModalProps = HTMLDivProps &
  PropsWithChildren<{
    show: boolean;
    transition?: Transition;
    onClosing?: () => void;
    onClosed?: () => void;
  }>;

function Modal(props: ModalProps) {
  const {
    children,
    className,
    show,
    transition,
    onClosing,
    onClosed,
    ...otherProps
  } = props;

  const modalRef = useRef<HTMLDivElement>(null);
  const styleClassName = transition ? styles[transition] : styles.basic;
  const stateClassName = show ? styles.show : null;
  const newClassName = buildClassName(
    styleClassName,
    stateClassName,
    className
  );

  useEffect(() => {
    if (show) return;
    if (typeof onClosing === 'function') onClosing();
    if (typeof onClosed === 'function' && modalRef.current)
      modalRef.current.addEventListener('transitionend', onClosed);
    else if (typeof onClosed === 'function') onClosed();
  }, [show, onClosing, onClosed]);

  return createPortal(
    <div {...otherProps} ref={modalRef} className={newClassName}>
      {children}
    </div>,
    document.getElementById('portal')!
  );
}

export default Modal;
