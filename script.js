'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Elements for rules section
const btnClose = document.querySelector('.btn--close');
const backdrop = document.querySelector('.backdrop');
const rulesSection = document.querySelector('.rules');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Functions
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const btnFinished = function (btn) {
  btn.classList.add('btn--finished');
  setTimeout(() => {
    btn.classList.remove('btn--finished');
  }, 500);
};

const closeRules = function () {
  rulesSection.classList.add('hidden');
  backdrop.classList.add('hidden');
};

let scores, currentScore, activePlayer, isPlaying;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  isPlaying = true;
};

// Rules section
btnClose.addEventListener('click', function () {
  closeRules();
});

backdrop.addEventListener('click', function () {
  closeRules();
});

init();

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check if landed on 1
    if (dice !== 1) {
      // Add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  } else {
    btnFinished(btnRoll);
  }
});

// Holding current score
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Add current score to the global score
    scores[activePlayer] += currentScore;
    // 2. Display the global score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // Player reaches 100 and wins
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  } else {
    btnFinished(btnHold);
  }
});

// New game functionality
btnNew.addEventListener('click', function () {
  // Reinitialize all the values
  init();
});
