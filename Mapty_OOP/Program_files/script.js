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
const PopupOptions = {
	maxWidth : 250,
	minWidth : 100,
	autoClose : false,
	closeOnClick : false,
	className : 'running-popup',
}

let map, mapEvent;

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
		function(position) {
			// destructuring
			const {latitude} = position.coords;
			const {longitude} = position.coords;
			const coords = [latitude, longitude]
			map = L.map('map').setView(coords, 13);


			// change may style 
			L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			map.on("click", function(mapE) {
				mapEvent = mapE;
				form.classList.remove('hidden') // reveal form
				inputDistance.focus()

			})
		}, 
		// else
		// if user denies location access
		function () {
			alert("ERROR! Could not get your position :(")
		} 
	);	
}


form.addEventListener("submit", function(e) {
	e.preventDefault()
	// clearning input fields
	inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = " "
	console.log(mapEvent)
	const {lat, lng} = mapEvent.latlng

	// add a marker
	L.marker([lat, lng]).addTo(map)
	    .bindPopup(L.popup(PopupOptions))
	    .setPopupContent("Testing")
	    .openPopup()
})

inputType.addEventListener("change", function() {
	inputElevation.closest(".form__row").classList.toggle("form__row--hidden")
	inputCadence.closest(".form__row").classList.toggle("form__row--hidden")
})