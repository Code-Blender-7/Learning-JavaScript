'use strict';


let answer = Math.trunc(Math.random() * 5) + 1;
let score = 20
console.log(answer)
// Math.random generates a random decimal number
// Decimal number must not be above 20
// Number can be changed from "not decimal" number to interger by using Math.trunc
// Number cannot be zero

document.querySelector(`.again`).addEventListener(`click` , function () {
	score = 20;
	document.querySelector(`.message`).textContent = "Game Restarted";
	document.querySelector(`.score`).textContent = 20; 
	document.querySelector(`body`).style.backgroundColor = '#222';
	document.querySelector(`.guess`).value = " ";
});


// input document
document.querySelector('.check').addEventListener('click' , function () {
// button document
	const guess = Number(document.querySelector(`.guess`).value)


// When there is no input
	if (!guess) {
		document.querySelector(`.message`).textContent = "No number input";
		if (guess === 0) {
			document.querySelector(`.message`).textContent = `Number cannot be zero`
			score--;
			document.querySelector(`.score`).textContent = score;
		}

	} if (score === 1) {
		document.querySelector(`.score`).textContent = 0;
		document.querySelector(`.message`).textContent = "You lost the game"
		document.querySelector(`body`).style.backgroundColor = '#FF0A0A'
	} else {

		if (guess == answer) {
			document.querySelector(`.message`).textContent = "Correct Number";
			document.querySelector(`body`).style.backgroundColor = '#62FF4D'
		} else if (guess > answer) {
			document.querySelector(`.message`).textContent = "Number is too high"
			score--;
			document.querySelector(`.score`).textContent = score;
			document.querySelector(`body`).style.backgroundColor = '#222'
			if (guess > 20) {
				document.querySelector(`.message`).textContent = "Value limit is 20!"
				document.querySelector(`body`).style.backgroundColor = '#222'
			}
		} else if (guess < answer){
			document.querySelector(`.message`).textContent = "Number is too low"
			document.querySelector(`body`).style.backgroundColor = '#222'
			score--;
			document.querySelector(`.score`).textContent = score;
		}		
	}
});

