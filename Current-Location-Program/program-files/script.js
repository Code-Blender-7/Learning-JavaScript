'use strict'

// select the main HTML dom
const site_main_text = document.querySelector(`.content`)

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
    site_main_text.innerHTML = `
    <p>
    Could not get location due to denial of access.
    </p>`
})

