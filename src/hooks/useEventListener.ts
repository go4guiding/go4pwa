import { useEffect } from 'react';

function useEventListener(
  eventType: string,
  callback: EventListenerOrEventListenerObject,
  element: any = window
) {
  useEffect(() => {
    if (element === null) return;
    element.addEventListener(eventType, callback);
    return () => element.removeEventListener(eventType, callback);
  }, [eventType, element, callback]);
}

export default useEventListener;
