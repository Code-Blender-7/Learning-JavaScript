document.addEventListener(`keydown`, function(e) {
	const converted = `${e.key} key pressed`
	document.querySelector(`.class_h1`).textContent = converted
})