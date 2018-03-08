export default (callbacks={}, options={}) => {
  const fn = () => {};
  const fps = options.fps || 30;
  const minFps = options.minFps || fps - 10;
  const step = 1000 / fps;
  const maxUpdates = options.maxUpdates || 240;
  const resetOnPanic = options.resetOnPanic || true;
  const decayParam = options.decayParam || 0.25;

  const onBegin = callbacks.onBegin || fn;
  const onComplete = callbacks.onComplete || fn;
  const update = callbacks.update || fn;
  const draw = callbacks.draw || fn;
  const panic = callbacks.panic || fn;

  const onBegins = new Map();
  const inputs = new Map();
  const updates = new Map();
  const outputs = new Map();
  const onCompletes = new Map();
  const onFrameRateDrops = new Map();
  const panics = new Map();
  
  let animationFrame = null;
  let running = false;
  let prevTime = performance.now();
  let deltaTime = 0;
  let updateSteps = 0;

  let avgFps = fps;
  let framesThisSecond = 0;
  let lastFpsUpdate = 0;

  let loop = (time=performance.now()) => {
    animationFrame = requestAnimationFrame(loop);
    deltaTime += time - prevTime;

    running = true;

    if (deltaTime < step) {
      // console.log('early. Dipping:',deltaTime, step)
      return animationFrame;
    }

    runCallBacks(inputs, time, deltaTime, avgFps);
    runCallBacks(onBegins, time, deltaTime, avgFps);
    
    if (time > lastFpsUpdate + 1000) {
      avgFps = decayParam * framesThisSecond + (1 - decayParam) * avgFps;
      lastFpsUpdate = time;
      framesThisSecond = 0;
    }
    console.log(avgFps);
  
    if (avgFps < minFps) {
      runCallBacks(onFrameRateDrops, time, deltaTime, avgFps);
    }
    
    framesThisSecond++;
    updateSteps = 0;
    prevTime = time;

    while(deltaTime >= step) {
      runCallBacks(updates, time, step, avgFps);
      updateSteps++;
      deltaTime -= step;

      if(updateSteps >= maxUpdates) {
        runCallBacks(panic, time, deltaTime, avgFps);
        if(resetOnPanic) deltaTime = 0;
        break;
      }
    }

    runCallBacks(outputs, time, deltaTime, avgFps);
    runCallBacks(onCompletes, time, deltaTime, avgFps);
    return animationFrame;
  };

  loop.add = {
    onBegin: fn => onBegins.set(fn, true),
    input: fn => inputs.set(fn, true),
    update: fn => updates.set(fn, true),
    output: fn => outputs.set(fn, true),
    onComplete: fn => onCompletes.set(fn, true),
    onFrameRateDrop: fn => onFrameRateDrops.set(fn, true),
    Panic: fn => Panics.set(fn, true),
  }

  loop.stop = () => {
    cancelAnimationFrame(animationFrame);
    running = false;
  };

  loop.run = () => {
    running = true;
    prevTime = performance.now();
    animationFrame = requestAnimationFrame(loop);
  }

  loop.isRunning = () => {
    return running;
  }

  return loop;
}

function runCallBacks(map, ...args) {
  map.forEach((active, cb) => active && cb(...args));
}