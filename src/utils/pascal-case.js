function convertToPascalCase(text) {
    const words = text.split(' ');

    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    
    const pascalCaseText = capitalizedWords.join('');

    return pascalCaseText;
}

function toPascalCaseArray(arr) {
    let result = [];
  
    for (let i = 0; i < arr.length; i++) {
      let words = arr[i].split(' ');
  
      for (let j = 0; j < words.length; j++) {
        let word = words[j];
  
        let capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
  
        words[j] = capitalizedWord;
      }
  
      let pascalCaseString = words.join(' ');
  
      result.push(pascalCaseString);
    }
  
    return result;
  }

  function pascalCaseInSentence(sentences) {
    let pascalCaseArray = sentences.map(function(sentence) {
        sentence = sentence.trim();
        let words = sentence.split(' ');
        
      
        let pascalCaseWords = words.map(function(word, index) {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          } else {
            return word.toLowerCase();
          }
        });
      
        return pascalCaseWords.join(' ');
      });
    return pascalCaseArray
  }

export {
    convertToPascalCase,
    toPascalCaseArray,
    pascalCaseInSentence
}