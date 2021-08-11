'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
 

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2]


// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
document.querySelector(`.balance__label`).textContent = "Current Balance. This is a sample version"
const options = {
  weekday: 'short',
  year: '2-digit',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};





// const startLogoutTimer = function() {
//   // call time every second
//   const tick = function() {

//   	const now = new Date();
// 		labelDate.textContent = new Intl.DateTimeFormat(locale , options).format(now)


//   const timer = setInterval(tick, 1000)
//   return timer;
// }



// Present date and time. 
// STRUCTURE => Month Day, year at hour:minute

const formatCurrency = function(value, locale, currency) {
  return new Intl.NumberFormat(currentAccount.locale, {
    style : 'currency',
    currency : currency,
  }).format(value)
  }

const displayMovement = function(acc, sort=false) {

  containerMovements.innerHTML =  " "
  const timeLine = sort ? acc.slice().sort((a,b) => a-b) : acc
  const locale = currentAccount.locale;

  if (sort) {
    btnSort.textContent = "🔃 SORTED"
  } else {
    btnSort.textContent = "🔽 SORT"
  }

// API EXPERIMENTS

	setInterval(function() {
		const now = new Date()
		labelDate.textContent = new Intl.DateTimeFormat(locale , options).format(now)

	}, 1000)
  


  const formatMovementDates = function(MovDates) {
      const CalcDays = (date1 , date2) => Math.round(Math.abs(date2 - date1) / (1000*60*60*24))
      let date_present = new Date()
      let date_past = new Date(currentAccount.movementsDates[MovDates])
      const days = CalcDays(date_present , date_past)

      if(days === 0) return "Just Now";
      if(days === 1) return "Yesterday";
      if(days >= 7) return new Intl.DateTimeFormat(locale).format(date_past);

  };

// movements config
  timeLine.forEach(function(mov, i) {

    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const formattedMov = formatCurrency(mov, currentAccount.locale, currentAccount.currency)

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1}. ${type}</div>
      <div class="movements__date">${formatMovementDates(i)}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
    `;

  containerMovements.insertAdjacentHTML('afterbegin' , html);
  });
}

// sorting movements 
let sorted = false;
btnSort.addEventListener('click' , function(e) {
    e.preventDefault();
    displayMovement(currentAccount.movements, !sorted)
    sorted = !sorted // FLIP IT!
})



// in, out, interest
const calcDisplaySummary = function(acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc,mov) => acc + mov , 0)

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc,mov) => acc + mov , 0)

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => deposits * acc.interestRate/100)
    // rate below 1 is not accepted
    .filter(int => int >= 1)
    // sum
    .reduce((acc,mov) => acc + mov, 0)


  labelSumIn.textContent = `${formatCurrency(income, currentAccount.locale, currentAccount.currency)}`
  labelSumOut.textContent = `${formatCurrency(out, currentAccount.locale, currentAccount.currency)}`
  labelSumInterest.textContent = `${formatCurrency(interest, currentAccount.locale, currentAccount.currency)}`
}



// show balance
const calculateTotalBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc,mov) => acc + mov, 0);

  labelBalance.textContent = `${formatCurrency(acc.balance, currentAccount.locale, currentAccount.currency)}`
}

// creating usernames
const createUsernames = function(user) {
  user.forEach(function(acc) {
    acc.username = acc.owner  
      .toLowerCase()
      .split(" ")
      .map(name =>name[0])
      .join('');
  });
};

createUsernames(accounts)

// update ui for changes
const updateUI = function(acc) {
  // Display movements
  displayMovement(acc.movements)
  // Display balance
  calculateTotalBalance(acc)
  // Display Summary
  calcDisplaySummary(acc)

}


const startLogoutTimer = function() {
  // set the time to 5 minutes
  let time = 30
  // call time every second
  const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2 , 0)
    const sec = String(time % 60).padStart(2,0)
    labelTimer.textContent = `${min}:${sec}`;


  // log remaining time to UI

  // stop timer after 0 and logout
  if (time === 0) {
    clearInterval(timer)
    labelWelcome.textContent = "Login to get started"
    containerApp.style.opacity = 0;
    }
//  decrease sec
    time--; 
  };

  const timer = setInterval(tick, 1000)
  return timer;
}


let currentAccount, timer;
// login in
btnLogin.addEventListener(`click` , function (e) {
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  // Prevent form from submitting
  // loses focus on the html titlebox
  e.preventDefault();


  if (currentAccount?.pin === +inputLoginPin.value) {
    // DIsplay UI and Welcome message

  labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(` `)[0]}`;
  containerApp.style.opacity = 100;

  // Clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';

  // lose input field focus
  inputLoginPin.blur();

  // start logout timer
  if (timer) clearInterval(timer);
    // stop if timer already running across accounts
  timer = startLogoutTimer();
  // Update the ui
  updateUI(currentAccount)

  } else {
    // display error message
    labelWelcome.textContent = "No such account found. Please Try again"
  }

})


// transfer money
btnTransfer.addEventListener(`click` , function(e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
  inputTransferTo.value = inputTransferAmount.value = ''

  
  if (
    amount > 0 && 
    // receiver must have the existing account
    receiverAcc && 
    // Must have more or equal balance to transfer
    amount <= currentAccount.balance &&
    // Not going to transfer money to self account
    receiverAcc?.username !== currentAccount.username) {

  currentAccount.movements.push(-amount);
  receiverAcc.movements.push(amount);

  currentAccount.movementsDates.push(new Date);
  receiverAcc.movementsDates.push(new Date);

  // restart timer
  clearInterval(timer)
  timer = startLogoutTimer()

  // Update the ui
  updateUI(currentAccount)
  } 


})

// Request loan
btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value); // round down
  const req = amount * 10/100

  if (amount > 0 && currentAccount.movements.some(mov => req)) {
// set delay
    setTimeout(function() {
      currentAccount.movements.push(amount)
      currentAccount.movementsDates.push(new Date());
      updateUI(currentAccount);

    } , 2500);
  } else {
    alert(`You don't have the requirements to make a loan!`)
  }
  
  
  // restart timer
  clearInterval(timer)
  timer = startLogoutTimer()


  // clear box after input
  inputLoanAmount.value = '';


})

// close Account
btnClose.addEventListener(`click` , function(e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount?.username &&
    +inputClosePin.value === +currentAccount?.pin
    ) {
    // find index of self account
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    accounts.splice(index,1)
    console.log('account closed')
    // hide ui 
    labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = 0;
  }
});


// highlight movements

let sumInHighlight = true
labelSumIn.addEventListener('click' , function() {
  [...document.querySelectorAll('.movements__value')]
.forEach(function(row , i) {
    if (parseInt(row.textContent) > 0 && sumInHighlight) row.style.backgroundColor = 'lightgreen'
    else row.style.backgroundColor = 'white'
  })
	sumInHighlight = !sumInHighlight
})


let sumOutHighlight = true
labelSumOut.addEventListener('click' , function() {
  [...document.querySelectorAll('.movements__value')]
.forEach(function(row , i) {
    if (parseInt(row.textContent) < 0 && sumOutHighlight) row.style.backgroundColor = 'red'
    else row.style.backgroundColor = 'white'
  })
sumOutHighlight = !sumOutHighlight
})


