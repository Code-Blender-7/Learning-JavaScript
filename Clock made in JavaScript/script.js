'use strict'


// time format configuration
const date_config = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};


// select the main HTML dom
const site_main_text = document.querySelector(`.class_h1`)

// change the variable every 1 second.
const real_time = setInterval(function() {
    const now = new Date()
    site_main_text.textContent = new Intl.DateTimeFormat('en-US' , date_config).format(now)
    }, 1000)


