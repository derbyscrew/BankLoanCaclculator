"use strict";

// Check if element is in the DOM
const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  } else {
    throw new Error(`${element} does not exist. Check again`);
  }
}

class Section {
  constructor(element, init, step, min, max) {
    this.element = element;
    this.init = init;
    this.step = step;
    this.min = min;
    this.max = max;
    this.input = element.querySelector("input");
    this.plusBtn = element.querySelector(".plus-btn");
    this.minusBtn = element.querySelector(".minus-btn");
    this.input.value = this.init;
    // Binders
    this.plusHandler = this.plusHandler.bind(this);
    this.minusHandler = this.minusHandler.bind(this);
    // Event Listeners
    this.plusBtn.addEventListener("click", this.plusHandler);
    this.minusBtn.addEventListener("click", this.minusHandler);
  }

  plusHandler() {
    this.init = this.plusInitHandler();
    this.input.value = this.init;
  } 

  minusHandler() {
    this.init = this.minusInitHandler();
    this.input.value = this.init;
  }

  plusInitHandler() {
    const res = this.init + this.step;
    if (res > this.max) {
      return this.max;
    } else {
      return res;
    }
  }

  minusInitHandler() {
    const res = this.init - this.step;
    if (res < this.min) {
      return this.min;
    } else {
      return res;
    }
  }
}

const amountSection = new Section(getElement(".amount-section"), 10000, 100, 1000, 50000);
const termSection = new Section(getElement(".term-section"), 24, 6, 12, 60);
const interestSection = new Section(getElement(".interest-section"), 5, 0.5, 1, 10);
const loanForm = getElement(".loan-form");
const monthlyResult = getElement(".month-result");
const totalResult = getElement(".total-result");
const interestResult = getElement(".interest-result");

const calculateLoan = (e) => {
  // Input Results
  const amount = amountSection.input.value;
  const years = termSection.input.value;
  const interest = interestSection.input.value;
  //  Calculate Variables
  const principal = parseFloat(amount);
  const calculateInterest = parseFloat(interest) / 100 / 12;
  const calculatedPayments = parseFloat(years) * 12;
  // Calculate Monthly Repayment
  const x = Math.pow(1 + calculateInterest, calculatedPayments);
  const monthly = (principal * x * calculateInterest) / (x - 1);
  const monthlyPayment = monthly.toFixed(2);
  // Calculate Interest
  const totalInterest = (monthly * calculatedPayments - principal).toFixed(2);
  // Calculate Total Payment
  const totalPayment = (monthly * calculatedPayments).toFixed(2);
  // Display Results
  monthlyResult.innerHTML = "£" + monthlyPayment;
  totalResult.innerHTML = "£" + totalPayment;
  interestResult.innerHTML = "£" + totalInterest;
  e.preventDefault();
}

loanForm.addEventListener("submit", calculateLoan);