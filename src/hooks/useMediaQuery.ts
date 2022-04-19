import { useState, useEffect } from 'react';
import useEventListener from 'hooks/useEventListener';

function useMediaQuery(mediaQuery: string) {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(null);

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  // TODO: Replace evnt type any with MediaQueryChangeEvent (requires TS types)
  useEventListener('change', (e: any) => setIsMatch(e.matches), mediaQueryList);

  return isMatch;
}

export default useMediaQuery;
