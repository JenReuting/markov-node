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
   *
   * */

  /*
  Is this the last word of the array
    In markovChainMap
      .push
    else
      = [null]
  else
  */


  getChains() {
    const markovChainMap = {};
    for (let i = 0; i < this.words.length; i++) {
      // checks if last word
      if (i === this.words.length - 1) {
        // checks if key exists in object
        if (this.words[i] in markovChainMap) {
          markovChainMap[this.words[i]].push(null);
        } else {
          markovChainMap[this.words[i]] = [null];
        }
      } else if (this.words[i] in markovChainMap) {
        markovChainMap[this.words[i]].push(this.words[i + 1]);
      } else {
        markovChainMap[this.words[i]] = [this.words[i + 1]];
      }
    }

    return markovChainMap;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
    const markovArr = [];
    let currWord = this.words[0];

    while (currWord !== null) {
      let followingWords = this.chains[currWord];
      let randInd = getRandomInt(0, followingWords.length);
      let nextWord = followingWords[randInd];
      markovArr.push(nextWord);
      currWord = nextWord;
    }

    return markovArr.join(' ');
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const testText = `anyone lived in a pretty how town
with up so floating many bells down
spring summer autumn winter
he sang his didn’t he danced his did

Women and men both little and small
cared for anyone not at all
they sowed their isn’t they reaped their same
sun moon stars rain

children guessed but only a few
and down they forgot as up they grew
autumn winter spring summer
that noone loved him more by more

when by now and tree by leaf
she laughed his joy she cried his grief
bird by snow and stir by still
anyone’s any was all to her

someones married their everyones
laughed their cryings and did their dance
sleep wake hope and then they
said their nevers they slept their dream

stars rain sun moon
and only the snow can begin to explain
how children are apt to forget to remember
with up so floating many bells down`;

const testMarkov = new MarkovMachine(testText);
console.log(testMarkov.getChains());
console.log(testMarkov.getText());



