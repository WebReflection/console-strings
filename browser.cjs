'use strict';
const { matches } = matchMedia('(prefers-color-scheme:dark)');

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

for (const [key, value] of Object.entries(colors))
  colors[+key + 10] = value;

const format = {
  '0': '',
  '1': 'font-weight:bolder',
  '2': 'font-weight:lighter',
  '3': 'font-style:italic',
  '4': 'text-decoration:underline',
  '9': 'text-decoration:line-through',
  '22': 'font-weight:default',
  '23': 'font-style:normal',
  '24': 'text-decoration:none',
  '29': 'text-decoration:none',
  '39': 'color:default',
  '49': 'background-color:default',
  '53': 'text-decoration:overline',
  '55': 'text-decoration:none',
};

const closer = new Set(['22', '23', '24', '29', '39', '49', '55']);

format[0] = [...closer].map(i => format[i]);

closer.add('0');

const color = (color, ...rgb) => (
  rgb.length ?
    `${color === '38' ? 'color' : 'background-color'}:rgb(${rgb.slice(1).join(',')})` :
    `${color < 38 || (color > 89 && color < 98) ? 'color' : 'background-color'}:${colors[color]}`
);

const transform = args => {
  const chunks = [];
  for (const arg of args) {
    if (typeof arg === 'string') {
      const details = [], re = /\x1b\[([0-9;]+)m/g;
      let style = [], i = 0, chunk = '', match;
      while (match = re.exec(arg)) {
        const { index, 0: { length }, 1: c } = match;
        chunk += `${arg.slice(i, index)}\x1b`;
        i = index + length;
        if (closer.has(c)) {
          c === '0' ? style.splice(0) : style.pop();
          details.push(style.concat(format[c]));
        }
        else {
          const [k, ...rest] = c.split(';');
          const resolved = format[k] || color(k, ...rest);
          style.push(resolved);
          details.push(style.concat(resolved));
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
                for (let rules = details.shift(), i = 0; i < rules.length; i++)
                  group.set(rules[i].split(':')[0], rules[i]);
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
