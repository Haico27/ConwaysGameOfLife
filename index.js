//user can set the height and width of the grid
var gridHeight = prompt("Enter gridHeight: ");
var gridWidth = prompt("Enter gridWidth: ");

//function that creates the board and set up the cells
function createBoard(height, width) {
  var board = document.getElementById('board');

  for (var x = 0; x < width; x++) {
    var row = document.createElement("div");
    row.id = "row-" + x;
    row.className = "row";
    for (var y = 0; y < height; y++) {
      var cell = document.createElement("div");
      cell.className = "gridCell";
      cell.id = "cell-" + x + "-" + y;
      cell.addEventListener("click", function(event) {
        var x = event.target.id[5];
        var y = event.target.id[7];
        event.target.classList.toggle('alive')
      })
      row.appendChild(cell);
    }
    board.appendChild(row)
  }
}


//board gets created when page is fully loaded
window.onload = function() {
  createBoard(gridHeight, gridWidth)
}



//function that returns the number of alive neighbours of the cell with coordinates x and y
function numberOfAliveNeighbours(x,y) {
  var aliveNeighbours = 0;
  var getIdSelf = getCellId(x,y)
  var elementId = document.getElementById(getIdSelf)

  if (elementId.classList.contains('alive')) {
    aliveNeighbours--
  }


  for(var i=x-1; i<=x+1; i++) {
    for(var j=y-1; j<=y+1; j++) {

      //get id of neighbouring cell
      var cellId = getCellId(i,j)
      var neighbourElement = document.getElementById(cellId)

      if( i >= 0 && i < gridWidth && j >= 0 && j < gridHeight) {
        if(neighbourElement.classList.contains('alive')) {
          aliveNeighbours++;
        }
      }
    }
  }
  return aliveNeighbours
}


//function that gets the id of the cell with coordinates x and y
function getCellId(x,y) {
  return 'cell-' + x + '-' + y;
}

function showNextGeneration() {
  setInterval(function() {
    var boardValues = [];

    //loop that creates a new setup for the grid, for the nextGeneration
    for (var i = 0; i < gridWidth; i++) {
      var row = [];
      for (var j = 0; j < gridHeight; j++) {
          var cellId = getCellId(i,j)
          var elementId = document.getElementById(cellId)
          var aliveNeighbours = numberOfAliveNeighbours(i,j);

            if (elementId.classList.contains('alive')) {
              //cell dies, death by isolation
              if (aliveNeighbours <= 1) {
                row.push(false)
              //cell dies, death by overcrowding
              } else if (aliveNeighbours >= 4) {
                row.push(false)
              } else {
                row.push(true)
              }
            } else {
              //cell comes alive, birth
                if (aliveNeighbours === 3) {
                  row.push(true)
                } else {
                  row.push(false)
                }
              }
            }
      boardValues.push(row)
    }

    //loop that gives each cell in the new setup a new class: add 'alive' or remove 'alive'
    for (var i = 0; i < boardValues.length; i++) {
      var row = boardValues[i]

      for (var j = 0; j < row.length; j++) {
          var cell = row[j]
          var cellId = getCellId(i,j)
          var elementId = document.getElementById(cellId)

          if (cell) {
            elementId.classList.add('alive')
          } else {
            elementId.classList.remove('alive')
          }
      }
    }
  }, 500)
}
