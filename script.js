'use strict';
//Selecting the players element
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');

//Selecting the score Elements
const score1 = document.getElementById('score-0');
const score2 = document.getElementById('score-1');
const diceEl = document.querySelector('.dice');

//Selecting the current score elements
const currentSc0 = document.getElementById('current-0');
const currentSc1 = document.getElementById('current-1');

//Selecting button elements
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');

//Declaring a variables without any values
let scores, currentSc, activePlayer, playing;

//Starting Conditions
//Creating init function
const init = function () {
  //Storing the score of both players in an array, starts at 0 points for both
  scores = [0, 0];

  //Variable to hold the current score of the current round
  currentSc = 0; //The score will keep updating
  activePlayer = 0; //Holds the active player

  //Creating a condition. All the buttons only work when the player is playing the game
  playing = true;

  //Setting initial conditions of score to 0
  score1.textContent = 0;
  score2.textContent = 0;

  //Hiding the dice image
  //Creating the hidden class to the style and adding it to the dice class.
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
//Creating a function for switching player
const switchPlayer = function () {
  //Selecting the current player and setting the text content back to 0
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  //Switching from 0 to 1 or 1 to 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Setting the current score back to 0
  currentSc = 0;

  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
};

//Functionality: Rolling Dice
btnRoll.addEventListener('click', function () {
  //The below code will be executed only if the player is playing the game
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Displaying the dice image with random dice number
    diceEl.classList.remove('hidden');
    //Manipulating src attribute from JS
    diceEl.src = `dice-${dice}.png`;

    //Checking if the rolled dice is 1: If then switching the player
    //If not then adding the dice to the current score
    if (dice !== 1) {
      currentSc += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentSc;
    } else {
      //Switching to the next player
      switchPlayer();
    }
  }
});

//Functionality: button hold scores
btnHold.addEventListener('click', function () {
  if (playing) {
    //Adding current score to active player's score
    scores[activePlayer] += currentSc;
    //Selecting the element based on the active player
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    //Checking if player's score is >=100. If then finish the game
    if (scores[activePlayer] >= 100) {
      //Checking if the player is playing or not
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
    } else {
      //If not switch the player
      switchPlayer();
    }
  }
});

//Functionality: New game button
btnNew.addEventListener('click', init);
