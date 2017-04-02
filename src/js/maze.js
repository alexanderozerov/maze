function Maze(width, height) {
  this.width = width;
  this.height = height;
  this.matrix = createMatrix();

  function createMatrix() {
    var result = [];
    for (var x = 0; x < width; x++) {
      result[x] = [];
      for (var y = 0; y < height; y++) {
        if (x % 2 !== 0 && y % 2 !== 0 && x < width - 1 && y < height - 1) {
          result[x][y] = new Cell(x, y, ' ');
        } else {
          result[x][y] = new Cell(x, y, '#');
        }
      }
    }
    return result;
  }

  function Cell(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
  }
}

module.exports = Maze;
