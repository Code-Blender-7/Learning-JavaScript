'use strict';

// selecting player's total score
const total_score_0 = document.querySelector(`#score--0`);
const total_score_1 = document.querySelector(`#score--1`);
// selecting player's current dice score
const current_score_0 = document.querySelector(`#current--0`);
const current_score_1 = document.querySelector(`#current--1`);
// Selecting the dice
const diceEL = document.querySelector(`.dice`)
// Dice is hidden by default
diceEL.classList.add(`hidden`)
// Selecting the ui buttons
const btn_new = document.querySelector(`.btn--new`);
const btn_roll = document.querySelector(`.btn--roll`);
const btn_hold = document.querySelector(`.btn--hold`);
// Selecting Player side
const Player0 = document.querySelector(`.player--0`)
const Player1 = document.querySelector(`.player--1`)

let activePlayer, PlayerScore, currentScore, playing

const intialization = function () {
	PlayerScore = [0,0]
	activePlayer = 0;
	currentScore = 0;
	playing = true;

	// start value from 0
	total_score_0.textContent = 0
	total_score_1.textContent = 0
	current_score_0.textContent = 0
	current_score_1.textContent = 0

	playing = true

	// CSS reset
	Player0.classList.remove('player--winner');
	Player1.classList.remove(`player--winner`)
	Player1.classList.remove('player--active');
	Player0.classList.add(`player--active`)
}


intialization();


const switchPlayer = function () {
	currentScore = 0
	Player0.classList.toggle('player--active')
	Player1.classList.toggle('player--active')
	document.getElementById(`current--${activePlayer}`).textContent = currentScore;
	activePlayer = activePlayer === 0 ? 1 : 0;

// use the toggle when if the condition exists, toggle removes it. If not, then
// toggle does the opposite.
};


btn_roll.addEventListener(`click` , function() {
	if(playing) {
		let dice = Math.trunc(Math.random() * 6) + 1;
		// show dice
		diceEL.classList.remove(`hidden`)
		diceEL.src = `images/dice-${dice}.png`

		if (dice === 1) {
			switchPlayer()

		} else {
			currentScore += dice
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;
		}	
	}
});

btn_hold.addEventListener(`click` , function() {
	if (playing) {
		PlayerScore[activePlayer] += currentScore
		document.getElementById(`score--${activePlayer}`).textContent = PlayerScore[activePlayer]

		if (PlayerScore[activePlayer] >= 20) {
	      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
	      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
	      playing = false
		} else {
			switchPlayer()
		}	
	}
})


btn_new.addEventListener(`click`, function() {
	intialization()
	alert('Game restarted!')
});