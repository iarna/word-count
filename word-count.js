'use strict'
const wordChars = require('./word-chars.js')

module.exports = function (str) {
  const match = (str || '').match(wordChars)
  return match ? match.length : 0
}
