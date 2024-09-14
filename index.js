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

export const bold = $ => wrap($, 22, 1);
export const light = $ => wrap($, 22, 2);
export const italic = $ => wrap($, 23, 3);
export const underline = $ => wrap($, 24, 4);
export const strike = $ => wrap($, 29, 9);
export const overline = $ => wrap($, 55, 53);
export const reset = () => `\x1b[0m`;

const color = i => ($, color, ...rest) => (
  rest.length ?
    wrap($, i, i - 1, 2, color, ...rest) :
    wrap($, i, color)
);

export const fg = color(39);
export const bg = color(49);
