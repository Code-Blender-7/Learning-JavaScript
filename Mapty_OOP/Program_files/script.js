'use strict';


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// HTML data selection.
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
		function(position) {
			// destructuring
			const {latitude} = position.coords;
			const {longitude} = position.coords;
			console.log(position.coords)
			console.log(latitude, longitude)
			console.log(`https://www.google.com/maps/@${latitude},${longitude},14z`)
		}, 
		// else
		// if user denies location access
		function () {
			alert("ERROR! Could not get your position :(")
		} 
	);	
}

