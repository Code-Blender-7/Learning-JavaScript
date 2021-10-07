'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header')

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// // Activate Open Account model feature 
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

// // Exit Open Account model Feature 
btnCloseModal.addEventListener('click', closeModal);

// // Exit Open Account model by touching the overlay
overlay.addEventListener('click', closeModal);

// // Exit Open Account model by hitting [Esc] key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


///////////////////////////////////////////////////////////////////////////////////////////////////////// DISCLAMER

/*

this project is all about experts adding funtionality to the project. Be sure to add keep the tabs of the DOM. Also, remember that this file is all about adding features so remember to code each features from up to down. 

ALL SCRIPT AND WEBSITE RESOURCES ARE COPYRIGHTED BY Jonas Schmedtmann

*/



///////////////////////////////////////////////////////////////////////////////////////////////////////// LECTURES

console.log(document.documentElement); // // Print the entire document.
console.log(document.head); // // Print the document head section only.
console.log(document.body); // // Print the document body section only.


console.log(document.querySelector('.header')); // return the first element that matches the element
const allSections = document.querySelectorAll('.section');
console.log(allSections)


document.getElementById('section--1')
const allButtons  = document.getElementsByTagName('button');
console.log(allButtons)

// Creating Elements 

const message = document.createElement('div'); // Creating a div in the HTML [PROGRAMMED IN JS]
message.classList.add('cookie-message') // Adding a class to the div  


message.innerHTML = 'We use cookies for improved functionality <button class="btn btn--close-cookie">Got it!</button>'
message.style.background = 'yellow'
message.color = "black"
console.log(message) 
header.prepend(message)





