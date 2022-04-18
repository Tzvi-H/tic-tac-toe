const Player = function(name) {
  return {
    name
  }
}

const gameBoard = new Array(9);

const displayController = (() => {
  const boardContainer = document.querySelector('#boardContainer');
  const interactiveContainer = document.querySelector('#interactiveContainer')
  const scoresContainer = document.querySelector('#scores')
  const scores = { computer: 0, user: 0 }
  let clickedBoardIndex
  let name;

  const startGame = e => {
    name = document.querySelector('input').value
    scoresContainer.hidden = false;
    scoresContainer.querySelector('#userName').textContent = name;
    updateScores()
    startGameFlow()
  }

  const handleBoardClick = e => {
    if (!e.target.dataset.index) return;
    const index = parseInt(e.target.dataset.index) - 1;

    if (gameBoard[index]) {
      interactiveContainer.textContent = 'Please choose an available tile'
      return
    } else {
      markBoard(index, 'X')
    }
  }

  const markBoard = (index, marker) => {
    gameBoard[index] = marker;
    boardContainer.children[index].textContent = marker;
  }

  const startGameFlow = () => {
    interactiveContainer.textContent = 'click an available tile'
    boardContainer.addEventListener('click', handleBoardClick)
  }

  const updateScores = () => {
    scoresContainer.querySelector('#computerScore').textContent = scores.computer
    scoresContainer.querySelector('#userScore').textContent = scores.user
  }

  const start = () => {
    document.querySelector('button')
            .addEventListener('click', startGame)
  }

  return {
    start
  }
})()

displayController.start()