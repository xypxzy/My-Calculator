'use strict'

/*Selectors*/

const input = document.querySelector('.display'); //input output button
const numbers = document.querySelectorAll('.number')    //number buttons
const clear = document.querySelector('.removeNumber')      //Remove
const restart = document.querySelector('.AC')           //Clear display
const operator = document.querySelectorAll('.btn-operation')   //operators
const result = document.querySelector('.equal')     // equal buttons

//
let currentString;
let lastChar;
let resultDisplayed = false;

function assignValue() {
    currentString = input.innerHTML;
    lastChar = currentString[currentString.length - 1];
}

/*Display number*/

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        assignValue();
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true &&
            lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.innerHTML = '';
            input.innerHTML += e.target.innerHTML;
        }
    })
})

/*Display operator sign*/

let newString;

operator.forEach(operator => {
    operator.addEventListener('click', (e) => {
        assignValue();
        if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
            newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length === 0) {
            alert('Enter a number first')
        } else {
            input.innerHTML += e.target.innerHTML;
        }
    })
})

/*When clicking "Equal" button*/

let inputString, nums, operators;

result.addEventListener('click', () => {
    inputString = input.innerHTML;
    nums = inputString.split(/\+|\-|\*|\//g);
    operators = inputString.replace(/[0-9]|\./g, "").split("")
    nums[nums.length - 1] = nums[nums.length - 1].slice(0, -1);

    console.log(inputString)
    console.log(operators)
    console.log(nums)


    let divide = operators.indexOf("/");
    while (divide != -1) {
        nums.splice(divide, 2, nums[divide] / nums[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("/");
    }
    let multiply = operators.indexOf("*");
    while (multiply != -1) {
        nums.splice(multiply, 2, nums[multiply] * nums[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("*");
    }

    let subtract = operators.indexOf("-");
    while (subtract != -1) {
        nums.splice(subtract, 2, nums[subtract] - nums[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    let add = operators.indexOf("+");
    while (add != -1) {
        nums.splice(add, 2, parseFloat(nums[add]) + parseFloat(nums[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = nums[0];

    resultDisplayed = true;
});

clear.addEventListener('click', () => {
    input.innerHTML = input.innerHTML.slice(0, -1);
})

restart.addEventListener('click', () => {
    input.innerHTML = '';
})
/*Toggle Switch button (day/night)*/

const switchToggle = document.querySelector('.toggle-switch');
const wrap = document.querySelector('.wrapper');
const btns = document.querySelectorAll('.btn');
const btnOperator = document.querySelectorAll('.btn-operation')
let i = 0, j = 4;
switchToggle.addEventListener('click', () => {
    i++;
    wrap.style.backgroundColor = 'rgba(14,14,31,0.85)';
    btns.forEach(btn => {
        btn.style.backgroundColor = 'rgba(45,45,98,0.85)'
    });
    input.style.color = '#3ea7da';
    btnOperator.forEach(btn => {
        btn.style.backgroundColor = '#116d9b';
        btn.style.color = '#8ec0d5'
    })
    document.querySelector('body').style.background = 'radial-gradient(circle, rgba(70,122,252,1) 16%, rgba(24,66,230,0.7567401960784313) 50%, rgba(24,66,230,0.7567401960784313) 63%, rgba(24,66,230,0.7567401960784313) 76%)';

    if (i == j) {
        defaultTheme();
        j+=4;
    }
})

function defaultTheme() {
    wrap.style.backgroundColor = '#efefef';
    btns.forEach(btn => {
        btn.style.backgroundColor = '#fff'
    });
    input.style.color = '#000';
    btnOperator.forEach(btn => {
        btn.style.backgroundColor = '#77c6e3';
        btn.style.color = '#3c6379'
    })
    document.querySelector('body').style.background = 'radial-gradient(circle, rgba(63,168,251,1) 3%, rgba(70,208,252,1) 32%, rgba(63,168,251,1) 57%)';
}