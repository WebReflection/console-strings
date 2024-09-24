import {
  bold,
  dim,
  italic,
  underline,
  strike,
  foreground,
  background,
} from '../index.js';

import md from '../md.js';

// ***bold italic*** => [/bold italic]/
// this is irrelevant for both terminal and console
// but it's something needed to be removed to assert
const clear = str => str.replace(
  /\x1b\[1m\x1b\[3mbold italic\x1b\[\d+m\x1b\[\d+m/g,
  ''
);

const log = (input, output) => {
  const str = md(input);
  if (clear(str) !== clear(output))
    throw new Error('Unexpected output');
  console.log(str);
}

log(`
  **bold**
  __underline__
  -dim- or --dim--
  ~strike~ or ~~strike~~
  *italic* or _italic_
  **__bold underline__**
  **_bold italic_** and ***bold italic***
  ~**_strike bold italic_**~
  -[-**mixed bold and _italic_**-]-
  f#32#*fore*ground# and b#200,0,0#back**ground**#
  \`some **code** as it is\`
  \`\`\`some **other code** as it is\`\`\`
`, `
  ${bold('bold')}
  ${underline('underline')}
  ${dim('dim')} or ${dim('dim')}
  ${strike('strike')} or ${strike('strike')}
  ${italic('italic')} or ${italic('italic')}
  ${bold(underline('bold underline'))}
  ${bold(italic('bold italic'))} and ${bold(italic('bold italic'))}
  ${strike(bold(italic('strike bold italic')))}
  ${dim('[')}${bold(`mixed bold and ${italic('italic')}`)}${dim(']')}
  ${foreground(`${italic('fore')}ground`, 32)} and ${background(`back${bold('ground')}`, 200, 0, 0)}
  \`some **code** as it is\`
  \`\`\`some **other code** as it is\`\`\`
`);
