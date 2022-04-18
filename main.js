const Player = function(name) {
  return {
    name
  }
}

const gameBoard = (() => {
  const x = 'X';
  const y = 'Y';
  const board = new Array(9).fill('x')

  return {
    board
  }
})()

const displayController = (() => {
  const boardContainer = document.querySelector('#boardContainer');

  const createBoard = () => {
    gameBoard.board.forEach((position, index) => {
      boardContainer.children[index].textContent = position
    })
  }

  const start = () => {
    createBoard()
  }

  return {
    start
  }
})()

displayController.start()