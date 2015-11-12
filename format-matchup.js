var callNextTick = require('call-next-tick');
var probable = require('probable');
var toTitleCase = require('titlecase');

var templates = [
  '%1 vs. %2!',
  '%1 vs. %2: The Decisive Moment',
  'Fight of the Century: %1 vs. %2',
  'New Year\'s Eve\nSaitama Super Arena\n%1 vs. %2!',
  'Final Conflict: %1 vs. %2. This Saturday.',
  '%1. %2. Both will enter. One will leave.',
  'LIVE! On pay-per-view: %1 vs. %2',
  'Champion %1 and pound-for-pound-#1-ranked %2 leave it all in the ring this Saturday!',
  'It\'s on! %2 has accepted %1\'s no-time-limit, no-holds-barred challenge!',
  'On the morrow, %1 and %2 shall walk ten paces and draw.',
  'Who is best? %1? %2? Find out this Saturday!',
  '%1 and %2 charge at each other on a moonlit night. They leap, swords drawn.'
];

function formatMatchup(matchup, done) {
  var formatted = probable.pickFromArray(templates);
  formatted = formatted.replace('%1', toTitleCase(matchup[0]));
  formatted = formatted.replace('%2', toTitleCase(matchup[1]));
  callNextTick(done, null, formatted);
}


// function capitalizeFirst(s) {
//   var capitalized = '';
//   if (s.length > 0) {
//     capitalized += s.slice(0, 1).toUpperCase();
//   }
//   if (s.length > 1) {
//     capitalized += s.slice(1);
//   }
//   return capitalized;
// }

module.exports = formatMatchup;
