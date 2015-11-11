var test = require('tape');
var jokeItUp = require('../joke-it-up');
var callNextTick = require('call-next-tick');

var testCases = [
  {
    base: 'hello',
    expected: 'hello vs. hi',
    expectedErrorMessage: undefined
  }
];

function mockAutocompl(partialSearchTerm, done) {
  debugger;
  var cannedResults = {
    'hello vs ': ['hello vs. hi'],
    'meerkats': ['meerkats facts'],
    'indio': ['indio ca'], // Should be NOT be used in joke.
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

    jokeItUp(
      {
        base: testCase.base,
        autocompl: mockAutocompl
      },
      checkJoke
    );

    function checkJoke(error, joke) {
      console.log(joke);
      if (testCase.expectedErrorMessage) {
        t.equal(
          error.message, testCase.expectedErrorMessage, 'Correct error given.'
        );
      }
      else {
        t.ok(!error, 'No error while making joke.');
        if (error) {
          console.log(error);
        }
      }


      t.deepEqual(joke, testCase.expected, 'Joke is correct.');
    }
  });
}
