'use strict'
const fs = require('fs')
const path = require('path')
const regenerate = require('regenerate');
const set = regenerate()
  .add(require('unicode-11.0.0/General_Category/Letter/code-points.js'))
  .add(require('unicode-11.0.0/General_Category/Letter_Number/code-points.js'))
  .add(require('unicode-11.0.0/General_Category/Connector_Punctuation/code-points.js'))
  .add(require('unicode-11.0.0/General_Category/Number/code-points.js'))
  .add(require('unicode-11.0.0/Word_Break/MidNum/code-points.js'))
  .add(require('unicode-11.0.0/Word_Break/MidNumLet/code-points.js'))
  .add(require('unicode-11.0.0/Word_Break/Single_Quote/code-points.js'))
const SOFT_HYPHEN = '\\u00AD'
const HYPHEN_MINUS = '\\u002D'
const HYPHEN = '\\u2010'
const NONBREAKING_HYPHEN = '\\u2011'
fs.writeFileSync(path.join(__dirname, 'word-chars.js'), `'use strict'
module.exports = /(?:${set.toString()}|[${SOFT_HYPHEN}${HYPHEN}${NONBREAKING_HYPHEN}]|${HYPHEN_MINUS}(?!${HYPHEN_MINUS}))+/g`)
