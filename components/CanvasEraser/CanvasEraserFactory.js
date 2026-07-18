const DEFAULT_OPTIONS = {
  background: '#003049',
  completeRatio: 1,
  enabled: true,
  onComplete: null,
  onProgress: null,
  size: 40,
};

const factory = () => {
  let canvas = null;
  let context = null;
  let data = null;
  let frameId = null;
  let resizeTimer = null;
  let currentOptions = DEFAULT_OPTIONS;

  const getPoint = event => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(rect.width, event.clientX - rect.left)),
      y: Math.max(0, Math.min(rect.height, event.clientY - rect.top)),
    };
  };

  const handleProgress = point => {
    if (!data || data.complete || !data.enabled) return;

    const column = Math.floor(point.x / data.size);
    const row = Math.floor(point.y / data.size);
    const part = column + row * data.colParts;

    if (part < 0 || part >= data.numParts || data.parts[part] === 0) return;

    data.parts[part] = 0;
    data.erasedParts += 1;
    data.ratio = data.erasedParts / data.numParts;

    if (data.ratio >= data.completeRatio) {
      data.complete = true;
      if (data.onComplete) data.onComplete();
      return;
    }

    if (data.onProgress) data.onProgress(data.ratio);
  };

  const drawPendingPoint = () => {
    frameId = null;
    if (!context || !data || !data.pendingPoint || !data.enabled) return;

    const point = data.pendingPoint;
    const previous = data.lastPoint || point;
    const scale = data.scaleRatio;

    context.beginPath();
    context.moveTo(previous.x * scale, previous.y * scale);
    context.lineTo(point.x * scale, point.y * scale);
    context.stroke();

    handleProgress(point);
    data.lastPoint = point;
    data.pendingPoint = null;
  };

  const queuePoint = point => {
    if (!data || !data.enabled) return;
    data.pendingPoint = point;
    if (frameId === null) {
      frameId = window.requestAnimationFrame(drawPendingPoint);
    }
  };

  const handlePointerEnter = event => {
    if (event.pointerType === 'touch' || !data || !data.enabled) return;
    const point = getPoint(event);
    data.lastPoint = point;
    queuePoint(point);
  };

  const handlePointerMove = event => {
    if (event.pointerType === 'touch' || !data || !data.enabled) return;
    queuePoint(getPoint(event));
  };

  const handlePointerLeave = () => {
    if (!data) return;
    data.lastPoint = null;
    data.pendingPoint = null;
  };

  const prepareCanvas = () => {
    if (!canvas || !context) return;

    const rect = canvas.getBoundingClientRect();
    const realWidth = Math.max(1, rect.width);
    const realHeight = Math.max(1, rect.height);
    const scaleRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(realWidth * scaleRatio));
    const height = Math.max(1, Math.round(realHeight * scaleRatio));
    const size = Math.max(12, currentOptions.size);

    canvas.width = width;
    canvas.height = height;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = currentOptions.background;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'destination-out';
    context.lineWidth = size * scaleRatio;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const colParts = Math.max(1, Math.ceil(realWidth / size));
    const rowParts = Math.max(1, Math.ceil(realHeight / size));
    const numParts = colParts * rowParts;
    const parts = new Uint8Array(numParts);
    parts.fill(1);

    data = {
      ...currentOptions,
      colParts,
      numParts,
      parts,
      erasedParts: 0,
      ratio: 0,
      complete: false,
      lastPoint: null,
      pendingPoint: null,
      scaleRatio,
      width,
      height,
    };
  };

  const handleResize = () => {
    if (resizeTimer !== null) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resizeTimer = null;
      prepareCanvas();
    }, 160);
  };

  const destroy = () => {
    if (canvas) {
      canvas.removeEventListener('pointerenter', handlePointerEnter);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    }
    window.removeEventListener('resize', handleResize);

    if (frameId !== null) window.cancelAnimationFrame(frameId);
    if (resizeTimer !== null) window.clearTimeout(resizeTimer);

    frameId = null;
    resizeTimer = null;
    data = null;
    context = null;
    canvas = null;
  };

  const init = (source, options = {}) => {
    if (!source) {
      throw new Error(
        'No source element provided. It must be an HTML canvas element.',
      );
    }

    destroy();
    canvas = source;
    context = canvas.getContext('2d', { alpha: true });
    currentOptions = { ...DEFAULT_OPTIONS, ...options };
    prepareCanvas();

    canvas.addEventListener('pointerenter', handlePointerEnter, {
      passive: true,
    });
    canvas.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    canvas.addEventListener('pointerleave', handlePointerLeave, {
      passive: true,
    });
    window.addEventListener('resize', handleResize, { passive: true });
  };

  const clear = () => {
    if (!context || !data) return;
    context.clearRect(0, 0, data.width, data.height);
    data.parts.fill(0);
    data.erasedParts = data.numParts;
    data.ratio = 1;

    if (!data.complete && data.onComplete) data.onComplete();
    data.complete = true;
  };

  const reset = () => {
    prepareCanvas();
  };

  return {
    init,
    clear,
    reset,
    destroy,
  };
};

export default factory;
