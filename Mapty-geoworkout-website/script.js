'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


let map, mapEvent;

// access the geolocation....

navigator.geolocation.getCurrentPosition(function(position) {
	console.log(position)
	const {latitude} = position.coords;
	const {longitude} = position.coords;
	const coordiates = [latitude, longitude]

	// the L is called the namespace
	map = L.map('map').setView(coordiates, 13);


	// map display settings
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);


	// responds on click
	map.on('click', function(mapE) {
		mapEvent = mapE
		console.log(mapEvent);
		const {lat, lng} = mapEvent.latlng;
		form.classList.remove('hidden') // toggle form
		inputDistance.focus();




	})

	// if !location access
}, function() {
	alert("Could not get your positon. Be sure to activate the location access.")
})

form.addEventListener('submit', function(e) {
	e.preventDefault()
	// clear list
	inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = ''
	// add a marker [click]
	L.marker(mapEvent.latlng)
		.addTo(map)
	    .bindPopup(L.popup({ // Marker customization..
	    	maxWidth: 250,
	    	minWidth: 100,
	    	autoClose: false,
	    	closeOnClick: false,
	    	className: `cycling-popup`,
	    }))
	    .setPopupContent('Workout')
	    .openPopup();	
})


inputType.addEventListener('change', function() {
	inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
	inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})