import React from 'react';
import { useCursorContext } from '../../context/cursor';
import { StyledCursor } from './styles';

const Cursor = () => {
  const cursorRef = React.useRef();
  const frameRef = React.useRef(null);
  const pointerPointRef = React.useRef({ x: -100, y: -100 });
  const latestPointRef = React.useRef({ x: -100, y: -100 });
  const [{ cursorStyle, position }] = useCursorContext();

  React.useEffect(() => {
    const scheduleUpdate = point => {
      latestPointRef.current = point;
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        if (!cursorRef.current) return;
        const point = latestPointRef.current;
        cursorRef.current.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
      });
    };

    const onMouseMove = event => {
      pointerPointRef.current = { x: event.clientX, y: event.clientY };
      scheduleUpdate(position || pointerPointRef.current);
    };

    scheduleUpdate(position || pointerPointRef.current);

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [position]);

  return (
    <StyledCursor
      ref={cursorRef}
      color={cursorStyle.color}
      bordered={cursorStyle.bordered}
    />
  );
};

export default React.memo(Cursor);
