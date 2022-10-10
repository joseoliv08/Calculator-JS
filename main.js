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

    }

    // Add number to the screen, pass the selected number
    appendNumber(number) {

    }

    // Choose a particular operation
    chooseOperation(operation) {

    }

    // Will take all the numbers and operations and display them in a single value
    compute() {

    }

    // update the values in the output
    updateDisplay() {

    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')