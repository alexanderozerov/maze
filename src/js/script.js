var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var text = document.querySelector('.text');
var buttonBuild = document.getElementById('build');

var width = 79;
var height = 59;
var targetX = 77;
var targetY = 57;
var mazeReady = false;
var runBuild = false;
var mazeSolved = false;

var maze = createMaze(width, height);

function createMaze(w, h) {
  var result = [];
  for (var x = 0; x < w; x++) {
    result[x] = [];
    for (var y = 0; y < h; y++) {
      if (x % 2 !== 0 && y % 2 !== 0 && x < w - 1 && y < h - 1) {
        result[x][y] = new Cell(x, y, ' ');
      } else {
        result[x][y] = new Cell(x, y, '#');
      }
    }
  }
  return result;
}

buttonBuild.addEventListener('click', function () {
  runBuild = true;
});


var startCell = maze[1][1];
startCell.value = '!';
var stack = [startCell];


function solve(tX, tY) {
  if (startCell.x === tX && startCell.y === tY) {
    startCell.value = '!';
    mazeSolved = true;
    return;
  }
  var neigbours = getNeigbours(startCell, maze, width, height, 1);
  if (neigbours.length !== 0) {
    startCell.value = '!';
    stack.push(startCell);
    var neigbour = neigbours[Math.floor(Math.random() * neigbours.length)];
    neigbour.value = '*';
    console.log('startCell = ' + startCell.x + ' ' + startCell.y);
    console.log('neigbour = ' + neigbour.x + ' ' + neigbour.y);
    startCell = neigbour;
  } else {
    startCell = stack.pop();
    startCell.value = '*';
  }
}

function build() {
  if (stack.length !== 0) {
    var neigbours = getNeigbours(startCell, maze, width, height);
    if (neigbours.length !== 0) {
      var neigbour = neigbours[Math.floor(Math.random() * neigbours.length)];
      neigbour.value = '!';
      stack.push(neigbour);
      console.log('startCell = ' + startCell.x + ' ' + startCell.y);
      console.log('neigbour = ' + neigbour.x + ' ' + neigbour.y);
      removeWall(startCell, neigbour, maze);
      startCell = neigbour;
    } else {
      startCell = stack.pop();
      startCell.value = '*';
    }
  } else {
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        if (maze[x][y].value === '*') {
          maze[x][y].value = ' ';
        }
      }
    }
    mazeReady = true;
  }
}

function removeWall(c1, c2, m) {
  var dx = (c1.x + c2.x) / 2;
  var dy = (c1.y + c2.y) / 2;
  var tX = dx === 0 ? c1.x : dx;
  var tY = dy === 0 ? c1.y : dy;
  console.log('removing wall ' + tX + ' ' + tY);
  m[targetX][targetY].value = '*';
}

function getNeigbours(c, m, w, h, step = 2) {
  var result = [];
  var up = { x: c.x, y: c.y - step };
  var rt = { x: c.x + step, y: c.y };
  var dw = { x: c.x, y: c.y + step };
  var lt = { x: c.x - step, y: c.y };
  var temp = [up, rt, dw, lt];
  temp.forEach(function (elem) {
    if (elem.x > 0 && elem.x < w && elem.y > 0 && elem.y < h) {
      var tempCell = m[elem.x][elem.y];
      if (tempCell.value === ' ') {
        result.push(tempCell);
      }
    }
  });
  return result;
}

function Cell(x, y, value) {
  this.x = x;
  this.y = y;
  this.value = value;
}

function drawMaze(m, w, h) {
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      drawCell(m[x][y]);
    }
  }
}

function drawCell(c) {
  var colors = { '#': 'black', ' ': 'white', '*': 'red', '!': 'green', '$': '#67d5ff' };
  ctx.beginPath();
  ctx.fillStyle = colors[c.value];
  ctx.fillRect(c.x * 10, c.y * 10, 10, 10);
  ctx.fill();
  ctx.closePath();
}

function play() {
  if (!mazeReady) {
    if (runBuild) {
      build();
    }
  } else {
    text.innerHTML = 'labyrinth builded';
    if (!mazeSolved) {
      solve(targetX, targetY);
    } else {
      text.innerHTML = 'labyrinth solved';
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze(maze, width, height);
  play();
}

setInterval(draw, 1000 / 60);
