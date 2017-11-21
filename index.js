var boardWidth = 10;
var boardHeight = 5;

function createBoard(height, width) {
  var board = document.getElementById('board');

  for (var x = 0; x < width; x++) {
    var row = document.createElement("div");
    row.className = "row"
    for (var y = 1; y <= height; y++) {
      var cell = document.createElement("div");
      cell.className = "gridCell";
      cell.addEventListener("click", function(event) {
        event.target.classList.toggle('alive')
      })
      row.appendChild(cell);
    }
    board.appendChild(row)
  }

}

createBoard(boardHeight, boardWidth)