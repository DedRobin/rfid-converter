import { RefObject, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const { target } = event;
      const excludedElement = ref.current;
      if (
        target instanceof Node &&
        excludedElement !== target &&
        !excludedElement?.contains(target)
      ) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]); // Re-run if ref or callback changes
};

export default useClickOutside;
