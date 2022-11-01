const { MarkovMachine } = require("./markov.js");

const TEST_TEXT = `anyone lived in a pretty how town
with up so floating many bells down
spring summer autumn winter
he sang his didn’t he danced his did

Women and men both little and small
cared for anyone not at all
they sowed their isn’t they reaped their same
sun moon stars rain`;

const MARKOV_CHAIN_MAP = {
  anyone: [ 'lived', 'not' ],
  lived: [ 'in' ],
  in: [ 'a' ],
  a: [ 'pretty' ],
  pretty: [ 'how' ],
  how: [ 'town' ],
  town: [ 'with' ],
  with: [ 'up' ],
  up: [ 'so' ],
  so: [ 'floating' ],
  floating: [ 'many' ],
  many: [ 'bells' ],
  bells: [ 'down' ],
  down: [ 'spring' ],
  spring: [ 'summer' ],
  summer: [ 'autumn' ],
  autumn: [ 'winter' ],
  winter: [ 'he' ],
  he: [ 'sang', 'danced' ],
  sang: [ 'his' ],
  his: [ 'didn’t', 'did' ],
  'didn’t': [ 'he' ],
  danced: [ 'his' ],
  did: [ 'Women' ],
  Women: [ 'and' ],
  and: [ 'men', 'small' ],
  men: [ 'both' ],
  both: [ 'little' ],
  little: [ 'and' ],
  small: [ 'cared' ],
  cared: [ 'for' ],
  for: [ 'anyone' ],
  not: [ 'at' ],
  at: [ 'all' ],
  all: [ 'they' ],
  they: [ 'sowed', 'reaped' ],
  sowed: [ 'their' ],
  their: [ 'isn’t', 'same' ],
  'isn’t': [ 'they' ],
  reaped: [ 'their' ],
  same: [ 'sun' ],
  sun: [ 'moon' ],
  moon: [ 'stars' ],
  stars: [ 'rain' ],
  rain: [ null ]
}


describe("getChains function", function() {

  const testText = TEST_TEXT;
  const markovChainMap = MARKOV_CHAIN_MAP;
  let markovMachine;

  beforeEach(function() {
    markovMachine = new MarkovMachine(testText);
  });

  test("create chain map", function() {
    let chainMap = markovMachine.getChains();

    expect(chainMap).toEqual(markovChainMap)
  });
})

