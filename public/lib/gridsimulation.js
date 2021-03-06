/*!
 * GridSimulation
 * MIT License (c) 2014
 * codenameyau.github.io
 *
 * Description:
 * Grid simulation library with canvas renderer
 */
'use strict';


/******************************
 * GridCanvas - Visualization *
 ******************************/
function GridCanvas(config) {
  this.initializeSettings(config);
  this.initializeCanvas();
}

GridCanvas.prototype.initializeSettings = function(settings) {
  this.settings = settings;
  this.checkProperty(this.settings, 'gridRows', 50);
  this.checkProperty(this.settings, 'gridCols', 50);
  this.checkProperty(this.settings, 'cellSize', 30);
  this.checkProperty(this.settings, 'delay', 200);
};

GridCanvas.prototype.initializeCanvas = function() {
  var canvas = document.getElementById(this.settings.canvasID);
  canvas.width  = this.settings.gridCols * this.settings.cellSize + 10;
  canvas.height = this.settings.gridRows * this.settings.cellSize + 10;
  this.ctx = canvas.getContext('2d');
};


/**************************
 * GridCanvas - Utilities *
 **************************/
GridCanvas.prototype.checkProperty = function(object, property, value) {
  if (object && typeof object[property] === 'undefined') {
    object[property] = value;
  }
};

GridCanvas.prototype.drawGrid = function(grid) {
  var cellSize = this.settings.cellSize;
  var twoPI = 2*Math.PI;
  this.clearCanvas();
  this.ctx.strokeStyle = 'rgba(60, 60, 60, 0.5)';
  for (var i=0, rows=grid.length; i<rows; i++) {
    for (var j=0, cols=grid[i].length, lenJ; j<cols; j++) {
      for (var k=0, cells=grid[i][j].length; k<cells; k++) {
        var occupant = grid[i][j][k];
        var radius = occupant.radius;
        var posX = i*cellSize + 20;
        var posY = j*cellSize + radius + 8;
        this.ctx.fillStyle = occupant.parameters.color;
        this.ctx.moveTo(posX, posY);
        this.ctx.beginPath();
        this.ctx.arc(posX, posY, radius, 0, twoPI, true);
        this.ctx.fill();
        this.ctx.stroke();
      }
    }
  }
};

GridCanvas.prototype.setBackground = function(color) {
  this.ctx.canvas.style.backgroundColor = color;
};

GridCanvas.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};


/******************************
 * GridSimulation Constructor *
 ******************************/
function GridSimulation(canvas) {
  this.canvas = canvas;
  this.initializeGrid();
  this.initializeSimulation();
}

GridSimulation.prototype.initializeGrid = function() {
  var gridRows = this.canvas.settings.gridRows;
  var gridCols = this.canvas.settings.gridCols;
  this.grid = [];
  for (var i=0; i<gridCols; i++) {
    this.grid[i] = [];
    for (var j=0; j<gridRows; j++) {
      this.grid[i][j] = [];
    }
  }
};

GridSimulation.prototype.initializeSimulation = function() {
  this.simulation = {
    size: this.canvas.settings.gridRows * this.canvas.settings.gridCols,
    rows: this.canvas.settings.gridRows,
    cols: this.canvas.settings.gridCols,
    running: false,
    time: 0,
    updater: null,
  };
};


/*****************************
 * GridSimulation - Controls *
 *****************************/
GridSimulation.prototype.pause = function() {
  this.simulation.running = false;
};

GridSimulation.prototype.resume = function() {
  this.simulation.running = true;
};

GridSimulation.prototype.isRunning = function() {
  return this.simulation.running;
};

GridSimulation.prototype.setUpdater = function(callback) {
  this.simulation.updater = callback;
};

GridSimulation.prototype.update = function() {
  if (!this.simulation.running) {return;}
  this.simulation.time++;
  this.simulation.updater();
  this.canvas.drawGrid(this.grid);
};

GridSimulation.prototype.run = function() {
  this.canvas.drawGrid(this.grid);
  window.setInterval(this.update.bind(this), this.canvas.settings.delay);
};

GridSimulation.prototype.spawn = function(value, row, col) {
  this.grid[row][col].push(value);
};

GridSimulation.prototype.validPosition = function(row, col) {
  return (row < this.simulation.rows &&
          col < this.simulation.cols &&
          row >= 0 && col >= 0 );
};

GridSimulation.prototype.differentCell = function(row, col, i, j) {
  return (row !== i || col !== j);
};

GridSimulation.prototype.unoccupied = function(row, col) {
  return this.grid[row][col].length === 0;
};

GridSimulation.prototype.splice = function(row, col, index) {
  return this.grid[row][col].splice(index, 1);
};

GridSimulation.prototype.move = function(x, y, z, row, col) {
  if (!this.validPosition(row, col) || !this.differentCell(x, y, row, col))
    {return;}
  var value = this.splice(x, y, z)[0];
  this.grid[row][col].push(value);
};

GridSimulation.prototype.getNeighbor8 = function(row, col) {
  var neighbors = [];
  for (var i=row-1, nextRow=row+1; i<=nextRow; i++) {
    for (var j=col-1, nextCol=col+1; j<=nextCol; j++) {
      if (this.differentCell(row, col, i, j) && this.validPosition(i, j)) {
        neighbors.push([i, j]);
      }
    }
  }
  return neighbors;
};

GridSimulation.prototype.getOpenSpace8 = function(row, col) {
  var openSpace = [];
  for (var i=row-1, nextRow=row+1; i<=nextRow; i++) {
    for (var j=col-1, nextCol=col+1; j<=nextCol; j++) {
      if (this.differentCell(row, col, i, j) &&
          this.validPosition(i, j) &&
          this.unoccupied(i, j)) {
        openSpace.push([i, j]);
      }
    }
  }
  return openSpace;
};

GridSimulation.prototype.getCell = function(row, col) {
  return this.grid[row][col];
};

GridSimulation.prototype.cellLength = function(row, col) {
  return this.grid[row][col].length;
};

GridSimulation.prototype.cellIndex = function(row, col, value) {
  var len = this.grid[row][col].length;
  var cell = this.grid[row][col];
  for (var i=0; i<len; i++) {
    if (cell[i] === value) {return i;}
  }
};


/******************************
 * GridSimulation - Utilities *
 ******************************/
GridSimulation.prototype.getGrid = function() {
  return this.grid;
};

GridSimulation.prototype.getDimensions = function() {
  return [this.simulation.rows, this.simulation.cols];
};

GridSimulation.prototype.getSize = function() {
  return this.simulation.size;
};

GridSimulation.prototype.randomChance = function() {
  return Math.random();
};

GridSimulation.prototype.randomInteger = function(min, max) {
  return parseInt(Math.random() * (max - min) + min, 10);
};

GridSimulation.prototype.randomPosition = function() {
  return [
    this.randomInteger(0, this.simulation.rows),
    this.randomInteger(0, this.simulation.cols),
  ];
};
