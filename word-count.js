'use strict'
const wordChars = {{word-chars}}

module.exports = function (str) {
  if (typeof str !== 'string') str = str == null ? '' : String(str)
  let cnt = 0
  while (wordChars.test(str)) ++cnt
  return cnt
}
