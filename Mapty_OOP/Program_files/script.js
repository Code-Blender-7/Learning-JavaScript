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
			const coords = [latitude, longitude]


			const map = L.map('map').setView(coords, 13);

			// change may style 
			L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			// add a marker
			L.marker(coords).addTo(map)
			    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
			    .openPopup();

		}, 
		// else
		// if user denies location access
		function () {
			alert("ERROR! Could not get your position :(")
		} 
	);	
}


