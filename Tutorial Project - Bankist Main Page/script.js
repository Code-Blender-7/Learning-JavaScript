'use strict';

/*
* @Author: Climax
* Tutorial : Jonas.io
* @Date:   2021-10-18 08:01:19
* @Last Modified by:   Climax
* @Last Modified time: 2021-10-20 22:23:57
*/


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header')
const title = document.querySelector('title')


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
message.innerHTML = `<center>We use cookies for improved functionality <br> And We serve no desert. </center><button class="btn btn--close-cookie">Press this to enable sticky nav!</button>`

header.before(message)

// Message popup design 
message.style.backgroundColor = "#37383d"
message.style.width = "120%"
message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 20 + "px";




//// Smooth Button Scrolling Animation - 'Learn More 🔽'

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', function(e) {
  section1.scrollIntoView({behavior: 'smooth'})
})



document.querySelector(".nav__links").addEventListener('click', function(e) {
  e.preventDefault()
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior : "smooth"});
  }}
)



//// Enabling the Tabbed Component - 

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabscontent = document.querySelectorAll(".operations__content");
 

// active tab
tabsContainer.addEventListener("click" , function(e) {
  const clicked = e.target.closest(".operations__tab")
  tabs.forEach(t => t.classList.remove("operations__tab--active"))
  clicked.classList.add('operations__tab--active')

  // activate content area -  
  tabscontent.forEach(c => c.classList.remove("operations__content--active"))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")
})


//// Navigation bar - toggle button fade in, fate out while hover

const nav = document.querySelector(".nav")

const change_opacity = function(e, opacity, color) {

    if (e.target.classList.contains("nav__link")) {
    const link_nav = e.target
    const siblings = link_nav.closest(".nav").querySelectorAll(".nav__link") // Close to the parentNode
    const logo = link_nav.closest(".nav").querySelector("img")

    link_nav.style.color = color
    siblings.forEach(el => {
      if (el !== link_nav) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}

nav.addEventListener("mouseover", e => {change_opacity(e, 0.5, "green")})
nav.addEventListener("mouseout", e => {change_opacity(e, 1.0, "black")})



////////////////////////////////////////////////////////////////////
////////////// RESEARCH ONLY


//// Sticky Navigation

console.log(window.scrollX) // the current view of the website

const sec1InitialCoords = section1.getBoundingClientRect()
console.log(sec1InitialCoords)


// add something to pop trigger
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove()
  title.textContent = "𝙱𝚊𝚗𝚔𝚒𝚜𝚝 | 𝚆𝚑𝚎𝚗 𝙱𝚊𝚗𝚔𝚒𝚗𝚐 𝚖𝚎𝚎𝚝𝚜 𝙼𝚒𝚗𝚒𝚖𝚊𝚕𝚒𝚜"

  window.addEventListener("scroll", function() {

  if (window.scrollY > sec1InitialCoords.top) {
    nav.classList.add("sticky") 
  } else {
    nav.classList.remove("sticky")
  }
});


})

////////////////////////////////////////////////////
///////

