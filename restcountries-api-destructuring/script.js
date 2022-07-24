/*
* @Author: Climax
* @Date:   2022-07-20 21:25:15
* @Last Modified by:   Climax
* @Last Modified time: 2022-07-24 23:30:26
*/

'use strict'

const countries = document.getElementById('country_name');
const answer = document.querySelector('.output_field')



function getDataFromCountries (country) {

	if (answer.querySelector('.country')) {
		answer.removeChild(answer.querySelector('.country'))
	}
	const request = new XMLHttpRequest();
	request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
	request.send();

	request.addEventListener('load', function() {
		const [data] = JSON.parse(this.responseText);
		const html = `
	        <article class="country">
	          <img src="${data.flags.png}" />
	          <div">
	            <p>Country's name: ${data.name.common}</p>
	            <p>Country's region: ${data.region}</p>
	            <p><span>Population 👫: </span>${(+data.population / 1000000).toFixed(1)} million</p> 
	            <p><span>Language🗣️: </span>${Object.entries(data.languages)[0][0]}</p>
	            <p><span>Currency💰: </span>${Object.entries(data.currencies)[0][1].name}</p>
	          </div>
	        </article>
		`;

		answer.insertAdjacentHTML('beforeend', html)



	});

	return false;
}


// document.forms["form_setup"].onsubmit = function() {
// 	getDataFromCountries(countries.value);	
// } 
