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

class Workout {
	date = new Date();
	id = new Date().toString().slice(10)
	
	constructor(coords, distance, duration) {
		this.coords = coords; // [lat,lng]
		this.distance = distance; // km
		this.duration = duration; // min
	}
}

// child class of workout
class Running extends Workout {
	constructor(coords, distance, duration, cadence) {
		super(coords, distance, duration);
		this.cadance = cadence;
		this.calcPace() 
	}

	calcPace() {
		// min/km
		this.pace = this.duration / this.distance
		return this.pace
	}
}

// child class of workout
class Cycling extends Workout {
	constructor(coords, distance, duration, ElevationGain) {
		super(coords, distance, duration);
		this.ElevationGain = ElevationGain;
	}	

	calcSpeed() {
		this.speed = this.distance / (this.duration / 60); // pace => speed formula
		return this.speed
	}
}

// testings
const run1 = new Running([39,-12],5.2,24,178)
const Cycling1 = new Cycling([39,-12],5.2,24,178)
console.log(run1, Cycling1)

class App {
	#map;
	#mapEvent;

	constructor() {
		this._getPosition();
		form.addEventListener("submit", this._newWorkout.bind(this));
		inputType.addEventListener("change", this._toogleElevationField) // changes the type field
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
	};

	_toogleElevationField() {
		inputElevation.closest(".form__row").classList.toggle("form__row--hidden")
		inputCadence.closest(".form__row").classList.toggle("form__row--hidden")

		// change the form

	};

	_newWorkout(e) {
		e.preventDefault()
		const validInput = (...inputs) => inputs.every(inp => Number.isFinite(inp)) // data type validiation
		const CheckInputPositive = (...inputs) => inputs.every(inp => inp>0)
		const type = inputType.value;
		const distance = +inputDistance.value; // "+" = string
		const duration = +inputDuration.value; // "+" = string
		

		// If Workout => running; select running object

		if (type === "running") {
			const cadence = +inputCadence.value;
			if (!validInput(distance, duration, cadence) || !CheckInputPositive(distance, duration, cadence)) 
				return alert("Input has to be a positive number")
		}

		// if Workout => cycling; select cycling object
		if (type === "cycling") {
			const elevation = +inputElevation.value;
			if (!validInput(distance, duration, elevation) || !CheckInputPositive(distance, duration)) 
				return alert("Input has to be a positive number")
		}
		// clearning input fields
		inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = " "
		

		// adding a marker
		const {lat, lng} = this.#mapEvent.latlng
		L.marker([lat, lng]).addTo(this.#map)
		    .bindPopup(L.popup(PopupOptions))
		    .setPopupContent("Testing")
		    .openPopup()
	}
}

// create a new object
const app = new App();
app._getPosition();



