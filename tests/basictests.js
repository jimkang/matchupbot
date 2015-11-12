var test = require('tape');
var matchUp = require('../match-up');
var callNextTick = require('call-next-tick');

var testCases = [
  {
    base: 'hello',
    expected: ['hello', 'hi'],
    expectedErrorMessage: undefined
  }
];

function mockAutocompl(partialSearchTerm, done) {
  var cannedResults = {
    'hello vs ': ['hello vs. hi'],
    'meerkats': ['meerkats facts'],
    'indio': ['indio ca'], // Should be NOT be used.
    'aliases': ['aliases band'],
    'activism': ['activism quotes'],
    'chandelier': ['chandelier lyrics'],
    'Neo-Platonism': ['neoplatonism'],
    'bookend': ['bookends'],
    'childishness': ['childishness quotes'],
    'birthrate': ['birth rate']
  };
  callNextTick(done, null, cannedResults[partialSearchTerm]);
}

testCases.forEach(runTest);

function runTest(testCase) {
  test('Basic test', function basicTest(t) {
    t.plan(2);

    matchUp(
      {
        base: testCase.base,
        autocompl: mockAutocompl
      },
      checkMatchup
    );

    function checkMatchup(error, matchup) {
      console.log(matchup);
      if (testCase.expectedErrorMessage) {
        t.equal(
          error.message, testCase.expectedErrorMessage, 'Correct error given.'
        );
      }
      else {
        t.ok(!error, 'No error while making matchup.');
        if (error) {
          console.log(error);
        }
      }

      t.deepEqual(matchup, testCase.expected, 'Matchup is correct.');
    }
  });
}
