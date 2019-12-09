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

console.log(sortToFindClosest([...commonPoints])[0]);
console.log(getMinSteps(wire1points, wire2points, commonPoints));

function getMinSteps(map1, map2, intersections) {
  let minSteps = Infinity;

  intersections.forEach(point => {
    let sumOfSteps = parseInt(map1.get(point)) + parseInt(map2.get(point));

    minSteps = sumOfSteps < minSteps ? sumOfSteps : minSteps;
  });

  return minSteps;
}

function findIntersections(map1, map2) {
  const cp = [];

  for (const key of map1.keys()) {
    if (map2.has(key)) {
      cp.push(key);
    }
  }

  return cp;
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
  const instructions = wire.split(",");
  const points = new Map();

  let oldX = 0,
    oldY = 0,
    moves = 1;

  instructions.map(val => {
    const moveType = val.split("").splice(0, 1)[0];
    const distance = parseInt(val.replace(moveType, ""));

    for (let i = 1; i <= distance; i++) {
      if (moveType === "R") {
        oldX++;
      } else if (moveType === "L") {
        oldX--;
      } else if (moveType === "D") {
        oldY++;
      } else if (moveType === "U") {
        oldY--;
      }

      points.set(`${oldX},${oldY}`, moves++);
    }
  });

  return points;
}
