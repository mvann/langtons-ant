var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

var CELL_LENGTH = 2;

var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;

var LANGSTON = 0;
var FIBONACCI = 1;
var SPIRAL = 2;

var ANT_START_X = 250;
var ANT_START_Y = 125;
var ANT_START_DIRECTION = UP;
var SPAWN_OFFSET = -20;
var NUM_ANTS_X = 10;
var NUM_ANTS_Y = 10;

var INVERSE_GAME_SPEED = 1;

grid = makeGrid(500, 250);

// var ants = createAnts(NUM_ANTS_X, NUM_ANTS_Y);
var ants = [new Ant(ANT_START_X, ANT_START_Y, UP, FIBONACCI)];

// var ivan = new Ant(ANT_START_X, ANT_START_Y, ANT_START_DIRECTION);
//
// var katrina = new Ant(ANT_START_X + X_OFFSET, ANT_START_Y, ANT_START_DIRECTION);

drawEverything();
var counter = 1;
window.requestAnimationFrame(runGame);

function Ant(xIn, yIn, directionIn, algorithmIn){
  this.x = xIn;
  this.y = yIn;
  this.direction = directionIn;
  this.algorithm = algorithmIn;
  this.state = 0;

  this.draw = function(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x * CELL_LENGTH, this.y * CELL_LENGTH, CELL_LENGTH, CELL_LENGTH);
  };

  this.move = function(){
    if(this.algorithm === LANGSTON) this.langston();
    else if(this.algorithm === FIBONACCI) this.fibonacci();
    else if(this.algorithm === SPIRAL) this.spiral();
  };

  this.langston = function(){
    if(grid[this.y][this.x] === 0){
      grid[this.y][this.x] = 1;
      this.moveRight();
      console.log('right');
    }
    else /*grid[this.y][this.x] === 1*/ {
      grid[this.y][this.x] = 0;
      this.moveLeft();
      console.log('left');
    }
  };

  this.fibonacci = function(){
    if(this.state === 0){
      if(grid[this.y][this.x] === 0){
        grid[this.y][this.x] = 1;
      }
      this.state = 1;
      this.moveLeft();
    }
    else if(this.state === 1){
      if(grid[this.y][this.x] === 0){
        grid[this.y][this.x] = 1;
        this.moveRight();
      }
      else if(grid[this.y][this.x] === 1){
        grid[this.y][this.x] = 0;
        this.state = 0;
        this.moveForward();
      }
    }
    console.log(this.state);
    console.log(grid[this.y][this.x]);
  };

  this.spiral = function(){
    if(this.state === 0){
      if(grid[this.y][this.x] === 0){
        grid[this.y][this.x] = 1;
        this.moveForward();
        this.state = 1;
      }
      else if(grid[this.y][this.x] === 1){
        this.moveLeft();
      }
    }
    else if(this.state === 1){
      if(grid[this.y][this.x] === 0){
        grid[this.y][this.x] = 1;
        this.moveRight();
      }
      else if(grid[this.y][this.x] === 1){
        grid[this.y][this.x] = 0;
        this.moveForward();
        this.state = 0;
      }
    }
  };

  this.moveForward = function(){
    if(this.direction === UP){
      this.y --;
    }
    else if(this.direction === RIGHT){
      this.x ++;
    }
    else if(this.direction === DOWN){
      this.y ++;
    }
    else if(this.direction === LEFT){
      this.x --;
    }
  };

  this.moveLeft = function(){
    if(this.direction === UP){
      this.x --;
      this.direction = LEFT;
    }
    else if(this.direction === RIGHT){
      this.y --;
      this.direction = UP;
    }
    else if(this.direction === DOWN){
      this.x ++;
      this.direction = RIGHT;
    }
    else if(this.direction === LEFT){
      this.y ++;
      this.direction = DOWN;
    }
  }

  this.moveRight = function(){
    if(this.direction === UP){
      this.x ++;
      this.direction = RIGHT;
    }
    else if(this.direction === RIGHT){
      this.y ++;
      this.direction = DOWN;
    }
    else if(this.direction === DOWN){
      this.x --;
      this.direction = LEFT;
    }
    else if(this.direction === LEFT){
      this.y --;
      this.direction = UP;
    }
  }
}



function runGame(){
  if(counter % INVERSE_GAME_SPEED === 0){
    moveAnts();
    drawEverything();
  }
  counter++;
  window.requestAnimationFrame(runGame);
}

function moveAnts(){
  ants.forEach(function(val){
    val.move();
  });
}

function drawEverything(){
  clearCanvas();
  drawGrid();
  drawAnts();
}

function clearCanvas(){
  ctx.clearRect(0,0,c.width,c.height);
}

function drawGrid(){
  for(var i = 0; i < grid.length; i++){
    for(var j = 0; j < grid[0].length; j++){
      if(grid[i][j] === 1){
        ctx.fillStyle = 'black';
        ctx.fillRect(j * CELL_LENGTH, i * CELL_LENGTH, CELL_LENGTH, CELL_LENGTH);
      }
    }
  }
}

function drawAnts(){
  ants.forEach(function(val){
    val.draw();
  });
}

function createAnts(xIn, yIn){
  var tempAnts = [];
  for(var i = 0; i < yIn; i++){
    for(var j = 0; j < xIn; j++){
      var tempX = ANT_START_X + SPAWN_OFFSET * j;
      var tempY = ANT_START_Y + SPAWN_OFFSET * i;
      tempAnts.push(new Ant(tempX, tempY, ANT_START_DIRECTION));
    }
  }
  return tempAnts;
}

function makeGrid(widthIn, heightIn){
  var tempGrid = [];
  for(var i = 0; i < heightIn; i++){
    tempGrid.push([]);
    for(var j = 0; j < widthIn; j++){
      tempGrid[i].push(0);
    }
  }
  return tempGrid;
}
