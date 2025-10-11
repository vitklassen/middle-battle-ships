import {
  ReactNode, RefObject, useEffect, useLayoutEffect, useRef, useState,
} from 'react';

type Props = {
    anchor: RefObject<HTMLElement>;
    children: ReactNode;
    setClosed: VoidFunction;
}

type Coords = {
    top: number;
    left: number;
}

export const Popout = ({ anchor: anchorRef, children, setClosed }: Props) => {
  const [coords, setCoords] = useState<Coords>();
  const popoutRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const popout = popoutRef.current;

    if (!anchor || !popout) {
      return;
    }

    const anchorRect = anchor.getBoundingClientRect();

    setCoords({ top: anchorRect.top, left: anchorRect.right + 10 });
  }, []);

  useEffect(() => {
    const anchor = anchorRef.current;
    const popout = popoutRef.current;

    function handleClickOutside(event) {
      if (popout && !popout.contains(event.target) && anchor && !anchor.contains(event.target)) {
        setClosed();
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return <div ref={popoutRef} style={{ position: 'absolute', top: `${coords?.top}px`, left: `${coords?.left}px` }}>{children}</div>;
};
