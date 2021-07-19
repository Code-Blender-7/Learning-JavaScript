'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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



const displayMovement = function(movements, sort=false) {
  containerMovements.innerHTML =  " "

  const timeLine = sort ? movements.slice().sort((a,b) => a-b) : movements
  
  if (sort) {
    btnSort.textContent = "SORTED"
  } else {
    btnSort.textContent = "↓ SORT"
  }


  timeLine.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1}. ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}$</div>
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
    .filter(int => int >= 1)
    .reduce((acc,mov) => acc + mov, 0)


  labelSumIn.textContent = `${income}$`
  labelSumOut.textContent = `${Math.abs(out)}$`
  labelSumInterest.textContent = `${interest}$`
}



// show balance
const calculateTotalBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc,mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance}$`
}



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

const updateUI = function(acc) {
  // Display movements
  displayMovement(acc.movements)

  // Display balance
  calculateTotalBalance(acc)

  // Display Summary
  calcDisplaySummary(acc)

}


let currentAccount;

// Event Handlers 
btnLogin.addEventListener(`click` , function (e) {
  // Prevent form from submitting
  // use this to override HTML default behavior
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  e.preventDefault(); 

// Optional chaining
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // DIsplay UI and Welcome message

  labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(` `)[0]}`;
  containerApp.style.opacity = 100;

  // Clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';

  // lose input field focus
  inputLoginPin.blur();

  // Update the ui
  updateUI(currentAccount)

  } else {
    // display error message
    labelWelcome.textContent = "No such account found. Please Try again"
  }
})

btnTransfer.addEventListener(`click` , function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
  inputTransferTo.value = inputTransferAmount.value = ''

  console.log(amount, receiverAcc)
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

  // Update the ui
  updateUI(currentAccount)
  } 


})

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  const req = amount * 10/100

  if (
    amount > 0 &&
    currentAccount.movements.some(mov => req)
    ) {
    currentAccount.movements.push(amount)
    updateUI(currentAccount);
  }
})



btnClose.addEventListener(`click` , function(e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount?.username &&
    Number(inputClosePin.value) === Number(currentAccount?.pin) 
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




