var callNextTick = require('call-next-tick');

function formatMatchup(matchup, done) {
  var formatted = matchup.map(capitalizeFirst).join(' vs. ');
  callNextTick(done, null, formatted);
}

function capitalizeFirst(s) {
  var capitalized = '';
  if (s.length > 0) {
    capitalized += s.slice(0, 1).toUpperCase();
  }
  if (s.length > 1) {
    capitalized += s.slice(1);
  }
  return capitalized;
}

module.exports = formatMatchup;
