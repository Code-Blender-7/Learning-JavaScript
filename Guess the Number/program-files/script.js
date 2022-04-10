'use strict';


let answer = Math.trunc(Math.random() * 20) + 1;
let score = 20
let highscore = 0

// Math.random generates a random decimal number
// Decimal number must not be above 20
// Number can be changed from "not decimal" number to interger by using Math.trunc
// Number cannot be zero

const displayMessage = function (message) {
	document.querySelector(`.message`).textContent = message
}

const losePoints = function () {
	score--;
	document.querySelector(`.score`).textContent = score;
}

document.querySelector(`.again`).addEventListener(`click` , function () {
	score = 20;
	displayMessage("Game Restarted")
	document.querySelector(`.score`).textContent = 20; 
	document.querySelector(`body`).style.backgroundColor = '#222';
	document.querySelector(`.guess`).value = "";
	answer = Math.trunc(Math.random() * 20) + 1;


});


// input document
document.querySelector('.check').addEventListener('click' , function () {
// button document
	const guess = Number(document.querySelector(`.guess`).value)
	document.querySelector(`body`).style.backgroundColor = '#222';


// When there is no input
	if (!guess) {
		displayMessage("No number input")

	} else {
		if (guess == answer) {
			displayMessage("Correct Answer!  Secret number changed")
			document.querySelector(`body`).style.backgroundColor = '#62FF4D'
			answer = Math.trunc(Math.random() * 20) + 1;
			if (score > highscore) {
				highscore = score
				document.querySelector(`.highscore`).textContent = highscore
			}
		} else if (score === 1) {
			document.querySelector(`.score`).textContent = 0;
			displayMessage("You lost the game")
			document.querySelector(`body`).style.backgroundColor = '#FF0A0A'
		} else if (guess > answer) {
			displayMessage("Number is too high!")
			losePoints();

			if (guess > 20) {
				displayMessage("Number limit is 20!")
			}
		} else if (guess < answer){
			displayMessage("Number is too low!")
			losePoints();
		}
	}
});
