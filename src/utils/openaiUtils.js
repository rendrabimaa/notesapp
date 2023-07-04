// 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
const fetch = require('node-fetch');

async function generateText(prompt, maxTokens, temperature, apiKey) {
  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        max_tokens: maxTokens,
        temperature,
      }),
    });

    const data = await response.json();
    const generatedText = data.choices[0].text;
    return generatedText;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to generate text');
  }
}

function tokenizeText(text) {
  return text.toLowerCase().split(/\W+/);
}

function calculateWordFrequency(tokens) {
  const wordFrequency = {};

  for (let token of tokens) {
    if (wordFrequency[token]) {
      wordFrequency[token]++;
    } else {
      wordFrequency[token] = 1;
    }
  }

  return wordFrequency;
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

function extractKeywords(text, numKeywords) {
  const tokens = tokenizeText(text);
  const wordFrequency = calculateWordFrequency(tokens);

  const graph = {};
  for (let i = 0; i < tokens.length - 1; i++) {
    const word1 = tokens[i];
    const word2 = tokens[i + 1];

    if (!graph[word1]) {
      graph[word1] = [];
    }
    graph[word1].push(word2);
  }

  const wordScores = calculateWordScores(wordFrequency, graph);
  const sortedWords = Object.keys(wordScores).sort(
    (a, b) => wordScores[b] - wordScores[a]
  );
  const keywords = sortedWords.slice(0, numKeywords);
  return keywords;
}

function extractSentences(text, numSentences) {
  const sentences = text.split('.');
  const sentenceScores = {};

  for (let sentence of sentences) {
    const tokens = tokenizeText(sentence);
    const sentenceLength = tokens.length;

    let score = 0;
    for (let token of tokens) {
      score += 1;
    }

    sentenceScores[sentence] = score / sentenceLength;
  }

  const sortedSentences = Object.keys(sentenceScores).sort(
    (a, b) => sentenceScores[b] - sentenceScores[a]
  );
  const summarySentences = sortedSentences.slice(0, numSentences);
  return summarySentences;
}

module.exports = {
  generateText,
  extractKeywords,
  extractSentences,
};