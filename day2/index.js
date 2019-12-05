import { IntCodeProgram } from '../utils/utils';
import { data } from './input.json';

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

  return IntCodeProgram(memory)[0];
}
