export function throttle(callback: any, wait: number, context: any) {
  let isThrottled = false
  let savedArgs: any
  let savedThis: any
  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments
      savedThis = context
      return
    }
    callback.apply(context, arguments)
    isThrottled = true
    setTimeout(() => {
      isThrottled = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, wait)
  }
  return wrapper
}
