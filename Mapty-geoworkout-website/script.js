'use strict';

// prettier-ignore



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
	clicks = 0

	constructor(coords, distance, duration) {
		this.coords = coords;
		this.distance = distance;
		this.duration = duration;
	}

	_setDiscription() {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
	}

	click() {
		this.clicks++;
	}

}

class Running extends Workout{
	type = "running"
	constructor(coords, distance, duration, cadence) {
		super(coords, distance, duration);
		this.cadence = cadence;
		this.calcPace()
		this._setDiscription()
		this.click()

	}

	calcPace() {
		this.pace = this.duration / this.distance // min/km
		return this.pace
	}

}

class Cycling extends Workout{
	type = "cycling"
	constructor(coords, distance, duration, elevationGain) {
		super(coords, distance, duration);
		this.elevationGain = elevationGain
		this.calcSpeed()
		this._setDiscription()
	}

	calcSpeed() {
		this.speed = this.distance / (this.duration / 60) // km/h
		return this.speed
	}

}



class App {
	//private instances
	#map
	#mapZoomLevel = 13
	#mapEvent
	#workouts = []

	constructor() {
		this._getPosition();

	form.addEventListener('submit', this._newWorkout.bind(this))


	// change the form input settings (Running/Cycling)
	inputType.addEventListener('change', this._toggleElevationField)
	containerWorkouts.addEventListener('click', this._moveToWorkoutPopup.bind(this))

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
		this.#map = L.map('map').setView(coordiates, this.#mapZoomLevel); // setView(coordinates, zoomlevel)

		// map display settings
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.#map);


		// responds on click
		this.#map.on('click', this._showForm.bind(this));

	}

	_showForm(mapE) {
		this.#mapEvent = mapE

		// clear list
		inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = ''

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

		// Render workout object
		this._hideForm()
		this._renderWorkoutMarker(workout)
		this._renderWorkout(workout)



}

	_hideForm() {
		form.classList.add('hidden')
	}

	_renderWorkoutMarker(workout) {

		// add a marker [click]
		L.marker(workout.coords)
			.addTo(this.#map)
		    .bindPopup(L.popup({ // Marker customization..
		    	maxWidth: 250,
		    	minWidth: 100,
		    	autoClose: false,
		    	closeOnClick: false,
		    	className: `${workout.type}-popup`,
		    }))
		    .setPopupContent(`${workout.type === "running" ? "🏃‍♀️" : "🚴‍♀️"} ${workout.description}`)
		    .openPopup();


	}

	_renderWorkout(workout) {

		let workout_html = `
		<li class="workout workout--${workout.type}" data-id="${workout.id}">
		<h2 class="workout__title">${workout.description}</h2>

		<div class="workout__details">
			<span class="workout__icon">${workout.type === "running" ? "🏃‍♀️" : "🚴‍♀️"}</span>
			<span class="workout__value">${workout.distance}</span>
			<span class="workout__unit">km</span>
		</div>

		<div class="workout__details">
			<span class="workout__icon">⏱</span>
			<span class="workout__value">${workout.duration}</span>
			<span class="workout__unit">min</span>
		</div>
	`;

		if (workout.type === "running") 
			workout_html += `
			<div class="workout__details">
				<span class="workout__icon">⚡️</span>
				<span class="workout__value">${workout.pace.toFixed(1)}</span>
				<span class="workout__unit">min/km</span>
			</div>
			<div class="workout__details">
				<span class="workout__icon">🦶🏼</span>
				<span class="workout__value">${workout.cadence}</span>
				<span class="workout__unit">spm</span>
			</div>
			</li>


			`
			
		if (workout.type === "cycling") {
			workout_html += `
			<div class="workout__details">
				<span class="workout__icon">⚡️</span>
				<span class="workout__value">${workout.speed.toFixed(1)}</span>
				<span class="workout__unit">min/km</span>
			</div>

			<div class="workout__details">
				<span class="workout__icon">🦶🏼</span>
				<span class="workout__value">${workout.elevationGain}</span>
				<span class="workout__unit">spm</span>
			</div>
			</li>
			`
		}
		form.insertAdjacentHTML('afterend', workout_html) // insert after the send
	}

	_moveToWorkoutPopup(e) {
		const workoutEl = e.target.closest('.workout'); 
		if (!workoutEl) return; // return empty if not clicked in the right position

		const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id)
		this.#map.setView(workout.coords, this.#mapZoomLevel, { // animate based on the coordinates of the workout
			animate : true,
			pan : {
				duration : 1,
			}
		})

		workout.click()
	}

};


// execuetion
const app = new App()
app._getPosition()
