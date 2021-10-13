'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header')
const title = document.querySelector('title')

document.documentElement.style.setProperty('--color-primary', 'violet')
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


//// //// Cookie message Popup

const message = document.createElement('div'); // Creating a div in the HTML [PROGRAMMED IN JS]
message.classList.add('cookie-message') // Adding a class to the div  

message.innerHTML = `<center>We use cookies for improved functionality <br> And We serve no desert </center><button class="btn btn--close-cookie">Got it!</button>`


header.before(message) // before the header


document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove()
  title.textContent = "𝙱𝚊𝚗𝚔𝚒𝚜𝚝 | 𝚆𝚑𝚎𝚗 𝙱𝚊𝚗𝚔𝚒𝚗𝚐 𝚖𝚎𝚎𝚝𝚜 𝙼𝚒𝚗𝚒𝚖𝚊𝚕𝚒𝚜"
})


// Styles

message.style.backgroundColor = "#37383d"
message.style.width = "120%"
message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 20 + "px";




//// Smooth Button Scrolling Animation

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', function(e) {
  section1.scrollIntoView({behavior: 'smooth'})
})


////////////////////////////////////////////////////////////////////
////////////// RESEARCH ONLY

const h1 = document.querySelector('h1') // Specific element

const alertH1 = function(e) {
  alert('addEventListener: It works')

  h1.removeEventListener('mouseenter', alertH1)
}


h1.addEventListener('mouseenter', alertH1)


setTimeout(() => message.innerHTML = `<center>We use cookies for improved functionality <br> And We serve no desert </center><button class="btn btn--close-cookie">NANI!</button>` , 6000)
