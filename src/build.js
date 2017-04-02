/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Maze = __webpack_require__(0);
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


/***/ })
/******/ ]);