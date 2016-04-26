/**
 *   ,                 ,,            ,
 *  ||                 ||           ||                        '
 * =||=  /'\\ \\/\\/\\ ||/|,  _-_, =||=  /'\\ \\/\\  _-_     \\  _-_,
 *  ||  || || || || || || || ||_.   ||  || || || || || \\    || ||_.
 *  ||  || || || || || || |'  ~ ||  ||  || || || || ||/      ||  ~ ||
 *  \\, \\,/  \\ \\ \\ \\/   ,-_-   \\, \\,/  \\ \\ \\,/  <> || ,-_-
 *                                                           |;
 *  Extremely spooky tombstones, all shapes and sizes.       /
 *  http://tomb.zone
 */
import _ from 'lodash';
import templates from '../templates';

export function centerLine(str, maxLength, padChar = ' ') {
  let buff = str;
  let i = 0;
  while (buff.length < maxLength) {
    buff = i++ % 2 == 0 ? buff + ' ' : ' ' + buff;
  }
  return buff;
}

export function splitString(str, maxLength) {
  // Retain the original newline formatting of the epitaph
  let result = [];

  str.split('\n').forEach(words => {
    let line = '';

    // split the line into words
    words.split(' ').forEach(word => {
      if (line.length + word.length > maxLength) {
        result.push(line);
        line = '';
      }

      let newlyPaddedWord = line.length ? ` ${word}` : word;
      line += newlyPaddedWord;
    });

    result.push(line);
  });

  return result;
}

export function makeTombstone(templateKey, epitaph) {
  const template = _.get(templates, templateKey);

  if (!epitaph.trim()) {
    return template.ascii;
  }

  var lines = splitString(epitaph, template.maxWidth);

  var ascii = [];
  for (var i = 0; i < template.ascii.length; i++) {
    ascii[i] = template.ascii[i].slice(0);
  }

  // Pad the lines to be equal
  // TODO

  // Insert the epitaph into the template string
  var currentRow = template.startRow;
  var startCol = template.startCol;
  var asciiTemplate = ascii.splice(template.startRow, 1)[0];

  for (var currentLine = 0; currentLine < lines.length; currentLine++) {
    var line = lines[currentLine];
    var endCol = startCol + line.length;

    var newLine = asciiTemplate.substring(0, startCol) + line + asciiTemplate.substring(endCol);
    ascii.splice(currentRow++, 0, newLine);
  }

  return ascii;
}
