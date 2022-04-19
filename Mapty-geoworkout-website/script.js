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

class App {
	//private instances
	#map
	#mapEvent

	constructor() {
		this._getPosition();

	form.addEventListener('submit', this._newWorkout.bind(this))

	// change the form input settings (Running/Cycling)
	inputType.addEventListener('change', this._toggleElevationField)

	}
		
	_getPosition() {

		// access the geolocation....
		navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
			alert("Could not get your positon. Be sure to activate the location access.")
		})

	}

	_loadMap(position) {
		console.log(this)
		const {latitude} = position.coords;
		const {longitude} = position.coords;
		const coordiates = [latitude, longitude]

		// the L is called the namespace
		this.#map = L.map('map').setView(coordiates, 13);

		// map display settings
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.#map);


		// responds on click
		this.#map.on('click', this._showForm.bind(this));

	}

	_showForm(mapE) {
		this.#mapEvent = mapE
		form.classList.remove('hidden') // toggle form after submit
		inputDistance.focus();
	}

	_toggleElevationField() {
		inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
		inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
	}

	_newWorkout(e) {

		e.preventDefault()
		// clear list
		inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = ''
		
		// add a marker [click]
		L.marker(this.#mapEvent.latlng)
			.addTo(this.#map)
		    .bindPopup(L.popup({ // Marker customization..
		    	maxWidth: 250,
		    	minWidth: 100,
		    	autoClose: false,
		    	closeOnClick: false,
		    	className: `cycling-popup`,
		    }))
		    .setPopupContent('Workout')
		    .openPopup();	
}};


// execuetion
const app = new App()
app._getPosition()

