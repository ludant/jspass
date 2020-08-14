function $(id) {
  return document.getElementById(id);
}

// js is a second-rate language and we all know it
function capitalize(word) {
  return word.substring(0, 1).toUpperCase() + word.substring(1);
}

const multilingualURL = 'dictionaries/multilingual.json';
const diceURL = 'dictionaries/diceware.json';
const effURL = 'dictionaries/eff.json';

// const multilingualURL = 'https://raw.githubusercontent.com/ludant/jspass/master/dictionaries/multilingual.json';
// const diceURL = 'https://raw.githubusercontent.com/ludant/jspass/master/dictionaries/diceware.json';
// const effURL = 'https://raw.githubusercontent.com/ludant/jspass/master/dictionaries/eff.json';
const dictionaries = {};

$('instructionsLink').addEventListener('click', () => {
  $('info').classList.toggle('hidden');
});

$('generateButton').addEventListener('click', () => {
  newPhrase(
    dictionaries[$('dictionarySelect').value],
    $('phraseLength').value,
    $('wordSeparator').value,
    $('capitalsSelect').value,
  );
});

// function dictAvg(dictionary, domElement) {
//   const reducer = (a, b) => {
//     return a + b.length;
//   };
//   let number = (dictionary.reduce(reducer, 0) / dictionary.length).toPrecision(
//     3
//   );
//   domElement.textContent = number + ' characters';
// }

function newPhrase(dictionary, length = 4, separator = ' ', caps = 'false') {
  if (length < 1) {
    length = 4;
  }
  if (length > 99) {
    length = 99;
  }

  let camel = false;
  // don't judge me
  if (caps === 'camel') {
    caps = 'true';
    camel = true;
  }

  const phrase = [];
  let word;
  for (let i = 0; i < length; i += 1) {
    word = dictionary[Math.floor(Math.random() * dictionary.length)];
    if (caps === 'true') {
      word = capitalize(word);
    }
    phrase.push(word);
  }
  if (camel) {
    phrase[0] = phrase[0].toLowerCase();
  }
<<<<<<< HEAD
  $('phraseDisplay').value = phrase.join(separator);
=======
  $("phraseDisplay").textContent = phrase.join(separator);
>>>>>>> parent of 04dcb87... fix footer link
}

function loadDict(url, dictionaryName, generate = false) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', url, true);
  xobj.responseType = 'json';
  xobj.onreadystatechange = () => {
		console.log(xobj);
    if (xobj.readyState === 4 && xobj.status === '200') {
      dictionaries[dictionaryName] = xobj.response;
      if (generate) {
        newPhrase(dictionaries[dictionaryName], 4, ' ', 'false');
      }
    }
  };
  xobj.send(null);
}

loadDict(diceURL, 'diceware');
loadDict(effURL, 'eff');
loadDict(multilingualURL, 'multilingual', true);
