'use strict'
const wordChars = require('./word-chars.js')

module.exports = function (str) {
  if (!str) str = ''
  let cnt = 0
  while (wordChars.test(str)) ++cnt
  return cnt
}
