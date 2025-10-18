export function throttle<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
  wait: number,
  context?: unknown,
): (...args: Args) => Return | void {
  let isThrottled = false;
  let savedArgs: Args | null = null;
  let savedThis: unknown = null;

  function wrapper(this: unknown, ...args: Args): Return | void {
    if (isThrottled) {
      savedArgs = args;
      savedThis = context ?? this;
      return;
    }

    const result = callback.apply(context ?? this, args);
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs && savedThis !== null) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }, wait);

    return result;
  }

  return wrapper;
}
