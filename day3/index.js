// •--------> x
// |
// |
// |   Repère
// |
// v
// y

const { data } = require("./input.json");

const wire1points = generateAllPoints(data[0]);
const wire2points = generateAllPoints(data[1]);

const commonPoints = findIntersections(wire1points, wire2points);

console.log(sortToFindClosest([...commonPoints])[1]);
console.log(getMinSteps(wire1points, wire2points, commonPoints));

function getMinSteps(array1, array2, intersections) {
  let minSteps = Infinity;

  intersections.forEach(point => {
    let sumOfSteps =
      parseInt(array1.indexOf(point)) + parseInt(array2.indexOf(point));

    minSteps = sumOfSteps < minSteps && sumOfSteps > 0 ? sumOfSteps : minSteps;
  });

  return minSteps;
}

function findIntersections(array1, array2) {
  return array1.filter(value => array2.includes(value));
}

function sortToFindClosest(array) {
  return array.sort((a, b) => {
    let Acoords = a.split(",");
    let Bcoords = b.split(",");
    return (
      Math.abs(parseInt(Acoords[0])) +
      Math.abs(parseInt(Acoords[1])) -
      (Math.abs(parseInt(Bcoords[0])) + Math.abs(parseInt(Bcoords[1])))
    );
  });
}

function generateAllPoints(wire) {
  return wire.split(",").reduce(
    (acc, val) => {
      const coords = acc[acc.length - 1].split(",");
      const oldX = parseInt(coords[0]);
      const oldY = parseInt(coords[1]);
      const moveType = val.split("").splice(0, 1)[0];
      const distance = parseInt(val.replace(moveType, ""));

      for (let i = 1; i <= distance; i++) {
        if (moveType === "R") {
          acc.push(`${oldX + i},${oldY}`);
        } else if (moveType === "L") {
          acc.push(`${oldX - i},${oldY}`);
        } else if (moveType === "D") {
          acc.push(`${oldX},${oldY + i}`);
        } else if (moveType === "U") {
          acc.push(`${oldX},${oldY - i}`);
        }
      }

      acc.pus;

      return acc;
    },
    ["0,0"]
  );
}

function generateMajorPoints(wire) {
  return wire.split(",").reduce(
    (acc, val) => {
      const coords = acc[acc.length - 1].split(",");
      const oldX = parseInt(coords[0]);
      const oldY = parseInt(coords[1]);
      const moveType = val.split("").splice(0, 1)[0];
      const distance = parseInt(val.replace(moveType, ""));

      if (moveType === "R") {
        acc.push(`${oldX + i},${oldY}`);
      } else if (moveType === "L") {
        acc.push(`${oldX - i},${oldY}`);
      } else if (moveType === "D") {
        acc.push(`${oldX},${oldY + i}`);
      } else if (moveType === "U") {
        acc.push(`${oldX},${oldY - i}`);
      }

      acc.pus;

      return acc;
    },
    ["0,0"]
  );
}
