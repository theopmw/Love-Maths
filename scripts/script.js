// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
               checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }
    
    // Set event listener to allow enter/return to submit answers
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})

// runGame function accepts gameType as a parameter
function runGame(gameType) {

    // Set value of the answer box to an empty string each time the game is run (page is loaded)
    document.getElementById("answer-box").value = "";

    // Set the focus so the cursor is in the answer box every time the game is run (page is loaded)
    document.getElementById("answer-box").focus();

    // Generate 2 random numbers between 1 and 25
    // Math.floor rounds down to the whole number
    // Math.random generates random numbers
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    // Check which gameType is being run with an if..else statement and call the appropriate function to display the question
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractionQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`
    }
}

function checkAnswer() {

    // Checks the answer (retrieved from the user inputed answer-box in the DOM) against the first element in the returned calculateCorrectAnswer array 
    let userAnswer = parseInt(document.getElementById("answer-box").value); // Retrieves answer from the DOM
    let calculatedAnswer = calculateCorrectAnswer(); // Gets correct answer from the calculateCorrectAnswer function
    let isCorrect = userAnswer === calculatedAnswer[0]; // Sets an isCorrect variable which will be true or false depending on whether the user's answer matches the correct answer

    // Let the user know if they got the answer right, or if wrong answer was given, provide them with the correct answer
    if (isCorrect) {
        alert("Congratulations! You got it right!");
        incrementScore();
    } else {
        alert(`Awwww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    // Runs another game of the same type using the second element from the calculatedAnswer array
    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {

    // Get the operands (the numbers) and the operator (+, -, etc.) directly from the 
    // The parseInt function is used to make sure the value is trated as an integer (by default when JS gets data from the DOM it returns it as a string)
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    // Calculate the correct answer based on the game type and the game type is being determined by the operator
    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "÷") {
        return [operand1 / operand2, "division"]; // operand1 * operand2) / operand1
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`
    }
}

function incrementScore() {

        // Gets current score from the DOM and increments it by 1
        let oldScore = parseInt(document.getElementById("score").innerText); // Retrieves value from DOM and puts it in the oldScore variable
        document.getElementById("score").innerText = ++oldScore; // Write it back to the DOM (note: innerText and textContent are interchangable) (note: ++oldScore === oldScore + 1)
}

function incrementWrongAnswer() {

    // Gets current tally of incorrect answers from the DOM and increments it by 1
    let oldScore = parseInt(document.getElementById("incorrect").innerText); // Retrieves value from DOM and puts it in the oldScore variable
    document.getElementById("incorrect").innerText = ++oldScore; // Write it back to the DOM (note: innerText and textContent are interchangable) (note: ++oldScore === oldScore + 1)
}

function displayAdditionQuestion(operand1, operand2) {
    
    // Get element with ID of "operand1" and set its content to the 1st random number
    document.getElementById("operand1").textContent = operand1;
    // Get element with ID of "operand2" and set its content to the 2nd random number
    document.getElementById("operand2").textContent = operand2;
    // Get the element with the ID of operator and set that to a + sign.
    document.getElementById("operator").textContent = "+";
}

function displaySubtractionQuestion(operand1, operand2) {

    // Get element with ID of "operand1" and and use a ternary operator to check whether operand1 > operand2 and display operand1 if it is larger (condition ? true(if) part : false(else) part)
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    // Get element with ID of "operand1" and and use a ternary operator to check whether operand1 > operand2 and display operand2 if it is larger (condition ? true(if) part : false(else) part)
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    // Get the element with the ID of operator and set that to a - sign.
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {

    // Get element with ID of "operand1" and set its content to the 1st random number
    document.getElementById("operand1").textContent = operand1;
    // Get element with ID of "operand2" and set its content to the 2nd random number
    document.getElementById("operand2").textContent = operand2;
    // Get the element with the ID of operator and set that to a x sign.
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    
    // Get element with ID of "operand1" and and use a ternary operator to check whether operand1 > operand2 and display operand1 if it is larger (condition ? true(if) part : false(else) part)
    document.getElementById("operand1").textContent = operand1 * operand2
    // Get element with ID of "operand1" and and use a ternary operator to check whether operand1 > operand2 and display operand2 if it is larger (condition ? true(if) part : false(else) part)
    document.getElementById("operand2").textContent = operand1
    // Get the element with the ID of operator and set that to a ÷ sign.
    document.getElementById("operator").textContent = "÷";
}