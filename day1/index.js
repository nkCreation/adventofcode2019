const { data } = require("./input.json");

console.log(getFuelForEachModules(data).reduce((a, b) => a + b));
console.log(
  getFuelForEachModules(data)
    .map(getFuelForFuel)
    .reduce((a, b) => a + b)
);

function getFuelForFuel(fuel) {
  let totalFuel = fuel;

  while (fuel > 0) {
    fuel = Math.floor(fuel / 3) - 2;
    totalFuel += fuel > 0 ? fuel : 0;
  }

  return totalFuel;
}

function getFuelForEachModules(array) {
  return array.map(number => Math.floor(number / 3) - 2);
}
