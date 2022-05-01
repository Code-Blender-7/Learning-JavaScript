

# START

The rendering of the workout in a nutshell is simply to add a html template to the html code when a new workout had been rendered. it is possible using the javascript in the easy way.

the template is by default commented out in the html file all this time.

Simply create a new class called renderWorkout and create a new const based on the html template.

The template of the simply running class would be 

```
        <li class="workout workout--running" data-id="1234567890">
        <h2 class="workout__title">Running on April 14</h2>
        <div class="workout__details">
            <span class="workout__icon">🏃‍♂️</span>
            <span class="workout__value">5.2</span>
            <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">24</span>
            <span class="workout__unit">min</span>
        </div>


```


For the templete of the distance and the duration would be the same. However the cadence and the elevationGain would be different. the pace and the speed would also be changed.

it is solved by the if/else statement.
```
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
```

also, the function call would have to get the workout argument of the class.

the workout.description is the information of the date and event of the workout.

the code is given here below - 


```
_setDiscription() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
}
```


this is called on both the running and the cycling class. it is called because they both are going to use this same feature and their information would be different.