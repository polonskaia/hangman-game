document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.start-game-button');
  const paintContainer = document.querySelector('.hangman-paint-container');
  const mistakes = document.querySelector('.mistakes');
  const mistakesNumber = document.querySelector('.mistakes-number');
  const answerWordContainer = document.querySelector('.answer-word');
  const alphabetContainer = document.querySelector('.alphabet');

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

  const word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  console.log(word)

  let answerArray = [];
  for (let i = 0; i < word.length; i++) {
    answerArray[i] = '_';
  }

  startButton.addEventListener('click', () => {
    paintContainer.classList.add('background-none');
    mistakes.classList.add('visible');
    startButton.classList.add('hidden');
    createWordCells();
    createAlphabet();
    getActiveLetter();
  });

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
      }
    }

    const alphabetButtons = document.querySelectorAll('.alphabet-button');

    const answer = answerArray.join('');
    console.log(answer)

    if (word === answer) {
      alphabetButtons.forEach((btn) => {
        btn.setAttribute('disabled', 'disabled');
      });
    }
  }

  function countMistakes(actLet, btn) {
    if (answerArray.includes(actLet) === false) {
      btn.closest('div').classList.add('wrong-letter');

      mistakesNumber.textContent = String(Number(mistakesNumber.textContent) + 1);
      mistakesNumber.classList.add('red');
    }

    const alphabetButtons = document.querySelectorAll('.alphabet-button');

    if (mistakesNumber.textContent === '10') {
      alphabetButtons.forEach((btn) => {
        btn.setAttribute('disabled', 'disabled');
      });
    }
  }
});
