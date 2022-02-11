document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.start-game-button');
  const paintContainer = document.querySelector('.hangman-paint-container');
  const mistakes = document.querySelector('.mistakes');
  const mistakesNumber = document.querySelector('.mistakes-number');
  const answerWordContainer = document.querySelector('.answer-word');
  const alphabetContainer = document.querySelector('.alphabet');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const winModal = document.querySelector('.win-modal');
  const guessedWord = document.querySelector('.guessed-word');
  const gameAgainButton = document.querySelector('.game-again-button');

  let word;
  let answerArray = [];

  const alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж',
   'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О',
    'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц',
    'Ч', 'Ш', 'Щ', 'ъ', 'ы', 'ь', 'Э', 'Ю', 'Я'];

  const wordsArray = [
    'характер',
    'урок',
    'реальность',
    'колесо',
    'следствие',
    'подруга',
    'температура',
    'красота',
    'животное',
    'профессия',
    'момент',
    'впечатление',
    'результат',
    'водитель',
    'разговор',
    'создание',
    'ошибка',
    'инициатива',
    'мнение',
    'деревня',
    'восток',
    'неделя',
    'реакция',
    'поколение',
    'произведение',
    'середина',
    'психология',
    'математика',
    'колено',
    'волос'
  ];

  startButton.addEventListener('click', () => {
    startButton.setAttribute('disabled', true);
    mistakes.classList.add('visible');
    startButton.classList.add('hidden');
    setTimeout(() => paintContainer.classList.add('background-none'), 300);

    getRandomWord();
    createWordCells();
    createAlphabet();
    getActiveLetter();
  });

  gameAgainButton.addEventListener('click', () => {
    answerArray = [];
    ctx.clearRect(0, 0, 450, 700);

    gameAgainButton.setAttribute('disabled', true);
    winModal.classList.remove('visible');
    mistakesNumber.textContent = '0';
    mistakesNumber.classList.remove('red');
    alphabetContainer.classList.remove('hidden');

    getRandomWord();
    removeWordCells();
    createWordCells();
    createAlphabet();
    getActiveLetter();
  });

  function getRandomWord() {
    word = wordsArray[Math.floor(Math.random() * wordsArray.length)];

    for (let i = 0; i < word.length; i++) {
      answerArray[i] = '_';
    }

    console.log(word);
  }

  function createWordCells() {
    for (let i = 0; i < word.length; i++) {
      const letterCell = document.createElement('div');
      letterCell.classList.add('letter-cell');
      answerWordContainer.appendChild(letterCell);

      setTimeout(() => letterCell.style.opacity = 1);
    }
  }

  function createAlphabet() {
    alphabet.forEach((letter) => {
      const alphabetElement = document.createElement('div');
      alphabetElement.classList.add('alphabet-element');

      const alphabetButton = document.createElement('button');
      alphabetButton.classList.add('alphabet-button');
      alphabetButton.innerHTML = letter;

      alphabetElement.appendChild(alphabetButton);
      alphabetContainer.appendChild(alphabetElement);

      setTimeout(() => alphabetElement.style.opacity = 1);
    });
  }

  function removeAlphabet() {
    const alphabet = document.querySelectorAll('.alphabet-element');

    alphabet.forEach((letter) => {
      letter.remove();
    });
  }

  function removeWordCells() {
    const wordCells = document.querySelectorAll('.letter-cell');

    wordCells.forEach((cell) => {
      cell.remove();
    });
  }

  function getActiveLetter() {
    const alphabetButton = document.querySelectorAll('.alphabet-button');

      alphabetButton.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const activeBtn = event.target;
        const activeLetter = activeBtn.textContent.toLowerCase();

        insertLetterToField(activeLetter, btn);

        countMistakes(activeLetter, btn);
      });
    });
  }

  function insertLetterToField(actLet, btn) {
    const cells = document.querySelectorAll('.letter-cell');

    const wordArray = word.split('');

    for (let i = 0; i < wordArray.length; i++) {
      if (actLet === wordArray[i]) {
        answerArray[i] = actLet;
        cells[i].textContent = actLet;
        btn.closest('div').classList.add('right-letter');
        btn.setAttribute('disabled', true);
      }
    }

    finishGameIfWin();
  }

  function finishGameIfWin() {
    const alphabetButtons = document.querySelectorAll('.alphabet-button');

    const answer = answerArray.join('');
    console.log(answer)

    if (word === answer) {
      alphabetButtons.forEach((btn) => {
        btn.setAttribute('disabled', true);
      });

      alphabetContainer.classList.add('hidden');

      setTimeout(() => {
        removeAlphabet();
      }, 500);

      guessedWord.textContent = word;
      winModal.classList.add('visible');
      gameAgainButton.removeAttribute('disabled');
    }
  }

  function countMistakes(actLet, btn) {
    if (answerArray.includes(actLet) === false) {
      btn.closest('div').classList.add('wrong-letter');
      btn.setAttribute('disabled', true);

      mistakesNumber.textContent = String(Number(mistakesNumber.textContent) + 1);
      mistakesNumber.classList.add('red');
    }

    const alphabetButtons = document.querySelectorAll('.alphabet-button');

    if (mistakesNumber.textContent === '10') {
      alphabetButtons.forEach((btn) => {
        btn.setAttribute('disabled', true);
      });

      setTimeout(() => paintContainer.classList.add('sad-emoji'), 500);
    }

    drawHangedSegment(mistakesNumber.textContent);
  }

  function drawHangedSegment(mistakes) {
    ctx.fillStyle = '#fff';

    if (mistakes === '1') {
      let position = 172;
      setInterval(() => {
        ctx.fillRect(position, 657, 3, 3);
        position = position - 3;
        if (position <= 50) {
          position = 50;
        }
      }, 5);

    } else if (mistakes === '2') {
      let position = 657;
      setInterval(() => {
        ctx.fillRect(111, position, 3, 3);
        position = position - 3;
        if (position <= 40) {
          position = 40;
        }
      }, 1);

    } else if (mistakes === '3') {
      let position = 111;
      setInterval(() => {
        ctx.fillRect(position, 40 , 3, 3);
        position = position + 3;
        if (position >= 333) {
          position = 333;
        }
      }, 5);

    } else if (mistakes === '4') {
      let position = 40;
      setInterval(() => {
        ctx.fillRect(333, position, 3, 3);
        position = position + 3;
        if (position >= 90) {
          position = 90;
        }
      }, 5);

    } else if (mistakes === '5') {
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#fff';
      ctx.arc(333, 155, 63, 0, Math.PI * 2, false);
      ctx.stroke();

    } else if (mistakes === '6') {
      let position = 218;
      setInterval(() => {
        ctx.fillRect(333, position, 3, 3);
        position = position + 3;
        if (position >= 380) {
          position = 380;
        }
      }, 5);

    } else if (mistakes === '7') {
      let positionX = 333;
      let positionY = 218;
      setInterval(() => {
        ctx.fillRect(positionX, positionY, 3, 3);
        positionX = positionX - 3;
        positionY = positionY + 3;
        if (positionX <= 258) {
          positionX = 258;
        }
        if (positionY >= 292) {
          positionY = 292;
        }
      }, 5);

    } else if (mistakes === '8') {
      let positionX = 333;
      let positionY = 218;
      setInterval(() => {
        ctx.fillRect(positionX, positionY, 3, 3);
        positionX = positionX + 3;
        positionY = positionY + 3;
        if (positionX >= 408) {
          positionX = 408;
        }
        if (positionY >= 292) {
          positionY = 292;
        }
      }, 5);

    } else if (mistakes === '9') {
      let positionX = 333;
      let positionY = 380;
      setInterval(() => {
        ctx.fillRect(positionX, positionY, 3, 3);
        positionX = positionX - 3;
        positionY = positionY + 3;
        if (positionX <= 258) {
          positionX = 258;
        }
        if (positionY >= 454) {
          positionY = 454;
        }
      }, 5);

    } else if (mistakes === '10') {
      let positionX = 333;
      let positionY = 380;
      setInterval(() => {
        ctx.fillRect(positionX, positionY, 3, 3);
        positionX = positionX + 3;
        positionY = positionY + 3;
        if (positionX >= 408) {
          positionX = 408;
        }
        if (positionY >= 454) {
          positionY = 454;
        }
      }, 5);
    }
  }
});
