// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! 
// Your players are also going to be stored in objects… and you’re probably going to want an object to 
// control the flow of the game itself.
// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a 
// module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), 
// use a module. If you need multiples of something (players!), create them with factories.

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

  const createPositionElement = (position, index) => {
    const element = document.createElement('div')
    element.textContent = position
    element.dataset.index = index
    return element;
  }

  const createBoard = () => {
    gameBoard.board.forEach((position, index) => {
      const element = createPositionElement(position, index);
      boardContainer.appendChild(element)
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