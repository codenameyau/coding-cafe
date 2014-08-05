/*!
 * Forest Ecosystem Simulation
 * codenameyau.github.io
 *
 * Challenge Description:
 * http://redd.it/27h53e
 * http://codegolf.stackexchange.com/q/35322/30051
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
  this.checkProperty(this.settings, 'cellSize', 5);
  this.checkProperty(this.settings, 'delay', 500);
  this.checkProperty(this.settings, 'running', true);
};

GridCanvas.prototype.drawGrid = function(grid) {
  this.ctx.strokeStyle = 'rgb(30, 30, 30)';
  var radius = 4;
  var cellSize = 10;
  for (var i=0; i<grid.length; ++i) {
    var rows = grid[i].length;
    for (var j=0; j<rows; ++j) {
      var posX = i*cellSize+this.settings.radius+1;
      var posY = j*cellSize+radius+1;
      this.ctx.moveTo(posX, posY);
      this.ctx.beginPath();
      this.ctx.arc(posX, posY, radius, 0, 2*Math.PI, true);
      this.ctx.stroke();
    }
  }
};

GridCanvas.prototype.initializeCanvas = function() {
  var canvas = document.getElementById(this.settings.canvasID);
  canvas.width  = this.settings.gridCols * this.settings.cellSize;
  canvas.height = this.settings.gridRows * this.settings.cellSize;
  this.ctx = canvas.getContext('2d');
};

GridCanvas.prototype.checkProperty = function(object, property, value) {
  if (object && typeof object[property] === 'undefined') {
    object[property] = value;
  }
};


/****************************
 * GridSimulation - Backend *
 ****************************/
function GridSimulation(canvas) {
  this.canvas = canvas;
  this.initializeGrid();
  this.initializeSimulation();
  this.initializeEventHandlers();
}

GridSimulation.prototype.update = function() {
  console.log('Updating');
};

GridSimulation.prototype.pause = function() {
  this.simulation.running = false;
  console.info('Paused');
};

GridSimulation.prototype.resume = function() {
  this.simulation.running = true;
  console.info('Resuming');
};

GridSimulation.prototype.togglePause = function() {
  if (this.simulation.running) { this.pause(); }
  else { this.resume(); }
};

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
    running: true,
    time: 0,
  };
};

GridSimulation.prototype.initializeEventHandlers = function() {
  window.addEventListener('focus', this.resume.bind(this), false);
  window.addEventListener('blur', this.pause.bind(this), false);
  window.addEventListener('keydown', this._keyboardInputHandler.bind(this), false);
};

GridSimulation.prototype._keyboardInputHandler = function(event) {
  switch (event.which) {

  case 32: // spacebar
    this.togglePause();
    break;

  }
};

GridSimulation.prototype.getGrid = function() {
  return this.grid;
};

GridSimulation.prototype.run = function() {
  this.canvas.drawGrid(this.grid);
  console.info('Running');
};



/**************************
 * Program Initialization *
 **************************/
function Life(options) {

  this.movement = 0;
}

Life.prototype.checkProperty = function(object, property, value) {
  if (object && typeof object[property] === 'undefined') {
    object[property] = value;
  }
};

(function() {

  // Specify configuration
  var CONFIG = {
    canvasID: 'imagination',
    gridRows: 20,
    gridCols: 20,
    cellSize: 10,
    delay: 1000,
    radius: 5,
  };

  // Lumberjack Object
  var JACK = {

  };


  // GridCanvas: visualizes the simulation with canvas
  // GridSimulation: handles the backend simulation
  var simulationCanvas = new GridCanvas(CONFIG);
  var simulation = new GridSimulation(simulationCanvas);
  var grid = simulation.getGrid();

  // Generate forest ecosystem
  // Start: 10% lumberjacks, 50% trees, 2% bears


  console.log(simulation);
  // simulation.run();

})();
