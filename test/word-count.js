'use strict'
const test = require('tap').test
const wordcount = require('../word-count.js')

test('word-count', t => {
  t.is(wordcount('This is a test'), 4, 'plain text')
  t.is(wordcount('now with 23 a number'), 5, 'integer')
  t.is(wordcount('now with 23.17'), 3, 'decimal')
  t.is(wordcount("emoji 😍😍 do not count"), 4, 'emoji')
  t.is(wordcount("posessive's are one word"), 4, 'posessive')
  t.is(wordcount('posessive’s are one word'), 4, 'posessive unicode')
  t.is(wordcount('some "quoted text" does not impact'), 6, 'quotes')
  t.is(wordcount("also 'single quotes' are ok"), 5, 'single quotes')
  t.is(wordcount("don't do contractions"), 3, 'contractions count as a single word')
  t.is(wordcount('hyphenated words-are conisdered whole'), 4, 'hyphenated words')
  t.is(wordcount('underbares are_too just one'), 4, 'underbars')
  t.is(wordcount('n-dash ranges 1–3 are NOT'), 6, 'en-dash')
  t.is(wordcount('m-dash connected—bits also are not'), 6, 'em-dash')
  t.done()
})