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

export const bold = /** @type {(content:unknown) => string} */ content => wrap(content, 22, 1);
export const light = /** @type {(content:unknown) => string} */ content => wrap(content, 22, 2);
export const italic = /** @type {(content:unknown) => string} */ content => wrap(content, 23, 3);
export const underline = /** @type {(content:unknown) => string} */ content => wrap(content, 24, 4);
export const strike = /** @type {(content:unknown) => string} */ content => wrap(content, 29, 9);
export const overline = /** @type {(content:unknown) => string} */ content => wrap(content, 55, 53);
export const reset = /** @type {() => '\x1b[0m'} */ () => '\x1b[0m';
export const dim = light;

/**
 * @param {number} i
 */
const color = i => {
  const range = new Set;
  for (let lower = i - 9, upper = lower + 60, j = 0; j < 8; j++)
    range.add(lower + j).add(upper + j);

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
        range.has(+color) ?
          wrap(content, i, color) :
          ('⚠ ' + wrap(content, i, color) + reset())
      )
  );
};

export const foreground = color(39);
export const background = color(49);
