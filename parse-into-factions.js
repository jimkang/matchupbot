var separators = [
  ' vs ',
  ' vs. ',
  ' and ',
  ' or '
];

function parseIntoFactions(s) {
  console.log(s);
  var factions = [];
  var foundSeparator;
  if (separators.some(separatorIsInMiddleOfString)) {
    factions = s.split(foundSeparator);
  }
  return factions;

  function separatorIsInMiddleOfString(separator) {
    var index = s.indexOf(separator);
    if (index > 0 && index + separator.length < s.length - 1) {
      foundSeparator = separator;
      return true;
    }
    else {
      return false;
    }
  }
}


module.exports = parseIntoFactions;
