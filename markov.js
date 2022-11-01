"use strict";
/** Textual markov chain generator. */
const argv = process.argv;
// const testText = argv[2];

class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   * */

  getChains() {
    /** Determines if the value already exists in the map object, if not, it creates
     * it. Otherwise, it pushes it to the existing values array.
      */
    function _add (currWord, pushValue) {
      markovChainMap[currWord]
        ? markovChainMap[currWord].push(pushValue)
        : markovChainMap[currWord] = [pushValue]
    }

    const markovChainMap = {};
    for (let i = 0; i < this.words.length; i++) {
      // checks if last word
      let currWord = this.words[i];
      let nextWord = this.words[i+1]

      if (nextWord === undefined) {
        _add(currWord, null);
      } else {
        _add(currWord, nextWord);
      }
    }
    return markovChainMap;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    const markovArr = []; // better var name (output words?)
    let currWord = this.words[0];

    while (currWord !== null) {
      let followingWords = this.chains[currWord]; // let -> const
      let nextWord = this.getRandomArrayItem(followingWords);
      markovArr.push(nextWord);
      currWord = nextWord;
    }

    return markovArr.join(' ');
  }

  getRandomArrayItem(arr) {
    const randomIdx = Math.floor(Math.random() * arr.length);
    return arr[randomIdx]
  }
}

// can make helper function to take in array and return random element
/**
 * Generates random number from (min - (max - 1))
 * Input: (min, max) - Numbers
 * Output: random number - Number
 */


const testText = `anyone lived in a pretty how town
with up so floating many bells down
spring summer autumn winter
he sang his didn’t he danced his did

Women and men both little and small
cared for anyone not at all
they sowed their isn’t they reaped their same
sun moon stars rain`;

const testMarkov = new MarkovMachine(testText);
console.log(testMarkov.getChains());
console.log(testMarkov.getText());

module.exports = { MarkovMachine }



