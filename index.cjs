'use strict';
/** @see https://developer.chrome.com/docs/devtools/console/format-style
 * ------------------------------------------------------------------------
 * ╔════════════════╦════════════╦════════════╦═════════════╦═════════════╗
 * ║ Name           ║ Foreground ║ Background ║ Light theme ║ Dark theme  ║
 * ╠════════════════╬════════════╬════════════╬═════════════╬═════════════╣
 * ║ Black          ║ 30         ║ 40         ║ #000000     ║ #000000     ║
 * ║ Red            ║ 31         ║ 41         ║ #AA0000     ║ #ED4E4C     ║
 * ║ Green          ║ 32         ║ 42         ║ #00AA00     ║ #01C800     ║
 * ║ Yellow         ║ 33         ║ 43         ║ #AA5500     ║ #D2C057     ║
 * ║ Blue           ║ 34         ║ 44         ║ #0000AA     ║ #2774F0     ║
 * ║ Magenta        ║ 35         ║ 45         ║ #AA00AA     ║ #A142F4     ║
 * ║ Cyan           ║ 36         ║ 46         ║ #00AAAA     ║ #12B5CB     ║
 * ║ White          ║ 37         ║ 47         ║ #AAAAAA     ║ #CFD0D0     ║
 * ║ Bright Black   ║ 90         ║ 100        ║ #555555     ║ #898989     ║
 * ║ Bright Red     ║ 91         ║ 101        ║ #FF5555     ║ #F28B82     ║
 * ║ Bright Green   ║ 92         ║ 102        ║ #55FF55     ║ #01C801     ║
 * ║ Bright Yellow  ║ 93         ║ 103        ║ #FFFF55     ║ #DDFB55     ║
 * ║ Bright Blue    ║ 94         ║ 104        ║ #5555FF     ║ #669DF6     ║
 * ║ Bright Magenta ║ 95         ║ 105        ║ #FF55FF     ║ #D670D6     ║
 * ║ Bright Cyan    ║ 96         ║ 106        ║ #55FFFF     ║ #84F0FF     ║
 * ║ Bright White   ║ 97         ║ 107        ║ #FFFFFF     ║ #FFFFFF     ║
 * ╚════════════════╩════════════╩════════════╩═════════════╩═════════════╝
 * ------------------------------------------------------------------------
 */

const wrap = ($, end, ...start) => (
  `\x1b[${start.join(';')}m${String($)}\x1b[${end}m`
);

const bold = /** @type {(content:unknown) => string} */ content => wrap(content, 22, 1);
exports.bold = bold;
const light = /** @type {(content:unknown) => string} */ content => wrap(content, 22, 2);
exports.light = light;
const italic = /** @type {(content:unknown) => string} */ content => wrap(content, 23, 3);
exports.italic = italic;
const underline = /** @type {(content:unknown) => string} */ content => wrap(content, 24, 4);
exports.underline = underline;
const strike = /** @type {(content:unknown) => string} */ content => wrap(content, 29, 9);
exports.strike = strike;
const overline = /** @type {(content:unknown) => string} */ content => wrap(content, 55, 53);
exports.overline = overline;
const reset = /** @type {() => '\x1b[0m'} */ () => '\x1b[0m';
exports.reset = reset;

/**
 * @param {number} i
 */
const color = i => {
  const lower = i - 9;
  const upper = i + 51;
  /**
   * @overload
   * @param {unknown} content
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @returns {string}
   */
  /**
   * @overload
   * @param {unknown} content
   * @param {number} color
   * @returns {string}
   */
  return (content, color, ...rest) => (
    rest.length ?
      wrap(content, i, i - 1, 2, color, ...rest) :
      (
        color < lower || (color > i && color < upper) ?
          ('⚠ ' + wrap(content, i, color) + reset()) :
          wrap(content, i, color)
      )
  );
};

const foreground = color(39);
exports.foreground = foreground;
const background = color(49);
exports.background = background;
