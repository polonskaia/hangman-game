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
  const chooseThemeModal = document.querySelector('.choose-theme-modal');
  const buttonAnimals = document.getElementById('button-animals');
  const buttonBirds = document.getElementById('button-birds');
  const buttonFish = document.getElementById('button-fish');
  const buttonPlants = document.getElementById('button-plants');
  const buttonSpace = document.getElementById('button-space');
  const buttonClothes = document.getElementById('button-clothes');
  const buttonCities = document.getElementById('button-cities');
  const buttonCountries = document.getElementById('button-countries');
  const buttonSociety = document.getElementById('button-society');
  const buttonBody = document.getElementById('button-body');
  const buttonRandomTheme = document.getElementById('button-random-theme');
  const buttonRandomWord = document.getElementById('button-random-word');
  const chooseNewThemeAfterWin = document.getElementById('new-theme-after-win');
  const chooseNewThemeAfterGameover = document.getElementById('new-theme-after-gameover');

  let word;
  let answerArray = [];

  const alphabet = ['А', 'Б', 'В', 'Г', 'Ґ' ,'Д', 'Е', 'Є', 'Ж',
   'З', 'И', 'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О',
    'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц',
    'Ч', 'Ш', 'Щ', 'ь', 'Ю', 'Я', '\''];

  let wordsArray;

  const animals = [
    'ведмідь',
    'гепард',
    'корова',
    'крокодил',
    'жаба',
    'кенгуру',
    'бегемот',
    'мавпа',
    'ящірка',
    'видра',
    'носоріг',
    'тюлень',
    'черепаха',
    'леопард',
    'кішка',
    'собака',
    'хом\'як',
    'лисиця',
    'свиня',
    'кінь',
    'заяць',
    'шиншила',
    'щур',
    'кіт',
    'ягня',
    'козел',
    'мураха',
    'ігуана',
    'панда',
    'лінивець',
    'коала',
    'пантера',
    'качкодзьоб',
    'козуля',
    'барсук',
    'жираф',
    'горила',
    'метелик',
  ];

  const birds = [
    'курча',
    'горобець',
    'ворона',
    'гагара',
    'горлиця',
    'дятел',
    'жайворонок',
    'зяблик',
    'вивільга',
    'зозуля',
    'куріпка',
    'ластівка',
    'перепілка',
    'сапсан',
    'синиця',
    'шпак',
    'снігур',
    'соловей',
    'серпокрилець',
    'тетерів',
    'пугач',
    'чапля',
    'чайка',
    'щиголь',
    'яструб',
    'страус',
    'фламінго',
    'пінгвін',
    'індик',
    'папуга',
    'курка',
    'колібрі',
    'павич',
    'журавель',
  ];

  const fishAndShellfish = [
    'анчоус',
    'гурамі',
    'корюшка',
    'гупі',
    'зубатка',
    'карась',
    'товстолоб',
    'осетер',
    'вугор',
    'окунь',
    'палтус',
    'камбала',
    'щука',
    'піранья',
    'путасу',
    'лаврак',
    'восьминіг',
    'мідія',
    'креветка',
    'кальмар',
    'каракатиця',
  ];

  const space = [
    'астронавт',
    'космонавт',
    'атмосфера',
    'місяцехід',
    'ракета',
    'сонце',
    'планета',
    'комета',
    'астероїд',
    'всесвіт',
    'галактика',
    'зірка',
    'супутник',
    'космодром',
    'кратер',
    'метеорит',
    'меркурій',
    'сатурн',
    'невагомість',
    'орбіта',
    'прибулець',
    'телескоп',
    'сузір\'я',
    'затемнення',
    'юпітер',
    'нептун',
    'плутон',
    'метеор',
    'марсіанин',
  ];

  const countries = [
    'албанія',
    'вірменія',
    'бангладеш',
    'болівія',
    'ботсвана',
    'ватикан',
    'угорщина',
    'гондурас',
    'греція',
    'німеччина',
    'замбія',
    'зімбабве',
    'ізраїль',
    'ірландія',
    'ісландія',
    'ємен',
    'камерун',
    'камбоджа',
    'кенія',
    'кувейт',
    'ліхтенштейн',
    'люксембург',
    'мексика',
    'монголія',
    'нікарагуа',
    'нідерланди',
    'польща',
    'палестина',
    'руанда',
    'румунія',
    'сенігал',
    'сінгапур',
    'сербія',
    'словаччина',
    'словенія',
    'туніс',
    'туреччина',
    'україна',
    'уганда',
    'уругвай',
    'фіджі',
    'філіппіни',
    'франція',
    'хорватія',
    'чорногорія',
    'швейцарія',
    'швеція',
    'ефіопія',
    'еквадор',
    'естонія',
    'ямайка',
    'японія',
  ];

  const cities = [
    'шанхай',
    'пекін',
    'мумбаї',
    'стамбул',
    'харків',
    'гуанчжоу',
    'токіо',
    'джакарта',
    'лондон',
    'тегеран',
    'бангкок',
    'калькутта',
    'осака',
    'париж',
    'маніла',
    'чикаґо',
    'багдад',
    'х\'юстон',
    'торонто',
    'даллас',
    'сінгапур',
    'барселона',
    'йоганнесбурґ',
    'вашингтон',
    'амстердам',
    'берлін',
    'бухарест',
    'вільнюс',
    'загреб',
    'кишинів',
    'лісабон',
    'любляна',
    'пхеньян',
    'рейк\'явік',
    'запоріжжя',
    'херсон',
    'полтава',
    'житомир',
    'черкаси',
    'мюнхен',
    'кельн',
    'гамбурґ',
    'дрезден',
    'бремен',
    'детройт',
    'орландо',
    'сакраменто',
    'квебек',
    'ванкувер',
    'оттава',
    'київ',
    'галіфакс',
  ];

  const humanSociety = [
    'чоловік',
    'жінка',
    'молодь',
    'дитинство',
    'дитина',
    'громадянин',
    'національність',
    'прізвище',
    'цивілізація',
    'індивід',
    'демократія',
    'політик',
    'президент',
    'злочинець',
    'безробіття',
    'релігія',
    'працівник',
    'підліток',
    'юність',
    'монархія',
    'соціум',
    'Держава',
    'громада',
    'компанія',
    'група',
    'комуна',
    'дружба',
    'населення',
  ];

  const humanBody = [
    'підборіддя',
    'голова',
    'волосся',
    'спина',
    'живіт',
    'передпліччя',
    'суглоб',
    'зап\'ястя',
    'ступня',
    'гомілка',
    'стегно',
    'серце',
    'печінка',
    'зіниця',
    'селезінка',
    'шлунок',
    'ключиця',
    'щелепа',
    'хребет',
    'скелет',
    'череп',
    'ребро',
    'м\'яз',
    'артерія',
    'кров',
    'палець',
    'сухожилля',
    'трахея',
  ];

  const clothes = [
    'сукня',
    'піджак',
    'джинси',
    'штани',
    'жилет',
    'кардиган',
    'комір',
    'гудзик',
    'колготи',
    'кросівки',
    'костюм',
    'чобіт',
    'рукавичка',
    'ремінь',
    'футболка',
    'шапка',
    'капелюх',
    'шорти',
    'водолазка',
    'толстовка',
    'светр',
    'сандалі',
    'черевики',
    'мокасини',
  ];

  const plants = [
    'тополя',
    'базилік',
    'ромашка',
    'орхідея',
    'нарцис',
    'соняшник',
    'ялівець',
    'шипшина',
    'шавлія',
    'кропива',
    'фіалка',
    'полин',
    'сосна',
    'ялина',
    'акація',
    'кактус',
    'пальма',
    'суниця',
    'пшениця',
    'горобина',
    'чорниця',
    'виноград',
    'агрус',
    'кульбаба',
    'тюльпан',
    'журавлина',
    'конюшина',
    'яблуня',
  ];

  const allThemesArray = [animals, birds, fishAndShellfish, space, countries, cities, humanSociety, humanBody, clothes, plants];

  const randomTheme = allThemesArray[Math.floor(Math.random() * allThemesArray.length)];

  const allWordsArray = animals.concat(birds, fishAndShellfish, space, countries, cities, humanSociety, humanBody, clothes, plants);

  startButton.addEventListener('click', () => {
    startButton.setAttribute('disabled', true);
    startButton.classList.add('hidden');
    chooseThemeModal.classList.add('visible');
  });

  gameAgainButton.addEventListener('click', () => {
    gameAgainListeners(gameAgainButton, winModal);
    addListenersToStartTheGame();
  });

  gameAgainAfterGameover.addEventListener('click', () => {
    gameAgainListeners(gameAgainAfterGameover, gameoverModal);
    addListenersToStartTheGame();
    paintContainer.classList.remove('sad-emoji');
  });

  chooseNewThemeAfterWin.addEventListener('click', () => {
    gameAgainListeners(gameAgainButton, winModal);
    setTimeout(() => {
      chooseThemeModal.classList.add('visible');
    }, 300);
  });

  chooseNewThemeAfterGameover.addEventListener('click', () => {
    gameAgainListeners(gameAgainAfterGameover, gameoverModal);
    paintContainer.classList.remove('sad-emoji');
    setTimeout(() => {
      chooseThemeModal.classList.add('visible');
    }, 300);
  })

  buttonAnimals.addEventListener('click', () => {
    wordsArray = animals;
    addListenersToStartTheGame();
  });

  buttonBirds.addEventListener('click', () => {
    wordsArray = birds;
    addListenersToStartTheGame();
  });

  buttonFish.addEventListener('click', () => {
    wordsArray = fishAndShellfish;
    addListenersToStartTheGame();
  });

  buttonPlants.addEventListener('click', () => {
    wordsArray = plants;
    addListenersToStartTheGame();
  });

  buttonSpace.addEventListener('click', () => {
    wordsArray = space;
    addListenersToStartTheGame();
  });

  buttonClothes.addEventListener('click', () => {
    wordsArray = clothes;
    addListenersToStartTheGame();
  });

  buttonCities.addEventListener('click', () => {
    wordsArray = cities;
    addListenersToStartTheGame();
  });

  buttonCountries.addEventListener('click', () => {
    wordsArray = countries;
    addListenersToStartTheGame();
  });

  buttonBody.addEventListener('click', () => {
    wordsArray = humanBody;
    addListenersToStartTheGame();
  });

  buttonSociety.addEventListener('click', () => {
    wordsArray = humanSociety;
    addListenersToStartTheGame();
  });

  buttonRandomTheme.addEventListener('click', () => {
    wordsArray = randomTheme;
    addListenersToStartTheGame();
  });

  buttonRandomWord.addEventListener('click', () => {
    wordsArray = allWordsArray;
    addListenersToStartTheGame();
  });

  function gameAgainListeners(btn, modal) {
    btn.setAttribute('disabled', true);
    answerArray = [];
    ctx.clearRect(0, 0, 450, 700);
    modal.classList.remove('visible');
    mistakesNumber.textContent = '0';
    mistakesNumber.classList.remove('red');
    alphabetContainer.classList.remove('hidden');
    wordThemeWrapper.classList.remove('visible');
    removeWordCells();
  }

  function getRandomWord() {
    word = wordsArray[Math.floor(Math.random() * wordsArray.length)];

    for (let i = 0; i < word.length; i++) {
      answerArray[i] = '_';
    }

    console.log(word);
  }

  function addListenersToStartTheGame() {
    chooseThemeModal.classList.remove('visible');
    mistakes.classList.add('visible');
    setTimeout(() => paintContainer.classList.add('background-none'), 300);

    getRandomWord();
    createWordCells();
    createAlphabet();
    getActiveLetter();
    showTheme();
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
      theme.innerHTML = 'тваринний світ';
    } else if (wordsArray === birds) {
      theme.innerHTML = 'птахи';
    } else if (wordsArray === fishAndShellfish) {
      theme.innerHTML = 'риби та молюски';
    } else if (wordsArray === space) {
      theme.innerHTML = 'космос';
    } else if (wordsArray === countries) {
      theme.innerHTML = 'країни світу';
    } else if (wordsArray === cities) {
      theme.innerHTML = 'міста світу';
    } else if (wordsArray === plants) {
      theme.innerHTML = 'рослини';
    } else if (wordsArray === clothes) {
      theme.innerHTML = 'одяг та взуття';
    } else if (wordsArray === humanSociety) {
      theme.innerHTML = 'людина і суспільство';
    } else if (wordsArray === humanBody) {
      theme.innerHTML = 'людське тіло та анатомія';
    } else if (wordsArray === allWordsArray) {
      theme.innerHTML = 'немає (випадкове слово)';
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
      }, 5);

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
