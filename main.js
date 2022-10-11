// This class will store and display the previous and current text. Function that creates and initializes an object instance of a class
// The purpose of a constructor is to create a new object and set values for any existing object properties.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // Clear all the output
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // Delete the previous number
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) // chops the last digit
    }

    // Add number to the screen, pass the selected number
    appendNumber(number) {
        // if we type a '.' key and already have a '.' on the output we want to return, to not let us add more
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // Choose a particular operation
    chooseOperation(operation) {
        // if the current operand is empty we cant add up any operation
        if (this.currentOperand === '') return
        // if the previous operand has 55 and a '+' sign, adding a new value (55) an then an operator (*) will appear in the previous '110 *'
        // will compute the adding operation, display the result and the new operator to the right 
        if (this.previousOperand !== '') {
            this.compute()
        }  
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // Will take all the numbers and operations and display them in a single value
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) // converting this string to a number
        const current = parseFloat(this.currentOperand) // converting this string to a number
        // if we dont have a previous number and operand as also not have a number on the current, cant run 'equals'
        if (isNaN(prev) || isNaN(current)) return 
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:   // this is kind of an else in switch cases where if we dont have any kind of operations we cant proceed
                return 
        }
        this.currentOperand = computation // current operand will be the result of our computation
        this.operation = undefined
        this.previousOperand = ''
    }

    // Function to display coma's when the number is to big
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // this will grab our string and split it into an array, numbers before the '.' 
        const decimalDigits = stringNumber.split('.')[1] // this will grab the second part of the array, after the '.'
        let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('pt', {maximumFractionDigits: 0}) // if its a number return in a Portuguese format (with dots -> 1.323.543)
        }
        // if has decimal digits means that was entered first a '.'
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }  
    }

    // update the values in the output each time a button is clicked
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        // if the display as an operation, then in the previous operand append the operation symbol on going
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


// Now that we have a constructor we can create a new object and use the variables above
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// For each button created we are going to add an event on click that will append the number in the button text to that button
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// For each button created we are going to add an event on click that will append the operation in the button text to that button
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})