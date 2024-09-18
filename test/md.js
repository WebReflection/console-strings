import md from '../md.js';

const log = str => console.log(md(str));

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
`);
