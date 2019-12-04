const [begin, end] = [347312, 805915];

console.log(getPossibleResults(begin, end));
console.log(getPossibleResultsStrict(begin, end));

function getPossibleResults(min, max) {
  let results = [];
  for (let number = min; number < max; number++) {
    if (testTwoDigitsAreTheSame(number) && testIsAscendant(number)) {
      results.push(number);
    }
  }

  return results.length;
}

function getPossibleResultsStrict(min, max) {
  let results = [];
  for (let number = min; number < max; number++) {
    if (testTwoDigitsAreTheSame(number, true) && testIsAscendant(number)) {
      results.push(number);
    }
  }

  return results.length;
}

function testTwoDigitsAreTheSame(number, strict = false) {
  const digits = `${number}`.split("");
  let hasTwoIdenticalsDigits = false;
  let digitThatMatch = [];

  subloop: for (let i = 1; i < digits.length - 1; i++) {
    if (digits[i] === digits[i + 1] || digits[i] === digits[i - 1]) {
      if (!strict) {
        hasTwoIdenticalsDigits = true;
        break subloop;
      } else {
        if (!digitThatMatch.includes(digits[i])) {
          digitThatMatch.push(digits[i]);
        }
      }
    }
  }

  if (strict) {
    return digitThatMatch.some(
      digit => digits.filter(d => d === digit).length === 2
    );
  } else {
    return hasTwoIdenticalsDigits;
  }
}

function testIsAscendant(number) {
  const digits = `${number}`.split("");

  return digits.every(
    (digit, i) => digits[i + 1] === undefined || digit <= digits[i + 1]
  );
}
