// We want to generate all possible vehicle plates following these rules:

//  - Possible characters are [a, b, c, 1, 2, 3]
//  - length can be 5 or 6 characters (If 6 characters, add a dash in the middle)
//  - Needs to start with a letter and then alternate between letter and digits
//  - The same letter can appear multiple time
//  - Digits need to be unique and in decreasing order

// b3a-2c1 and c2b1c are valid examples.


/**
 * I. generate combinations with the following conditions
 * - character repetition possible
 * - numbers are not repetitive
 * - numbers must be in decreassing order
 * - length can be 5 or 6
 * - if six insert - in the middle
 * 
 * II. solid examples
 * c2b1c
 * b3a-2c1
 * 
 * III. solve
 * - generate all possible combinations
 * - pick only of the length 6 and 5
 * - check character contraint
 * - check numeric contraint
 * - check decreassing order of numbers
 * - insert dash 
 * 
 * => There are 2^n possible combinations
 * [1, 2]
 * [[], [1], [2], [1, 2]]
 * [1,2]
 * store 1
 * [2]
 * store 2
 * []
 * return [[]]
 * create [...returned, store]
 *  return array [returned, created]
 * 
 * create [...returned, store]
 * 
 */

function generateAllCombinations(characters) {
  if(characters.length === 0) return [[]];
  
  const combinations = [];
  const [store, ...remaining] = characters;

  if(remaining) {
    const currentCombintaions = generateAllCombinations(remaining);

    currentCombintaions.forEach((ele) => {
      combinations.push(ele);
      combinations.push(ele.concat(store));
    });
  }

  return combinations
}


let combinations = generateAllCombinations(['a', 'b', 'c', 1, 2, 3]);

// filter length of 5 and 6
combinations = combinations.filter(
  comb => {
    const length = comb.length;
    return length === 5 || length === 6;
  });

let allPossiblePerms = [];


function generateAllPermutations(combs) {
  const allPerms = [];
  // This is where I stuck now!
  // previously I could not come down to this place also
  // logic to generate all permutationswq with repetions

  // I took approximatly 1 hr code this file
  /**
   * [1, 2 , 3]
   * 
   * [1], [2], [3]
   * 
   * 
   * 
   */
  
  return [combs];
}


// generate all permutations
combinations.forEach((comb) => {
    const combs = generateAllPermutations(combinations);
    allPossiblePerms.concat(combs);
})


// filter permutations not starting with letter
allPossiblePerms = allPossiblePerms.filter(
  comb => {
    try {

      const firstCharCode = String(comb[0]).charCodeAt(0);
      if(firstCharCode <= 122 && firstCharCode >= 97) {
        return true;
      }

      if(firstCharCode <= 90 && firstCharCode >= 65) {
        return true;
      }
    } catch {
      console.log(comb);
      throw new TypeError('done');
    }
    return false;
  }
);

console.log(allPossiblePerms.length);

// alternate between numbers and characters
allPossiblePerms = allPossiblePerms.filter(
  comb => {
    let lastNumber;
    comb.forEach((char) => {
      if(Number.isSafeInteger(Number(char))) {
        if(!lastNumber) {
          lastNumber = Number(char);
        } else if(lastNumber <= Number(char)) {
          return false;
        } else {
          lastNumber = Number(char);
        }
      }
    });
    return true;
  }
)

// put dash inbetween when 6 char long
allPossiblePerms = allPossiblePerms.map((comb) => {
  if(comb.length === 6) {
    return comb.splice(3, 0, '-');
  }

  return comb;
});


console.log(allPossiblePerms.length);
