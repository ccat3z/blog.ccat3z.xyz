export const log = {
  d: (tag, msg) => console.debug('[' + tag + '] ' + msg), // eslint-disable-line no-undef
  i: (tag, msg) => console.info('[' + tag + '] ' + msg),
  w: (tag, msg) => console.warn('[' + tag + '] ' + msg),
  e: (tag, msg) => console.error('[' + tag + '] ' + msg)
}

export function rgb2Hex (rgb) {
  return '#' + rgb.replace(/rgb\((\d*), (\d*), (\d*)\)/, '$1 $2 $3').split(' ').map((n) => ('0' + parseInt(n, 10).toString(16)).slice(-2)).join('')
}
