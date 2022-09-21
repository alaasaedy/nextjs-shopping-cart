import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState<T>(() => {
    const isBrowserEnv = typeof window !== 'undefined';
    if (isBrowserEnv) {
      const item = localStorage.getItem(key);
      if (item !== null) return JSON.parse(item);
      if (typeof initialValue === 'function')
        return (initialValue as () => T)();
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [typeof value, typeof setValue];
};
