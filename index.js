/** @see https://developer.chrome.com/docs/devtools/console/format-style
 * ------------------------------------------------------
 * ╔════════════╦════════════╦═════════════╦════════════╗
 * ║ Foreground ║ Background ║ Light theme ║ Dark theme ║
 * ╠════════════╬════════════╬═════════════╬════════════╣
 * ║ 30         ║ 40         ║ #000000     ║ #000000    ║
 * ║ 31         ║ 41         ║ #AA0000     ║ #ED4E4C    ║
 * ║ 32         ║ 42         ║ #00AA00     ║ #01C800    ║
 * ║ 33         ║ 43         ║ #AA5500     ║ #D2C057    ║
 * ║ 34         ║ 44         ║ #0000AA     ║ #2774F0    ║
 * ║ 35         ║ 45         ║ #AA00AA     ║ #A142F4    ║
 * ║ 36         ║ 46         ║ #00AAAA     ║ #12B5CB    ║
 * ║ 37         ║ 47         ║ #AAAAAA     ║ #CFD0D0    ║
 * ║ 90         ║ 100        ║ #555555     ║ #898989    ║
 * ║ 91         ║ 101        ║ #FF5555     ║ #F28B82    ║
 * ║ 92         ║ 102        ║ #55FF55     ║ #01C801    ║
 * ║ 93         ║ 103        ║ #FFFF55     ║ #DDFB55    ║
 * ║ 94         ║ 104        ║ #5555FF     ║ #669DF6    ║
 * ║ 95         ║ 105        ║ #FF55FF     ║ #D670D6    ║
 * ║ 96         ║ 106        ║ #55FFFF     ║ #84F0FF    ║
 * ║ 97         ║ 107        ║ #FFFFFF     ║ #FFFFFF    ║
 * ╚════════════╩════════════╩═════════════╩════════════╝
 * ------------------------------------------------------
 */

const wrap = (self, end, ...rest) => `\x1B[${rest.join(';')}m${self}\x1B[${end}m`;

Object.assign(
  String.prototype, {
    bold() {
      return wrap(this, 22, 1);
    },
    dim() {
      return wrap(this, 22, 2);
    },
    italic() {
      return this.italics();
    },
    italics() {
      return wrap(this, 23, 3);
    },
    underline() {
      return wrap(this, 24, 4);
    },
    strike() {
      return wrap(this, 29, 9);
    },
    /**
     * @signature `string.color(name:string | number)`
     * @param {string | number} name
     * @return {string}
     * 
     * @signature `string.color(R:string | number, G:string | number, B:string | number)`
     * @param {string | number} R
     * @param {string | number} G
     * @param {string | number} B
     * @return {string}
     */
    color(color, ...rest) {
      return rest.length ? wrap(this, 39, 38, 2, color, ...rest) : wrap(this, 39, color);
    },
    /**
     * @signature `string.color(name)`
     * @param {string | number} name
     * @return {string}
     * 
     * @signature `string.color(R, G, B)`
     * @param {string | number} R
     * @param {string | number} G
     * @param {string | number} B
     * @return {string}
     */
    background(color, ...rest) {
      return rest.length ? wrap(this, 49, 48, 2, color, ...rest) : wrap(this, 49, color);
    },
    overline() {
      return wrap(this, 55, 53);
    },
    reset() {
      return `${this}\x1B[0m`;
    }
  }
);
