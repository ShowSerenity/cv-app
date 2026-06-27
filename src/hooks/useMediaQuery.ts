import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const getMatches = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => getMatches());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const onChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', onChange);

      return () => {
        mediaQueryList.removeEventListener('change', onChange);
      };
    }

    mediaQueryList.addListener(onChange);

    return () => {
      mediaQueryList.removeListener(onChange);
    };
  }, [query]);

  return matches;
};