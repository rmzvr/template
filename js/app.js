import { dictionary } from './dictionary.js'

let attempt = 0
const attemptLimit = 6
const field = document.querySelector('.field')
const resetBtn = document.querySelector('.reset-btn')
const checkBtn = document.querySelector('.check-btn')

const rows = document.querySelectorAll('.row')
const cells = document.querySelectorAll('.cell')

let randomWord = getRandomWord()

let matrix = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]

enableRow(attempt)

field.addEventListener('keyup', function (e) {
  const element = e.target
  const rowIndex = e.target.parentNode.dataset.row
  const cellIndex = e.target.dataset.cell

  pushLetterToMatrix(element.value, rowIndex, cellIndex)
})

resetBtn.addEventListener('click', resetValues)

checkBtn.addEventListener('click', function () {
  const row = attempt
  const userWord = matrix[row].join('')
  const randomWordSplited = randomWord.split('')
  attempt++

  if (!isWordFound(userWord)) {
    alert('Word isn`t found')
  }

  randomWordSplited.forEach((letter, index) => {
    if (letter === userWord[index]) {
      setBackgroundOfCell(row, index, 'green')
    }

    if (
      letter !== userWord[index] &&
      isLetterIncludes(userWord[index], randomWord)
    ) {
      setBackgroundOfCell(row, index, 'yellow')
    }

    if (!isLetterIncludes(userWord[index], randomWord)) {
      setBackgroundOfCell(row, index, 'gray')
    }
  })

  if (isWordsSame(userWord, randomWord)) {
    alert('Congratulations! You won.')
  }

  if (attempt === attemptLimit && !isWordsSame(userWord, randomWord)) {
    alert('Game over.')
  }

  disableRow(attempt - 1)
  enableRow(attempt)
})

function getRandomWord() {
  return dictionary[Math.floor(Math.random() * dictionary.length)]
}

function pushLetterToMatrix(letter, row, cell) {
  matrix[row][cell] = letter
}

function isWordsSame(word1, word2) {
  return word1.localeCompare(word2, 'uk', { sensitivity: 'base' }) === 0
}

function isLetterIncludes(letter, word) {
  return word.toLowerCase().includes(letter.toLowerCase())
}

function setBackgroundOfCell(row, cell, color) {
  const rowEl = document.querySelector(`.row[data-row="${row}"]`)
  const cellEl = rowEl.querySelector(`.cell[data-cell="${cell}"]`)

  cellEl.style.backgroundColor = color
}

function resetValues() {
  attempt = 0
  randomWord = getRandomWord()
  matrix = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]

  cells.forEach((cell) => {
    cell.value = ''
    cell.disabled = true
    cell.style.backgroundColor = 'white'
  })

  enableRow(attempt)
}

function isWordFound(word) {
  return dictionary.find((item) => item === word)
}

function enableRow(index) {
  Array.from(rows[index].children).forEach((cell) => {
    cell.disabled = false
  })
}

function disableRow(index) {
  Array.from(rows[index].children).forEach((cell) => {
    cell.disabled = true
  })
}
