/** READ MORE AT: https://regexp.dev/getting-started/usage */
import { createRegExp, 
//--------------------CREATING INPUTS--------------------
//this matches or doesn't match any character in the string provided.
charIn, charNotIn, 
//this takes an array of inputs and matches any of them.
anyOf, 
//these are helpers for specific RegExp characters. //letter.lowercase & letter.uppercase
char, word, wordChar, wordBoundary, digit, whitespace, letter, tab, linefeed, carriageReturn, 
//this can prefix word, wordChar, wordBoundary, digit, whitespace, letter, letter.lowercase, letter.uppercase, tab, linefeed or carriageReturn. For example createRegExp(not.letter).
not, 
//equivalent to ? - this marks the input as optional.
maybe, 
//Equivalent to + - this marks the input as repeatable, any number of times but at least once.
oneOrMore, 
//This escapes a string input to match it exactly.
exactly, 
//--------------------CHAINING INPUTS--------------------
//this adds a new pattern to the current input, or you can use and.referenceTo(groupName) to adds a new pattern referencing to a named group.
and, 
//this provides an alternative to the current input.
or, 
//these activate positive/negative lookahead/lookbehinds. Make sure to check browser support as not all browsers support lookbehinds (notably Safari).
after, before, notAfter, notBefore, 
//this is a function you can call directly to repeat the previous pattern an exact number of times, or you can use times.between(min, max) to specify a range, times.atLeast(num) to indicate it must repeat x times or times.any() to indicate it can repeat any number of times, including none.
times, 
//this is a function you can call to mark the current input as optional.
optionally, 
//alias for groupedAs
as, 
//this defines the entire input so far as a named capture group. You will get type safety when using the resulting RegExp with String.match().
groupedAs, 
//this defines the entire input so far as an anonymous group.
grouped, 
//	this allows you to match beginning/ends of lines with at.lineStart() and at.lineEnd().
at, } from 'magic-regexp';
export const r = {
    new: createRegExp,
    charIn, charNotIn,
    anyOf,
    char, word, wordChar, wordBoundary, digit, whitespace, letter, tab, linefeed, carriageReturn,
    not,
    maybe,
    oneOrMore,
    exactly,
    and,
    or,
    after, before, notAfter, notBefore,
    times,
    optionally,
    as, groupedAs,
    grouped,
    at
};
