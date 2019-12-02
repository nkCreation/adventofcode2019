const { data } = require("./input.json");

console.log(calculateWithInputs(12, 2, [...data]));
console.log(findRightInputs(19690720));

function findRightInputs(outputToFind) {
  let alertCode;

  programLoopTest: for (let inputOne = 0; inputOne < 100; inputOne++) {
    for (let inputTwo = 0; inputTwo < 100; inputTwo++) {
      const results = calculateWithInputs(inputOne, inputTwo, [...data]);

      if (results === outputToFind) {
        alertCode = 100 * inputOne + inputTwo;
        break programLoopTest;
      }
    }
  }
  return alertCode;
}

function calculateWithInputs(inputOne, inputTwo, memory) {
  memory[1] = inputOne;
  memory[2] = inputTwo;

  return program(memory)[0];
}

function program(array) {
  for (let index = 0; index < array.length; index += 4) {
    const action = array[index];

    if (action === 99) break;

    const inputs = [array[array[index + 1]], array[array[index + 2]]];
    array[array[index + 3]] =
      action === 1
        ? inputs.reduce((a, b) => a + b, 0)
        : action === 2
        ? inputs.reduce((a, b) => a * b, 1)
        : array[array[index + 3]];
  }

  return array;
}
