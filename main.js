const gameBoard = new Array(9).fill(null);
const MAX_WINS = 2

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

  const isWinner = (board, marker) => {
    const markers = [...boardContainer.children].map(t => t.textContent)
    const winningPositionsCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ]

    return (
      winningPositionsCombos.some(combos => {
        return combos.every(position => {
          return markers[position] === marker;
        })
      })
    )
  }

  const boardIsFull = board => {
    return board.every(tile => tile === 'X' || tile === 'O')
  }

  const computerGoes = gameBoard => {
    let randomIndex = Math.floor(Math.random() * 9);
    while (gameBoard[randomIndex] !== null) {
      randomIndex = Math.floor(Math.random() * 9)
    }
    gameBoard[randomIndex] = 'O'
    markBoard(randomIndex, 'O')
  }

  const handleBoardClick = e => {
    if (!e.target.dataset.index) return;
    const index = parseInt(e.target.dataset.index) - 1;

    if (gameBoard[index]) {
      interactiveContainer.textContent = 'Please choose an available tile'
      return
    } 
      
    markBoard(index, 'X')

    if (isWinner(gameBoard, 'X')) {
      interactiveContainer.textContent = `${name} wins!`
      increaseScore('user')
      handleFinish()
    } else if (boardIsFull(gameBoard)) {
      interactiveContainer.textContent = `no more spaces left!`
      handleFinish()
    } else {
      computerGoes(gameBoard)
      if (isWinner(gameBoard, 'O')) {
        interactiveContainer.textContent = 'computer wins!'
        increaseScore('computer')
        handleFinish()
      } else if (boardIsFull(gameBoard)) {
        interactiveContainer.textContent = `no more spaces left!`
        handleFinish()
      }
    }
    if (scores.user >= MAX_WINS || scores.computer >= MAX_WINS) {
      resetWholeGame()
    }
  }

  const resetWholeGame = () => {
    interactiveContainer.textContent = `${MAX_WINS} wins reached! Game over!`
  }

  const increaseScore = player => {
    scores[player]++;
    updateScores()
  }

  const handleFinish = () => {
    boardContainer.removeEventListener('click', handleBoardClick)
    const button = document.createElement('button')
    button.textContent = 'new game'
    interactiveContainer.insertAdjacentElement('beforeend', button)
    button.addEventListener('click', restartGame)
  }

  const restartGame = () => {
    gameBoard.forEach((_, i) => gameBoard[i] = null);
    [...boardContainer.children].forEach(t => t.textContent = '')
    startGameFlow()
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