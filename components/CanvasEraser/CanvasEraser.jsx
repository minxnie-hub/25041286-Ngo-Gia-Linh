import React from 'react';
import useForkRef from '../../hooks/useForkRef';
import canvasEraserFactory from './CanvasEraserFactory';

const CanvasEraser = (props, ref) => {
  const {
    completeRatio = 1,
    enabled = true,
    onComplete = null,
    onProgress = null,
    size = 40,
    background = '#003049',
    ...other
  } = props;

  const canvasRef = React.useRef(null);
  const componentRef = useForkRef(canvasRef, ref);

  const options = React.useMemo(
    () => ({
      background,
      completeRatio,
      enabled,
      onComplete,
      onProgress,
      size,
    }),
    [
      background,
      completeRatio,
      enabled,
      onComplete,
      onProgress,
      size,
    ],
  );

  React.useEffect(() => {
    const canvasEraser = canvasEraserFactory();
    canvasEraser.init(canvasRef.current, options);

    return () => canvasEraser.destroy();
  }, [options]);

  return <canvas ref={componentRef} aria-hidden="true" {...other} />;
};

export default React.forwardRef(CanvasEraser);
