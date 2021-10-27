'use strict';

/*
* @Author: Climax
* Tutorial : Jonas.io
* @Date:   2021-10-18 08:01:19
* @Last Modified by:   Climax
* @Last Modified time: 2021-10-28 01:07:21
*/


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header')
const title = document.querySelector('title')
const nav_logo = document.querySelector(".nav__logo")


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
Also remember that the logs are created everytime of a new feature section. Check em out if you're interested.

ALL SCRIPT AND WEBSITE RESOURCES OF THE STARTER FILES ARE COPYRIGHTED BY Jonas Schmedtmann


*/

///////////////////////////////////////////////////////////////////////////////////////////////////////// LECTURES



// Refresh the page from the top
window.onbeforeunload = function() {
  window.scrollTo(0,0)
}


//// Cookie message Popup

const message = document.createElement('div'); // Creating a div in the HTML [PROGRAMMED IN JS]
message.classList.add('cookie-message') // Adding a class to the div  
message.innerHTML = `<center>We use cookies for improved functionality. <br> Oh and don't mind this being here. I didn't learn <i>CSS</i> or <i>HTML</i> to get this on the top.</center><button class="btn btn--close-cookie">Okay</button>`

header.after(message)

// Message popup design 
message.style.backgroundColor = "lightgrey"
message.style.color = "black"
message.style.width = "120%"
message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 20 + "px";


document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove()
  title.textContent = "𝙱𝚊𝚗𝚔𝚒𝚜𝚝 | 𝚆𝚑𝚎𝚗 𝙱𝚊𝚗𝚔𝚒𝚗𝚐 𝚖𝚎𝚎𝚝𝚜 𝙼𝚒𝚗𝚒𝚖𝚊𝚕𝚒𝚜"
})


//// Enabling the navigation logo scroll 

nav_logo.addEventListener('click', function(e) {
  header.scrollIntoView({ behavior : "smooth" })
})

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
  tabs.forEach(t => t.classList.remove("operations__tab--active")) // remove first then add...
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

//// Sticky Navigation : Intersection Observer API


// IDEA - WHEN THE HEADER IS NOT INTERSECTING THE VIEWPORT IS WHEN WE WANT THE STICKY NAVIGATION TO WORK.


const naviHeight = nav.getBoundingClientRect().height;

const stickyNavOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${naviHeight}px`, // Intercepting before the threshold by 90 pixels
};

const stickyNavCallBack = function(entries) {
  const [entry] = entries
  if (!entry.isIntersecting) nav.classList.add("sticky") 
  else nav.classList.remove("sticky")
};

const headerObserver = new IntersectionObserver(stickyNavCallBack, stickyNavOptions);
headerObserver.observe(header)


//// Section Animation Slide reveal

const allSections = document.querySelectorAll('.section')
const revealSection = function(entries, observer) {
  const [entry] = entries
  if (entry.isIntersecting) entry.target.classList.remove("section--hidden")
  if (allSections.forEach(cl => !cl.classList.contains('section--hidden'))) observer.unobserve(entry)
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // 15% visible 
})

allSections.forEach(function(sections) {
  sectionObserver.observe(sections)
})

//// Image loading 

const imgTargets = document.querySelectorAll('img[data-src]')

const loadImage = function(entries, observer) {
  const [entry] = entries;

  entry.target.src = entry.target.dataset.src // change classlist from lazy data-src with the target's dataset src.
  
  entry.target.addEventListener('load' , function() {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
};

const imageObserver = new IntersectionObserver(loadImage, {
  root : null,
});

// apply for every image
imgTargets.forEach(image => imageObserver.observe(image))


//// Slide Component

const slider = function() {
  const slides = document.querySelectorAll('.slide')
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')


  let curSlide = 0
  const numberOfSlides = slides.length

  const slider = document.querySelector('.slider')
  // slider.style.transform = `scale(0.2) translateX(-800px)`
  // slider.style.overflow = 'visible'

  const goToNextSlide = (slide) => slides.forEach((s,i) => s.style.transform = `translateX(${100* (i- slide)}%)`)
  goToNextSlide(curSlide)


  //// Adding the dots 
  const dotContainer = document.querySelector('.dots');

  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
  };

  const createDots = function() {
    slides.forEach(function(_,i) {
      dotContainer.insertAdjacentHTML('beforeend', 
        `<button class="dots__dot" data-slide="${i}"></button`)

    })
  }
  createDots();
  
  const nextSlide = function() {
    if (curSlide === numberOfSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++
    }
    goToNextSlide(curSlide)
    activateDot(curSlide)
  };

  const prevSlide = function() {
    if (curSlide === 0) {
      curSlide = numberOfSlides - 1
    } else {
      curSlide--
    }
    goToNextSlide(curSlide)
    activateDot(curSlide)
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //// Keydown support
  document.addEventListener('keydown', function(e) {
    if (e.code === "ArrowLeft") prevSlide()
    if (e.code === "ArrowRight") nextSlide()
  })

  dotContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log("bot")
      console.log(e.target)
      const slide = e.target.dataset.slide;
      goToNextSlide(slide)
      activateDot(slide)

    }
  })
}

slider()

////////////////////////////////////////////////////////////////////
////////////// RESEARCH ONLY



////////////////////////////////////////////////////
///////

