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

class App {
	#map;
	#mapEvent;

	constructor() {
		this._getPosition();
		form.addEventListener("submit", this._newWorkout.bind(this));
	}

	_getPosition() {
		if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function () {
				alert("ERROR! Could not get your position")}
		)};	
	}



	_loadMap(position) {
		// destructuring
		const {latitude} = position.coords;
		const {longitude} = position.coords;
		const coords = [latitude, longitude]
		this.#map = L.map('map').setView(coords, 13);


		// change may style 
		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.#map);

		this.#map.on("click", this._showForm.bind(this))
	};



	_showForm(mapE) {
		this.#mapEvent = mapE;
		form.classList.remove('hidden') // reveal form
		inputDistance.focus()
	}

	_toogleElevationField() {
		// change the form

	};

	_newWorkout(e) {
		e.preventDefault()

			// clearning input fields
			inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = " "
			const {lat, lng} = this.#mapEvent.latlng
			// add a marker
			L.marker([lat, lng]).addTo(this.#map)
			    .bindPopup(L.popup(PopupOptions))
			    .setPopupContent("Testing")
			    .openPopup()
		}

		// inputType.addEventListener("change", function() {
		// 	inputElevation.closest(".form__row").classList.toggle("form__row--hidden")
		// 	inputCadence.closest(".form__row").classList.toggle("form__row--hidden")
		// })

}

// create a new object
const app = new App();
app._getPosition();



