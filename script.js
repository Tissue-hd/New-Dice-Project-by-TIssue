'use strict'

// Selecting Elements

const player0El = document.querySelector('.player0');
const player1El = document.querySelector('.player1');
const score0El = document.querySelector('.score0');
const score1El = document.querySelector('.score1');
const current0El = document.querySelector('#current0');
const current1El = document.querySelector('#current1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');

const name0 = document.querySelector('.name0');
const name1 = document.querySelector('.name1');

let scores, currentScore, activePlayer, playing;

// end of Selecting Elements

// -----------------------------------------------

// Starting Condition

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    name0.textContent = "player 1";
    name1.textContent = "player 2";

    diceEl.classList.add('hidden');
    player0El.classList.remove('player-winner');
    player1El.classList.remove('player-winner');
    player0El.classList.add('player-active');
    player1El.classList.remove('player-active');
}

init();

function switchPlayer () {
    document.querySelector(`#current${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player-active');
    player1El.classList.toggle('player-active');
}

// End of Starting Condition

// ---------------------------------------------------

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Random Dice
        const dice = Math.trunc(Math.random()*6) + 1;

        // 2. Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `img/dice-${dice}.png`;

        // 3. Check for Dice 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.querySelector(`#current${activePlayer}`).textContent = currentScore;
        }
        else {
            // Switch to next player
            switchPlayer ();
        }
    }
});

// End of Rolling dice functionality

// ---------------------------------------------------

// Hold Button

btnHold.addEventListener('click' , function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore

        document.querySelector(`.score${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 50
        if (scores [activePlayer] >= 50) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player${activePlayer}`).classList.add('player-winner');
            document.querySelector(`.player${activePlayer}`).classList.remove('player-active');
            document.querySelector(`.name${activePlayer}`).textContent = 'winner';
            
        }
        else {
            // Switch to next player
            switchPlayer();
        }
    }
})

// End of Hold Button

// ----------------------------------

// Restart Button

btnNew.addEventListener('click', init);

// End of Restart
