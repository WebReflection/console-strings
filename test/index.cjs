const {
  bold,
  light,
  italic,
  underline,
  strike,
  overline,
  reset,
  foreground,
  background,
} = require('../cjs/index.js');

console.log(`
  This is ${bold('bold')} text
  while this should be ${light('light')}.
  An ${italic('italic')} text is allowed
  and so it should be ${underline('underlined')}.
  A ${strike('strike')} would work too but
  an ${overline('overline')} might not.
  Combine ${underline(bold(italic('underlined bold italic')))}
  or any other variant or add some ${foreground('color', 32)} and
  ${background(foreground('background', 30), 42)} color too.${reset()}
`);
