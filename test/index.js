import {
  bold,
  light,
  italic,
  underline,
  strike,
  invert,
  overline,
  reset,
  foreground,
  background,
} from '../index.js';

console.log(`
  This is ${bold('bold')} text
  while this should be ${light('light')}.
  An ${italic('italic')} text is allowed
  and so it should be ${underline('underlined')}.
  A ${strike('strike')} would work too but
  an ${overline('overline')} might not.
  Some ${invert('inverted')} text might not show.
  Combine ${underline(bold(italic('underlined bold italic')))}
  or any other variant or add some ${foreground(`co${bold('l')}or`, 32)} and
  ${background(foreground(`back${reset()}groun${bold('d')}`, 0, 0, 0), 255, 255, 255)} color ${bold('too')}.
`);

console.log(`
  Bad ${foreground('foreground', 42)} color
  Bad ${background('background', 32)} color
  Bad ${foreground('foreground', 102)} bright color
  Bad ${background('background', 92)} bright color
`);

import('./md.js');