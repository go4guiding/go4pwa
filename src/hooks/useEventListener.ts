import { useEffect, useRef } from 'react';

type Callback = (event: Event) => void;

function useEventListener(eventType: string, callback: Callback, element: any = window) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element === null) return;
    const handler = (event: Event) => callbackRef.current(event);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}

export default useEventListener;
