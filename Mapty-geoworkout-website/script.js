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




class Workout {
	date = new Date()
	id = (Date.now() + "").slice(-10) // random ID generated based on date.

	constructor(coords, distance, duration) {
		this.coords = coords;
		this.distance = distance;
		this.duration = duration;
	}
}

class Running extends Workout{
	constructor(coords, distance, duration, cadence) {
		super(coords, distance, duration);
		this.cadence = cadence;
		this.calcPace()

	}

	calcPace() {
		this.pace = this.duration / this.distance // min/km
		return this.pace
	}

}

class Cycling extends Workout{
	constructor(coords, distance, duration, elevationGain) {
		super(coords, distance, duration);
		this.elevationGain = elevationGain
		this.calcSpeed()
	}

	calcSpeed() {
		this.speed = this.distance / (this.duration / 60) // km/h
		return this.speed
	}

}



class App {
	//private instances
	#map
	#mapEvent
	#workouts = []

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

		// get data
		// '+' sign is used to convert to integers.
		const type = inputType.value; 
		const distance = +inputDistance.value;
		const duration = +inputDuration.value;
		const {lat,lng} = this.#mapEvent.latlng
		
		// check data ?valid
		const validInput = (...inputs) => inputs.every(inp => Number.isFinite(inp))
		const isPositive = (...inputs) => inputs.every(inp => inp>0)
		let workout;

		// if activity == Running, create from Running Class
		if (type==='running') {
			const cadence = +inputCadence.value;
			if (!validInput(distance,duration,cadence) || !isPositive(distance, duration, cadence)) 
				return alert("Invalid Data")

			workout = new Running([lat,lng], distance, duration, cadence);
		};

		// if activity == Cycling, create from Cycling Class
		if (type==="cycling") {
			const elevation = +inputElevation.value
			if (!validInput(distance,duration,elevation) || !isPositive(distance, duration)) 
				return alert("Invalid Data Parameters") 

			workout = new Cycling([lat,lng], distance, duration, elevation);
		};


		// clear list

		inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = ''

		

		// add object to workout
		this.#workouts.push(workout)
		console.log(workout)

		// Render workout object
		form.classList.add('hidden')
		this.renderWorkoutMarker(workout)


}
	renderWorkoutMarker(workout) {

		// add a marker [click]
		L.marker(workout)
			.addTo(this.#map)
		    .bindPopup(L.popup({ // Marker customization..
		    	maxWidth: 250,
		    	minWidth: 100,
		    	autoClose: false,
		    	closeOnClick: false,
		    	className: `${type}-popup`,
		    }))
		    .setPopupContent(workout.distance)
		    .openPopup();


	}

};





// execuetion
const app = new App()
app._getPosition()

