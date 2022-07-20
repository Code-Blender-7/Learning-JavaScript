/*
* @Author: Climax
* @Date:   2022-07-20 21:25:15
* @Last Modified by:   Climax
* @Last Modified time: 2022-07-20 23:38:03
*/

'use strict'

const countries = document.getElementById('country-name');

document.forms["form_setup"].onsubmit = function(e) {
	e.preventDefault()
	console.log(countries.value)
}

