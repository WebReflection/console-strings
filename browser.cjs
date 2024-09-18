'use strict';
const ZERO = '0';
const X1B = '\x1b';
const COLOR = 'color';
const DEFAULT = 'default';
const BG_COLOR = `background-${COLOR}`;
const FONT_STYLE = 'font-style';
const FONT_WEIGHT = 'font-weight';
const TEXT_DECORATION = 'text-decoration';
const TEXT_DECORATION_NONE = `${TEXT_DECORATION}:none`;

const { entries, keys } = Object;

const { matches } = matchMedia(`(prefers-${COLOR}-scheme:dark)`);

const colors = {
  '30': '#000000',
  '31': matches ? '#ED4E4C' : '#AA0000',
  '32': matches ? '#01C800' : '#00AA00',
  '33': matches ? '#D2C057' : '#AA5500',
  '34': matches ? '#2774F0' : '#0000AA',
  '35': matches ? '#A142F4' : '#AA00AA',
  '36': matches ? '#12B5CB' : '#00AAAA',
  '37': matches ? '#CFD0D0' : '#AAAAAA',
  '90': matches ? '#898989' : '#555555',
  '91': matches ? '#F28B82' : '#FF5555',
  '92': matches ? '#01C801' : '#55FF55',
  '93': matches ? '#DDFB55' : '#FFFF55',
  '94': matches ? '#669DF6' : '#5555FF',
  '95': matches ? '#84F0FF' : '#FF55FF',
  '96': matches ? '#ED4E4C' : '#55FFFF',
  '97': '#FFFFFF',
};

for (const [key, value] of entries(colors))
  colors[+key + 10] = value;

const format = {
  '1': `${FONT_WEIGHT}:bolder`,
  '2': `${FONT_WEIGHT}:lighter`,
  '3': `${FONT_STYLE}:italic`,
  '4': `${TEXT_DECORATION}:underline`,
  '9': `${TEXT_DECORATION}:line-through`,
  '22': `${FONT_WEIGHT}:${DEFAULT}`,
  '23': `${FONT_STYLE}:normal`,
  '24': TEXT_DECORATION_NONE,
  '29': TEXT_DECORATION_NONE,
  '39': `${COLOR}:${DEFAULT}`,
  '49': `${BG_COLOR}:${DEFAULT}`,
  '53': `${TEXT_DECORATION}:overline`,
  '55': TEXT_DECORATION_NONE,
};

const opener = new Set(['1', '2', '3', '4', '9', '38', '48', '53'].concat(keys(colors)));
const closer = new Set(['22', '23', '24', '29', '39', '49', '55']);

format[ZERO] = [...closer].map(i => format[i]);

closer.add(ZERO);

const color = (color, ...rgb) => (
  rgb.length ?
    `${color == 38 ? COLOR : BG_COLOR}:rgb(${rgb.slice(1).join(',')})` :
    `${color < 38 || (color > 89 && color < 98) ? COLOR : BG_COLOR}:${colors[color]}`
);

const transform = args => {
  const chunks = [];
  for (const arg of args) {
    if (typeof arg === 'string') {
      const details = [], re = /\x1b\[([0-9;]+)m/g;
      let style = [], i = 0, chunk = '', match;
      while (match = re.exec(arg)) {
        const { index, 0: { length }, 1: c } = match;
        chunk += arg.slice(i, index);
        i = index + length;
        if (closer.has(c)) {
          c === ZERO ? style.splice(0) : style.pop();
          details.push(style.concat(format[c]));
          chunk += X1B;
        }
        else {
          const [k, ...rest] = c.split(';');
          if (opener.has(k)) {
            const resolved = format[k] || color(+k, ...rest);
            style.push(resolved);
            details.push(style.concat(resolved));
            chunk += X1B;
          }
        }
      }
      if (i) {
        const styles = [];
        chunks.push(
          (chunk + arg.slice(i))
            .replace(/(?<!%)%c/g, '%%c')
            .replace(/((?:\x1b)+)/g, (_, c) => {
              let { length } = c, group = new Map;
              while (length--) {
                for (const rule of details.shift())
                  group.set(rule.split(':')[0], rule);
              }
              styles.push([...group.values()].join(';'));
              return '%c';
            }),
            ...styles
          )
        ;
        continue;
      }
    }
    chunks.push(arg);
  }
  return chunks;
};

const { console: { error: e, info: i, log: l, warn: w } } = globalThis;

const error = /** @implements {console.error} */ (...args) => e(...transform(args));
exports.error = error;
const info = /** @implements {console.info} */ (...args) => i(...transform(args));
exports.info = info;
const log = /** @implements {console.log} */ (...args) => l(...transform(args));
exports.log = log;
const warn = /** @implements {console.warn} */ (...args) => w(...transform(args));
exports.warn = warn;
