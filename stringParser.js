/**
 * question: given a string find weather it is valid HTML or not
 * (check for every opening tag, there is a closing tag or not)
 * 
 * '<div>hello</div>' <---- valid (return true)
 * '<div>hello<p>M.</div>' <---- invalid (return 'p')
 * '<div><p></div></p>' <---------- invalid (return 'p')
 * 
 * 
 * possible tags: div, em, i, p
 * 
 */



function validateString(htmlString) {
  let tagStack = [];
  const openingTagRegExp = new RegExp('(<[a-zA-Z]*>)');
  const closingTagRegExp = new RegExp('(</[a-zA-Z]*>)');

  const matcher =  {
    '</div>': '<div>',
    '</i>': '<i>',
    '</em>': '<em>',
    '</p>': '<p>'
  }

  const tagMatcher = {
    '<div>': 'div',
    '<i>': 'i',
    '<p>': 'p',
    '<em>': 'em',
    '</div>': 'div',
    '</i>': 'i',
    '</p>': 'p',
    '</em>': 'em',
  };

  const extractTags = (htmlSubString) => {

    if(!htmlSubString) return [];

    const tmpTags = [];

    const openingMatch = htmlSubString.match(openingTagRegExp);
    const closingMatch = htmlSubString.match(closingTagRegExp);

    if(openingMatch === null && closingMatch === null) {
      return [];
    }

    if(openingMatch === null || (closingMatch !== null && openingMatch.index > closingMatch.index)) {
      tmpTags.push(closingMatch[0]);
      const lengthOfMatch = closingMatch[0].length;
      const indexOfMatch = closingMatch.index;
      const remainingString = htmlSubString.substring(lengthOfMatch + indexOfMatch);
      return tmpTags.concat(extractTags(remainingString));
    }

    if(closingMatch === null || (openingMatch !== null && openingMatch.index < closingMatch.index)) {
      tmpTags.push(openingMatch[0]);
      const lengthOfMatch = openingMatch[0].length;
      const indexOfMatch = openingMatch.index;
      const remainingString = htmlSubString.substring(lengthOfMatch + indexOfMatch);
      return tmpTags.concat(extractTags(remainingString));
    }

  }

  tagStack = extractTags(htmlString);

  if(closingTagRegExp.test(tagStack[0])) {
    return tagMatcher[tagStack[0]];
  }

  if(tagStack.length === 1) {
    return tagMatcher[tagStack[0]];
  }

  const tmpTags = [];

  for(let i =0; i < tagStack.length; i += 1) {
    
    if(tmpTags.length === 0) {
      tmpTags.push(tagStack[i]);
    } else {
      if(closingTagRegExp.test(tagStack[i])) {
        if(tmpTags[tmpTags.length - 1] === matcher[tagStack[i]]) {
          tmpTags.pop();
        } else {
          return tagMatcher[tmpTags.pop()];
        }
      } else {
        tmpTags.push(tagStack[i])
      }
    }
  }

  return tagStack.length === 0 ? true : tagMatcher[tmpTags.pop()];;
}

console.log(validateString('<div><p></p>'))
