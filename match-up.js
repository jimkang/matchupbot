var dropEndPuncRegex = /\W$/;
var dropEndPoemText = / poem$/;
var specialTenseRegex = /^(\w+)(:?ing|ed|s) /;
var createIsCool = require('iscool');
var isNotAutoCompleteNoise = require('./is-not-autocomplete-noise');
var isHyphenationVariation = require('./is-hyphenation-variation');
var isPluralization = require('./is-pluralization');
var isWhitespaceVariation = require('./is-whitespace-variation');
var iscool = createIsCool();
var probable = require('probable');
var parseIntoFactions = require('./parse-into-factions');

function matchUp(opts, done) {
  var base;
  var autocompl;

  if (opts) {
    base = opts.base;
    autocompl = opts.autocompl;
  }

  base += ' vs ';

  autocompl(base, makeMatchupWithSuggestions);

  function makeMatchupWithSuggestions(error, suggestions) {
    if (error) {
      done(error);
    }
    else if (!suggestions || suggestions.length < 1) {
      done(new Error('Got no suggestions.'));
    }
    else {
      var rawMatchup;
      suggestions = probable.shuffle(suggestions);

      for (var i = 0; i < suggestions.length; ++i) {
        var suggestion = suggestions[i];
        if (suggestion !== base.toLowerCase() &&
          !isHyphenationVariation(base, suggestion) &&
          !isPluralization(base, suggestion) &&
          !isWhitespaceVariation(base, suggestion) &&          
          isNotAutoCompleteNoise(suggestion) &&
          iscool(suggestion)) {

          rawMatchup = parseIntoFactions(suggestion);
          break;
        }
      }

      if (!rawMatchup) {
        done(new Error('Could not find suitable suggestion.'));
      }
      else {
        done(null, rawMatchup);
      }
    }
  }
}

module.exports = matchUp;
