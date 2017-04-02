var Maze = require('./maze.js');
var lab = new Maze(49, 49);

var svg = getNode('svg');
document.body.appendChild(svg);

drawMaze(lab);

function getNode(node, attr) {
  var result = document.createElementNS('http://www.w3.org/2000/svg', node);
  for (var prop in attr) {
    result.setAttributeNS(null, prop, attr[prop]);
  }
  return result;
}

function drawMaze(maze) {
  for (var x = 0; x < maze.width; x++) {
    for (var y = 0; y < maze.height; y++) {
      var cell = maze.matrix[x][y];
      svg.appendChild(getNode('rect', {
        'x': (10 * x),
        'y': (10 * y),
        'width': 10,
        'height': 10,
        'fill': cell.value === '#' ? 'black' : 'white'
      }));
    }
  }
}
