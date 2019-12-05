export const IntCodeProgram = (array, input = 0) => {
  let debugCode = "";
  let pointer = 0;
  const regexToFindAction = /0?[0-9]{1}$/;

  parseInstruction(pointer, array);

  function parseInstruction(pointer, array) {
    let nextPointer;
    const index = pointer;
    const extractAction = array[index].toString().match(regexToFindAction);
    const params = array[index]
      .toString()
      .replace(extractAction[0], "")
      .split("")
      .reverse();
    const action = parseInt(extractAction[0]);
    let inputs = [];

    if (action === 99) return;

    switch (action) {
      case 5:
        inputs = [
          getValueWithParams(array, index, params[0], 0),
          getValueWithParams(array, index, params[1], 1)
        ];

        nextPointer = inputs[0] !== 0 ? inputs[1] : pointer + 3;
        break;
      case 6:
        inputs = [
          getValueWithParams(array, index, params[0], 0),
          getValueWithParams(array, index, params[1], 1)
        ];

        nextPointer = inputs[0] === 0 ? inputs[1] : pointer + 3;
        break;
      case 7:
        nextPointer = pointer + 4;
        inputs = [
          getValueWithParams(array, index, params[0], 0),
          getValueWithParams(array, index, params[1], 1)
        ];

        array[array[index + 3]] = inputs[0] < inputs[1] ? 1 : 0;

        break;
      case 8:
        nextPointer = pointer + 4;
        inputs = [
          getValueWithParams(array, index, params[0], 0),
          getValueWithParams(array, index, params[1], 1)
        ];

        array[array[index + 3]] = inputs[0] === inputs[1] ? 1 : 0;

        break;
      case 3:
        nextPointer = pointer + 2;
        array[array[index + 1]] = input;
        break;
      case 4:
        nextPointer = pointer + 2;
        const output = getValueWithParams(array, index, params[0], 0);
        debugCode += output !== 0 ? output.toString() : "";
        break;
      case 1:
      case 2:
        nextPointer = pointer + 4;

        inputs = [
          getValueWithParams(array, index, params[0], 0),
          getValueWithParams(array, index, params[1], 1)
        ];

        array[array[index + 3]] =
          action === 1
            ? inputs.reduce((a, b) => a + b, 0)
            : action === 2
            ? inputs.reduce((a, b) => a * b, 1)
            : array[array[index + 3]];
        break;
    }

    if (array[nextPointer]) {
      parseInstruction(nextPointer, array);
    }
  }

  console.log(debugCode);

  return array;
};

function getValueWithParams(array, pointer, params, index) {
  return params && params === "1"
    ? array[pointer + index + 1]
    : array[array[pointer + index + 1]];
}
