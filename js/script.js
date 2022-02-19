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
  const gameoverModal = document.querySelector('.gameover-modal');
  const unguessedWord = document.querySelector('.unguessed-word');
  const gameAgainAfterGameover = document.querySelector('.gameover-modal_again-button');
  const wordThemeWrapper = document.querySelector('.word-theme');
  const theme = document.querySelector('.theme');
  // theme-buttons
  const buttonAnimals = document.getElementById('button-animals');
  const buttonBirds = document.getElementById('button-birds');
  const buttonFish = document.getElementById('button-fish');
  const buttonPlants = document.getElementById('button-plants');
  const bittonSpace = document.getElementById('button-space');
  const buttonClothes = document.getElementById('button-clothes');
  const buttonCities = document.getElementById('button-cities');
  const buttonCountries = document.getElementById('button-countries');
  const buttonSociety = document.getElementById('button-society');
  const buttonBody = document.getElementById('button-body');
  const buttonRandomTheme = document.getElementById('button-random-theme');
  const buttonRandomWord = document.getElementById('button-random-word');

  let word;
  let answerArray = [];

  const alphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж',
   'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О',
    'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц',
    'Ч', 'Ш', 'Щ', 'ъ', 'ы', 'ь', 'Э', 'Ю', 'Я'];

  let wordsArray;

  // const wordsArray = [
  //   'характер',
  //   'урок',
  //   'реальность',
  //   'колесо',
  //   'следствие',
  //   'подруга',
  //   'температура',
  //   'красота',
  //   'животное',
  //   'профессия',
  //   'момент',
  //   'впечатление',
  //   'результат',
  //   'водитель',
  //   'разговор',
  //   'создание',
  //   'ошибка',
  //   'инициатива',
  //   'мнение',
  //   'деревня',
  //   'восток',
  //   'неделя',
  //   'реакция',
  //   'поколение',
  //   'произведение',
  //   'середина',
  //   'психология',
  //   'математика',
  //   'колено',
  //   'волос'
  // ];

  const animals = [
    'медведь',
    'гепард',
    'корова',
    'крокодил',
    'лягушка',
    'кенгуру',
    'бегемот',
    'обезьяна',
    'ящерица',
    'выдра',
    'носорог',
    'тюлень',
    'черепаха',
    'леопард',
    'кошка',
    'собака',
    'хомяк',
    'лисица',
    'свинья',
    'лошадь',
    'цыплёнок',
    'кролик',
    'шиншилла',
    'крыса',
    'ягнёнок',
    'козёл',
    'муравей',
    'игуана',
    'панда',
    'ленивец',
    'коала',
    'пантера',
    'утконос',
    'косуля',
    'барсук',
    'жираф',
    'горилла',
    'бабочка',
  ];

  const birds = [
    'баклан',
    'воробей',
    'ворона',
    'гагара',
    'глухарь',
    'горлица',
    'дятел',
    'жаворонок',
    'зяблик',
    'иволга',
    'камышовка',
    'кукушка',
    'куропатка',
    'ласточка',
    'неясыть',
    'перепел',
    'сапсан',
    'синица',
    'скворец',
    'снегирь',
    'соловей',
    'стриж',
    'тетерев',
    'трясогузка',
    'филин',
    'цапля',
    'чайка',
    'щегол',
    'ястреб',
    'страус',
    'фламинго',
    'пингвин',
    'индюк',
    'попугай',
    'курица',
    'колибри',
    'беркут',
    'павлин',
    'журавль',
  ];

  const fishAndShellfish = [
    'анчоус',
    'барбус',
    'горбуша',
    'гурами',
    'данио',
    'корюшка',
    'гуппи',
    'зубатка',
    'карась',
    'минтай',
    'мурена',
    'налим',
    'осётр',
    'окунь',
    'палтус',
    'пескарь',
    'пелядь',
    'пиранья',
    'плотва',
    'путассу',
    'сайра',
    'сибасс',
    'осьминог',
    'мидия',
    'креветка',
    'кальмар',
    'каракатица',
  ];

  const space = [
    'астронавт',
    'космонавт',
    'атмосфера',
    'луноход',
    'ракета',
    'солнце',
    'планета',
    'комета',
    'астероид',
    'вакуум',
    'вселенная',
    'галактика',
    'звезда',
    'спутник',
    'космодром',
    'кратер',
    'метеорит',
    'меркурий',
    'сатурн',
    'невесомость',
    'орбита',
    'пришелец',
    'инопланетянин',
    'телескоп',
    'созвездие',
    'затмение',
    'юпитер',
    'нептун',
    'плутон',
    'метеор',
    'марсианин',
  ];

  const countries = [
    'албания',
    'армения',
    'бангладеш',
    'боливия',
    'ботсвана',
    'ватикан',
    'венгрия',
    'гондурас',
    'греция',
    'германия',
    'замбия',
    'зимбабве',
    'израиль',
    'ирландия',
    'исландия',
    'йемен',
    'камерун',
    'камбоджа',
    'кения',
    'кувейт',
    'лихтенштейн',
    'люксембург',
    'мексика',
    'монголия',
    'никарагуа',
    'нидерланды',
    'польша',
    'палестина',
    'руанда',
    'россия',
    'румыния',
    'сенегал',
    'сингапур',
    'сербия',
    'словакия',
    'словения',
    'тунис',
    'турция',
    'украина',
    'уганда',
    'уругвай',
    'фиджи',
    'филиппины',
    'франция',
    'хорватия',
    'черногория',
    'швейцария',
    'швеция',
    'эфиопия',
    'эквадор',
    'эстония',
    'ямайка',
    'япония',
  ];

  const cities = [
    'шанхай',
    'пекин',
    'мумбаи',
    'стамбул',
    'москва',
    'харьков',
    'гуанчжоу',
    'токио',
    'джакарта',
    'лондон',
    'тегеран',
    'бангкок',
    'калькутта',
    'осака',
    'париж',
    'манила',
    'богота',
    'чикаго',
    'челябинск',
    'багдад',
    'хьюстон',
    'торонто',
    'даллас',
    'сигапур',
    'барселона',
    'йоханнесбург',
    'вашингтон',
    'екатеринбург',
    'астрахань',
    'амстердам',
    'ашхабад',
    'берлин',
    'бухарест',
    'вильнюс',
    'загреб',
    'кишинёв',
    'лиссабон',
    'любляна',
    'минск',
    'найроби',
    'пхеньян',
    'рейкьявик',
    'запорожье',
    'херсон',
    'полтава',
    'житомир',
    'магнитогорск',
    'черкассы',
    'казань',
    'самара',
    'калининград',
    'мюнхен',
    'кёльн',
    'гамбург',
    'дрезден',
    'бремен',
  ];

  const humanSociety = [
    'мужчина',
    'женщина',
    'молодёжь',
    'детство',
    'ребёнок',
    'гражданин',
    'личность',
    'национальность',
    'интеллигент',
    'фамилия',
    'цивилизация',
    'индивид',
    'демократия',
    'политик',
    'президент',
    'преступник',
    'безработица',
    'банкрот',
    'религия',
    'подросток',
    'юность',
    'монархия',
    'социум',
    'государство',
    'община',
    'компания',
    'группа',
    'коммуна',
    'дружба',
    'население',
  ];

  const humanBody = [
    'подбородок',
    'голова',
    'волос',
    'спина',
    'живот',
    'мизинец',
    'предплечье',
    'сустав',
    'запястье',
    'лодыжка',
    'ступня',
    'голень',
    'бедро',
    'сердце',
    'печень',
    'зрачок',
    'селезёнка',
    'желудок',
    'ключица',
    'челюсть',
    'позвоночник',
    'скелет',
    'череп',
    'ребро',
    'копчик',
    'мышца',
    'артерия',
    'кровь',
    'палец',
    'сухожилие',
    'гипофиз',
    'трахея',
  ];

  const clothes = [
    'платье',
    'пиджак',
    'джинсы',
    'брюки',
    'штанина',
    'рукав',
    'жилет',
    'кардиган',
    'пуловер',
    'воротник',
    'манжета',
    'пуговица',
    'колготки',
    'кроссовки',
    'костюм',
    'сапог',
    'перчатка',
    'ремень',
    'футболка',
    'шапка',
    'шляпа',
    'шорты',
    'водолазка',
    'толстовка',
    'свитер',
    'сандалии',
    'ботинки',
    'мокасины',
  ];

  const plants = [
    'тополь',
    'боярышник',
    'базилик',
    'ромашка',
    'орхидея',
    'нарцисс',
    'подсолнух',
    'маргаритка',
    'можжевельник',
    'шиповник',
    'шалфей',
    'крапива',
    'ландыш',
    'фиалка',
    'полынь',
    'сосна',
    'пихта',
    'акация',
    'кактус',
    'пальма',
    'земляника',
    'мандарин',
    'апельсин',
    'незабудка',
    'пшеница',
    'рябина',
    'черника',
    'виноград',
    'ананас',
    'лиственница',
    'крыжовник',
    'одуванчик',
    'тюльпан',
    'клюква',
    'клевер',
    'яблоня',
  ];

  wordsArray = fishAndShellfish;

  startButton.addEventListener('click', () => {
    startButton.setAttribute('disabled', true);
    mistakes.classList.add('visible');
    startButton.classList.add('hidden');
    setTimeout(() => paintContainer.classList.add('background-none'), 300);

    getRandomWord();
    createWordCells();
    createAlphabet();
    getActiveLetter();
    showTheme();
  });

  gameAgainButton.addEventListener('click', () => {
    gameAgainListeners(gameAgainButton, winModal);
  });

  gameAgainAfterGameover.addEventListener('click', () => {
    gameAgainListeners(gameAgainAfterGameover, gameoverModal);
    paintContainer.classList.remove('sad-emoji');
  });

  function gameAgainListeners(btn, modal) {
    answerArray = [];
    ctx.clearRect(0, 0, 450, 700);

    btn.setAttribute('disabled', true);
    modal.classList.remove('visible');
    mistakesNumber.textContent = '0';
    mistakesNumber.classList.remove('red');
    alphabetContainer.classList.remove('hidden');
    wordThemeWrapper.classList.remove('visible');

    getRandomWord();
    removeWordCells();
    createWordCells();
    createAlphabet();
    getActiveLetter();
    showTheme();
  }

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

      guessedWord.textContent = word.toUpperCase();
      winModal.classList.add('visible');
      gameAgainButton.removeAttribute('disabled');
    }
  }

  function finishGameIfLoss() {
    const alphabetButtons = document.querySelectorAll('.alphabet-button');

    if (mistakesNumber.textContent === '10') {
      alphabetButtons.forEach((btn) => {
        btn.setAttribute('disabled', true);
      });

      alphabetContainer.classList.add('hidden');

      setTimeout(() => {
      paintContainer.classList.add('sad-emoji');
      removeAlphabet();
      }, 500);

      unguessedWord.textContent = word.toUpperCase();
      gameoverModal.classList.add('visible');
      gameAgainAfterGameover.removeAttribute('disabled');
    }
  }

  function countMistakes(actLet, btn) {
    if (answerArray.includes(actLet) === false) {
      btn.closest('div').classList.add('wrong-letter');
      btn.setAttribute('disabled', true);

      mistakesNumber.textContent = String(Number(mistakesNumber.textContent) + 1);
      mistakesNumber.classList.add('red');
    }

    drawHangedSegment(mistakesNumber.textContent);
    finishGameIfLoss();
  }

  function showTheme() {
    wordThemeWrapper.classList.add('visible');

    if (wordsArray === animals) {
      theme.innerHTML = 'животные';
    } else if (wordsArray === birds) {
      theme.innerHTML = 'птицы';
    } else if (wordsArray === fishAndShellfish) {
      theme.innerHTML = 'рыбы и моллюски';
    } else if (wordsArray === space) {
      theme.innerHTML = 'космос';
    } else if (wordsArray === countries) {
      theme.innerHTML = 'страны мира';
    } else if (wordsArray === cities) {
      theme.innerHTML = 'города мира';
    } else if (wordsArray === plants) {
      theme.innerHTML = 'растения';
    } else if (wordsArray === clothes) {
      theme.innerHTML = 'одежда';
    } else if (wordsArray === humanSociety) {
      theme.innerHTML = 'человек и общество';
    } else if (wordsArray === humanBody) {
      theme.innerHTML = 'человек (тело, анатомия)';
    }
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
