# @iarna/word-count

Count words, with Unicode!  Uses Unicode 9.0.0 character classes for improved
clarity of implementation.

```js
const wordCount = require('@iarna/word-count')
console.log(wordCount("how many words is this?")) // 5
```

Specifically, we consider a word a run of 1 or more characters in these sets:

* General_Category/Letter
* General_Category/Letter_Number
* General_Category/Connector_Punctuation
* General_Category/Number
* Word_Break/MidNum
* Word_Break/MidNumLet
* Word_Break/Single_Quote
* Soft hyphens (\u00AD)
* A singular hyphen

Multiple hyphens in a row, that is `--` and `---` are considered word
separators as they're often used as stand-ins for endashes `–` and emdashes
`—` respectively.

The tests make it pretty clear what it's doing:

```js
  t.is(wordCount('This is a test'), 4, 'plain text')
  t.is(wordCount('now with 23 a number'), 5, 'integer')
  t.is(wordCount('now with 23.17'), 3, 'decimal')
  t.is(wordCount("emoji 😍😍 do not count"), 4, 'emoji')
  t.is(wordCount("possessive's are one word"), 4, 'possessive')
  t.is(wordCount('possessive’s are one word'), 4, 'possessive unicode')
  t.is(wordCount('some "quoted text" does not impact'), 6, 'quotes')
  t.is(wordCount("also 'single quotes' are ok"), 5, 'single quotes')
  t.is(wordCount("don't do contractions"), 3, 'contractions count as a single word')
  t.is(wordCount('hyphenated words-are considered whole'), 4, 'hyphenated words')
  t.is(wordCount('underbars are_too just one'), 4, 'underbars')
  t.is(wordCount('n-dash ranges 1–3 are NOT'), 6, 'en-dash')
  t.is(wordCount('m-dash connected—bits also are not'), 6, 'em-dash')
```

Many more naive implementations match just `\w` but that only get's you
(some) English and even then things like possessives and, depending on how
you look at, contractions get over counted.

To the best of my knowledge this should successfully count words in any
language that uses word-separators.  Counting words in languages without
word-separators is rather harder and the heuristics are language specific. 

If you happen to give this a run of, say, Chinese characters, it will
consider each group outside of punctuation to be a word, massively
under counting.  So yeah, use a language specific counter:

For instance, for Chinese there's
[nseg](https://www.npmjs.com/package/nseg) an implementation of
[MMSEG](http://technology.chtsai.org/mmseg/).

## PRIOR ART

* [word-count](https://www.npmjs.com/package/word-count) — A word counter
  that matches `\w` plus some ranges of CJK characters. CJK characters
  are each counted as one-word-per-character.
* [wordcount](https://www.npmjs.com/package/wordcount) — A fork of the
  origin of `word-count`, it adds ranges for Cyrillic.
* [split-string-words](https://www.npmjs.com/package/split-string-words) —
  not a word counter per say, but you could count the words it returns.  It
  looks for `\S` while allowing double quoted strings.
* [wordcount-stream](https://www.npmjs.com/package/wordcount-stream) —
  A stream based word counter that matches using `\w`.  *
* [string_utils](https://www.npmjs.com/package/string_utils) — Splits words on
  the space character.
* [wordcounter](https://www.npmjs.com/package/wordcounter) — Counts words using
  iso-8859-1, that is, some English and European characters.
* [string-stats](https://www.npmjs.com/package/string-stats) — Uses a list
  it documents as "Latin, Greek, Coptic, Cyrillic, Armenian, Hebrew, Syriac,
  Arabic" though it's ad-hoc so I don't know if its complete or if that's
  all it has.
* [word-counter](https://www.npmjs.com/package/word-counter) — Splits on
  `\s`.  Has a run-time dependency on coffee-script.

## FOR FUTURE REFERENCE

Unicode has a [report relating to word
boundaries](http://unicode.org/reports/tr29/#Word_Boundaries) that may be
useful.  It's focused on determining boundaries for things like
double-clicking and spell check, but it's definitately a related function.
