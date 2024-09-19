import {
  bold,
  dim,
  strike,
  underline,
  italic,
  foreground,
  background,
} from './index.js';

const ops = [
  // cannot combine due __** issue
  [ // **bold**
    /(\*{2})(?=\S)(.*?)(\S)\1/g,
    (_, __, $2, $3) => bold($2 + $3),
  ],
  [ // __underline__
    /(_{2})(?=\S)(.*?)(\S)\1/g,
    (_, __, $2, $3) => underline($2 + $3),
  ],

  // cannot combine due -~ issue
  [ // -dim- or --dim--
    /(-{1,2})(?=\S)(.*?)(\S)\1/g,
    (_, __, $2, $3) => dim($2 + $3),
  ],
  [ // ~strike~ or ~~strike~~
    /(~{1,2})(?=\S)(.*?)(\S)\1/g,
    (_, __, $2, $3) => strike($2 + $3),
  ],

  [ // *italic* or _italic_
    /([*_])(?=\S)(.*?)(\S)\1/g,
    (_, __, $2, $3) => italic($2 + $3),
  ],

  [ // f#32#foreground# or b#R;G;B#background#
    /([bf])#([0-9,;]+)#(?=\S)(.*?)(\S)#/g,
    (_, $1, $2, $3, $4) => ($1 === 'b' ? background : foreground)($3 + $4, ...$2.split(/[,;]/)),
  ],
];

export default str => {
  for (const [re, place] of ops)
    str = str.replace(re, place);
  return str;
};
