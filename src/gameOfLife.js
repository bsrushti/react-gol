const {
  initialGrid,
  generateWorld,
  generateNextWorld,
  getAliveCellsOfNextGeneration,
  filterInputs,
  cellCoordinates,
  getDimension
} = require("./util.js");

const nextGeneration = function(currGeneration, bounds) {
  let { topLeft } = bounds;
  let { height, width } = getDimension(bounds);
  let filteredCurrentGeneration = currGeneration.filter(x =>
    filterInputs(x, cellCoordinates(bounds))
  );
  filteredCurrentGeneration = filteredCurrentGeneration.map(cell => [
    cell[0] - topLeft[0],
    cell[1] - topLeft[1]
  ]);
  let grid = generateWorld(
    initialGrid(width, height),
    filteredCurrentGeneration
  );
  let nextWorld = generateNextWorld(grid);
  return getAliveCellsOfNextGeneration(nextWorld, height, width).map(cell => [
    cell[0] + topLeft[0],
    cell[1] + topLeft[1]
  ]);
};

const returnGrid = function(currGeneration, bounds) {
  let { topLeft } = bounds;
  let { height, width } = getDimension(bounds);
  let filteredCurrentGeneration = currGeneration.filter(x =>
    filterInputs(x, cellCoordinates(bounds))
  );
  filteredCurrentGeneration = filteredCurrentGeneration.map(cell => [
    cell[0] - topLeft[0],
    cell[1] - topLeft[1]
  ]);
  let grid = generateWorld(
    initialGrid(width, height),
    filteredCurrentGeneration
  );
  let nextWorld = generateNextWorld(grid);
  return nextWorld;
};

module.exports = { nextGeneration, returnGrid };
