// import stopwords from './stopwords.js';

// function tokenizeText(text) {
//   return text.toLowerCase().split(/\W+/);
// }

// function calculateWordFrequency(tokens) {
//   const wordFrequency = {};

//   for (let token of tokens) {
//     if (!stopwords.includes(token)) {
//       if (wordFrequency[token]) {
//         wordFrequency[token]++;
//       } else {
//         wordFrequency[token] = 1;
//       }
//     }
//   }

//   return wordFrequency;
// }

// function calculateWordScores(wordFrequency, graph) {
//   const wordScores = {};

//   for (let word in graph) {
//     let score = 0;

//     for (let neighbor of graph[word]) {
//       score += wordFrequency[neighbor];
//     }

//     wordScores[word] = score;
//   }

//   return wordScores;
// }

// function extractKeywords(text) {
//   const tokens = tokenizeText(text.toLowerCase());
//   const wordFrequency = calculateWordFrequency(tokens);

//   const graph = {};
//   for (let i = 0; i < tokens.length - 1; i++) {
//     const word1 = tokens[i];
//     const word2 = tokens[i + 1];

//     if (!stopwords.includes(word1) && !stopwords.includes(word2)) {
//       if (!graph[word1]) {
//         graph[word1] = [];
//       }
//       graph[word1].push(word2);
//     }
//   }

//   const wordScores = calculateWordScores(wordFrequency, graph);
//   const sortedWords = Object.keys(wordScores).sort(
//     (a, b) => wordScores[b] - wordScores[a]
//   );

//   const numKeywords = Math.max(5, Math.floor(0.2 * sortedWords.length));
//   const keywords = sortedWords.slice(0, numKeywords);
//   return keywords;
// }

// function removeStopwords(tokens) {
//   return tokens.filter(token => !stopwords.includes(token));
// }

// function extractSentences(sentences) {
//   const sentenceScores = {};

//   for (let sentence of sentences) {
//     const tokens = tokenizeText(sentence.toLowerCase());
//     const filteredTokens = removeStopwords(tokens);
//     const sentenceLength = filteredTokens.length;

//     let score = 0;
//     for (let token of filteredTokens) {
//       score += 1;
//     }

//     sentenceScores[sentence] = score / sentenceLength;
//   }

//   const sortedSentences = Object.keys(sentenceScores).sort(
//     (a, b) => sentenceScores[b] - sentenceScores[a]
//   );

//   const numSentences = Math.max(3, Math.floor(0.3 * sortedSentences.length));
//   const summarySentences = sortedSentences.slice(0, numSentences);

//   const summary = [];
//   for (let sentence of sentences) {
//     if (summarySentences.includes(sentence)) {
//       summary.push(sentence);
//     }
//   }

//   return summary;
// }

// export { extractKeywords, extractSentences };

// ************************************* TF-IDF & TEXTRANK *************************************************
import { convertToPascalCase, pascalCaseInSentence, toPascalCaseArray } from './pascal-case.js';
import stopwords from './stopwords.js';

function tokenizeText(text) {
  return text.toLowerCase().split(/\W+/);
}

function calculateWordFrequency(tokens) {
  const wordFrequency = {};

  for (let token of tokens) {
    if (!stopwords.includes(token)) {
      if (wordFrequency[token]) {
        wordFrequency[token]++;
      } else {
        wordFrequency[token] = 1;
      }
    }
  }

  return wordFrequency;
}

function calculateTFIDF(tokens, wordFrequency, documentFrequency, totalDocuments) {
  const tfidfScores = {};

  for (let token of tokens) {
    if (!stopwords.includes(token)) {
      const tf = wordFrequency[token] / tokens.length;
      const idf = Math.log(totalDocuments / documentFrequency[token]);
      tfidfScores[token] = tf * idf;
    }
  }

  return tfidfScores;
}

function calculateWordScores(wordFrequency, graph) {
  const wordScores = {};

  for (let word in graph) {
    let score = 0;

    for (let neighbor of graph[word]) {
      score += wordFrequency[neighbor];
    }

    wordScores[word] = score;
  }

  return wordScores;
}

function extractKeywords(text, minKeywords, maxKeywords) {
  const tokens = tokenizeText(text);
  const wordFrequency = calculateWordFrequency(tokens);

  // Calculate document frequency
  const documentFrequency = {};
  for (let token of tokens) {
    if (!stopwords.includes(token)) {
      documentFrequency[token] = documentFrequency[token] ? documentFrequency[token] + 1 : 1;
    }
  }
  console.log(documentFrequency);
  const tfidfScores = calculateTFIDF(tokens, wordFrequency, documentFrequency, 1);

  const graph = {};
  for (let i = 0; i < tokens.length - 1; i++) {
    const word1 = tokens[i];
    const word2 = tokens[i + 1];

    if (!stopwords.includes(word1) && !stopwords.includes(word2)) {
      if (!graph[word1]) {
        graph[word1] = [];
      }
        graph[word1].push(word2)
    }
  }

  const wordScores = calculateWordScores(tfidfScores, graph);
  const sortedWords = Object.keys(wordScores).sort(
    (a, b) => wordScores[b] - wordScores[a]
  );

  const numKeywords = Math.max(5, Math.floor(0.2 * sortedWords.length));
  let keywords = sortedWords.slice(0, numKeywords);

  keywords = keywords.filter(function(word) {
    return !(word.startsWith("me") && word.length >= 6);
  });


  keywords = toPascalCaseArray(keywords);
  return keywords;
}

function removeStopwords(tokens, exceptionWords = []) {
  return tokens.filter(token => !stopwords.includes(token) || exceptionWords.includes(token));
}

function extractSentences(sentences, minSentences, maxSentences) {
  const sentenceScores = {};
 
  for (let sentence of sentences) {
    const tokens = tokenizeText(sentence);
    const filteredTokens = removeStopwords(tokens, ['di', 'akan', 'adalah', 'ke', 'dan', 'atau', 'tetapi', 'juga', 'namun', ]);
    const sentenceLength = filteredTokens.length;

    let score = 0;
    for (let token of filteredTokens) {
      score += 1;
    }

    sentenceScores[sentence] = score / sentenceLength;
  }

  const sortedSentences = Object.keys(sentenceScores).sort(
    (a, b) => sentenceScores[b] - sentenceScores[a]
  );

  const numSentences = Math.max(3, Math.floor(0.3 * sortedSentences.length));
  const summarySentences = sortedSentences.slice(0, numSentences);

  // Remove stopwords from summary sentences
  let summarySentencesWithoutStopwords = summarySentences.map(sentence => {
    const tokens = tokenizeText(sentence);
    // const filteredTokens = removeStopwords(tokens);
    return tokens.join(' ');
  });

  summarySentencesWithoutStopwords = pascalCaseInSentence(summarySentencesWithoutStopwords);

  return summarySentencesWithoutStopwords;
}

export { extractKeywords, extractSentences };

