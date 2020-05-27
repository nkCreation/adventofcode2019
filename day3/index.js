// •--------> x
// |
// |
// |   Repère
// |
// v
// y

const begin = Date.now();
const { data } = require("./input.json");

const getMinSteps = (map1, map2, intersections) => {
  let minSteps = Infinity;

  intersections.forEach(point => {
    let sumOfSteps = parseInt(map1.get(point)) + parseInt(map2.get(point));

    minSteps = sumOfSteps < minSteps ? sumOfSteps : minSteps;
  });

  return minSteps;
};

const findIntersections = (map1, map2) => {
  return Array.from(map1.keys()).reduce((acc, key) => {
    if (map2.has(key)) {
      acc.push(key);
    }

    return acc;
  }, []);
};

const sortToFindClosest = array => {
  return array.sort((a, b) => {
    let Acoords = a.split(",");
    let Bcoords = b.split(",");
    return (
      Math.abs(parseInt(Acoords[0])) +
      Math.abs(parseInt(Acoords[1])) -
      (Math.abs(parseInt(Bcoords[0])) + Math.abs(parseInt(Bcoords[1])))
    );
  });
};

const generateAllPoints = wire => {
  const instructions = wire.split(",");
  const points = new Map();

  let oldX = 0,
    oldY = 0,
    moves = 1;

  instructions.map(val => {
    const moveType = val.split("").splice(0, 1)[0];
    const distance = parseInt(val.replace(moveType, ""));

    for (let i = 0; i < distance; i++) {
      switch (moveType) {
        case "R":
          oldX++;
          break;
        case "L":
          oldX--;
          break;
        case "D":
          oldY++;
          break;
        case "U":
          oldY--;
          break;
      }

      points.set(`${oldX},${oldY}`, moves++);
    }
  });

  return points;
};

const wire1points = generateAllPoints(data[0]);
const wire2points = generateAllPoints(data[1]);

const commonPoints = findIntersections(wire1points, wire2points);

console.log(sortToFindClosest([...commonPoints])[0]);
console.log(getMinSteps(wire1points, wire2points, commonPoints));

console.log(Date.now() - begin);
