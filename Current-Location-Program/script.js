'use strict'

// select the main HTML dom
const site_main_text = document.querySelector(`.class_h1`)

// API
navigator.geolocation.getCurrentPosition(function(position) {
  const {latitude} = position.coords;
  const {longitude} = position.coords;

  site_main_text.textContent = ` `;
  site_main_text.innerHTML = `<p>Location coordinates:
  </br>
  Latitude: ${latitude} ,
  
  Longitude: ${longitude}.
  <br>
  Find location on <a href="https:www.google.pt/maps/@${latitude}, ${longitude}" target="_blank">Google Map</a>`


  console.log(position)
}, function() {
  alert("Couldn't get location due to restrictions")
})

