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
} from '../../index.js';

import * as console from '../../browser.js';

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
  ${background(foreground(`back${bold('g')}roun${bold('d')}`, 30), 42)} color too.

  Sanitization check: \x1b[6m%c\x1b[25m .
  Sanitization check: %c${bold('OK')}%c .
  Sanitization check: ${background(foreground(`re${reset()}se${bold('t')}`, 0, 0, 0), 255, 255, 255)} .
`);

console.log(`
  Bad ${foreground('foreground', 42)} color
  Bad ${background('background', 32)} color
  Bad ${foreground('foreground', 102)} bright color
  Bad ${background('background', 92)} bright color
`);
