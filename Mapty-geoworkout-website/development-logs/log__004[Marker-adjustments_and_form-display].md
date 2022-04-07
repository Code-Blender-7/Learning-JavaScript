** Marker Adjustments and form display **

## Start [Marker Adjustments]


At this point, I kind of feel a bit uneasy when I am writing all these logs. It is because the HTML structures and the stylesheets are not my own designs. I wished to create a seperate log based on the structure of the HTML and the CSS but guess that ain't possible.

Right now, Let me break down how I setup the marker systems.

the marker of the Leaflet API code is here

```
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
```

Does it make sense? Well, it will soon.
I'll start with the L. The L is the namespace of the leaflet API. It means that marker is a feature of the leaflet. the argument that the has which is *mapEvent.latlng* are the coordinates of the lat and the lng. The coordinates are obtained by the moment the user clicks on the tile of the API map display. 
The *.addTo* is the instruction that the marker would be specified here. the .bindPopup and all the other code's explanation can be found on the docs of the leaflet homepage.

## Start [form display]

the form display is by default hidden in the HTMl by the *hidden* tag. The only way to access it to either remove or toggle it. But yeah, *remove* was used here.
the form is set to be visible by the moment the user clicks on the tile. the code of the marker was taken to this - 

```

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

```

the clear list is where the the inputs of the lists would be cleared. The marker code as you see is moved here. The mapEvent and map was turned into a global variable. the eventlistener also forbids default to cause the website not to reload again and again.

the chain connection of the mapEvent with the 'click' on the tile was done by this

```
map.on('click', function(mapE) {
    mapEvent = mapE
    console.log(mapEvent);
    const {lat, lng} = mapEvent.latlng;
    form.classList.remove('hidden') // toggle form
    inputDistance.focus();


```

This is where the magic happens. the form classlist gets removed and doesn't go back until refreshed. the inputDistance is focused with the cursor. the mapEvent is the value of the mapE which allows to Not let mapEvent be an unknown variable.


# additional [toggle inputType]

the inputType works between the Walking and the Cycling *i think*. the rule is simple here. This is the HTML code of the inputType code.

```
<div class="form__row">
<label class="form__label">Cadence</label>
<input
  class="form__input form__input--cadence"
  placeholder="step/min"
/>
</div>
<div class="form__row form__row--hidden">
<label class="form__label">Elev Gain</label>
<input
  class="form__input form__input--elevation"
  placeholder="meters"
/>
</div>

```
Simple, use the toggle on the classes to make one be hidden and the other one visible.

here is the code

```

inputType.addEventListener('change', function() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})

```

The closest was used to identify and work with the first on the childNode.

the rest is blah blah blah.....