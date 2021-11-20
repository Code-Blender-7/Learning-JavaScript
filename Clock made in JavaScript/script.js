'use strict'

const date_config = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

const real_time = setInterval(function() {
  	const now = new Date()
	document.querySelector(".class_h1").textContent = new Intl.DateTimeFormat('en-US' , date_config).format(now)}, 1000)
