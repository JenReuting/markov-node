"use strict";
/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require('./markov');
const fsP = require('fs/promises');
const axios = require('axios');
const argv = process.argv;
const fileOrURL = argv[2].toLowerCase();
const path = argv[3];

/**
 * based on fileOrURL input, call cat or webCat function then use output to 
 * instantiate MarkovMachine instance and long markovTest to console.
 * Input: fileOrURL - ('file' or 'url')
 * Input: path - (file name or url)
 * Output: undefined
 */
async function makeText(fileOrURL, path) {
  let markovInputText;

  if (fileOrURL === 'file') {
    markovInputText = await cat(path);
  } else if (fileOrURL === 'url') {
    markovInputText = await webCat(path);
  }

  const markovMachine = new MarkovMachine(markovInputText);
  console.log(markovMachine.getText());

}

/** If the path provided is a local file path, this function takes the file and
 * prints it to the console. If the path provided is invalid, it will throw an
 * error and exit the program.
 */

async function cat(path) {

  try {
    const contents = await fsP.readFile(path, "utf8");
    return contents;
  } catch (err) {
    console.log(`Error reading ${path}`, err);
    process.exit(0);
  }
}

/** If the path provided is a URL, this function takes the URL and
 * prints it to the console. If the URL is invalid, it will throw an
 * error and exit the program.
 */
async function webCat(url) {

  try {
    const resp = await axios.get(url);
    let html = resp.data;
    return html;

  } catch (err) {
    console.log("Not a valid URL");
    process.exit(1);
  }
}

makeText(fileOrURL, path);