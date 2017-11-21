var gridHeight = prompt("Enter grid height:");
var gridWidth = prompt("Enter grid width: ");

function createBoard(height, width) {
  var board = document.getElementById('board');

  for (var x = 0; x < width; x++) {
    var row = document.createElement("div");
    row.className = "row"
    for (var y = 1; y <= height; y++) {
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

createBoard(gridHeight, gridWidth)


//function that returns the number of alive neighbours of a cell with coordinates x and y
function numberOfAliveNeighbours(x,y) {
  var aliveNeighbours = 0;

  var self = document.getElementById('cell-' + x + '-' + y)

  //don't count the cell itself, only its neighbours
  if (self.classList.contains('alive')) {
    aliveNeighbours--;
  }


  for (var i = x-1; i <= x+1; i++) {
    for (var j = y-1; j <= y+1; j++) {

      //the 10 stands for the gridHeight and gridWidth, needs to be changed when this function is called in runGame function
      if (i>=0 && i<10 && j>=0 && j<10) {
        var cellId = document.getElementById('cell-' + i + '-' + j)
        console.log("cellId: ", cellId)
        if(cellId.classList.contains('alive')) {
          aliveNeighbours++;
        }
      }

    }
  }

  return aliveNeighbours
}
