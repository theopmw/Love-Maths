// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                alert("You clicked Submit!");
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    runGame("addition");
})

// runGame function accepts gameType as a parameter
function runGame(gameType) {

    // Generate 2 random numbers between 1 and 25
    // Math.floor rounds down to the whole number
    // Math.random generates random numbers
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    // Check which gameType is being run with an if..else statement and call the appropriate function to display the question
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`
    }


}

function checkAnswer() {

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
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`
    }
}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    
    // Get element with ID of "operand1" and set its content to the 1st random number
    document.getElementById("operand1").textContent = operand1;
    // Get element with ID of "operand2" and set its content to the 2nd random number
    document.getElementById("operand2").textContent = operand2;
    // Get the element with the ID of operator and set that to a + sign.
    document.getElementById("operator").textContent = "+";
}

function displaySubtractionQuestion() {
    
}

function displayMultiplyQuestion() {
    
}

function displayDivisionQuestion() {

}