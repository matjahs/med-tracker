import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';

interface UrlEvents {
  routeChanged?: ({
    pathname,
    location
  }: {
    pathname: string | null;
    location: Location | null;
  }) => void;
}

export const useNavigation = ({ on }: { on?: UrlEvents }) => {
  const pathname = usePathname();
  const [location, setLocation] = useState<Location>();

  const { routeChanged } = on || {};

  useEffect(() => {
    if(pathname && typeof window !== 'undefined') {
      window.addEventListener('popstate', () => {
        if(!isEqual(window.location, location)) {
          setLocation(window.location);
          routeChanged?.({
            pathname,
            location: window.location
          });
        }
      });

      return () => {
        window.removeEventListener('popstate', () => {});
      };
    }
  }, [location, pathname, routeChanged]);

  return location;
};
