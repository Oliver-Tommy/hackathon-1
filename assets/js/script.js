const questions = [

]

const enterNameSection = document.getElementById("enterNameSection");
const rulesSection = document.getElementById("rulesSection");
const quizSection = document.getElementById("quizSection");
const submit = document.getElementById("submit");
const usernameGameDisplay = document.getElementById("usernameGameDisplay");
const usernameRulesDisplay = document.getElementById("usernameRulesDisplay");
const usernameError = document.getElementById("username-error");
const questionBody = document.getElementById("question-body");

const timer = document.getElementById("timer"); // Selects timer paragraph


submit.addEventListener("click", getUsername);

/**
 * Function to handle the username submission
 */
function getUsername(event) {
    // Prevent any default actions occuring when submit button pressed
    event.preventDefault();
    
    // Setting username variable to the text input value
    const username = document.getElementById("username").value;

    // Preventing username from being empty
    if (username === "") {
        console.error("You must enter a username");
        usernameError.classList.remove("hide");
    } else {
        // Display the username in the games and rules sections
        usernameGameDisplay.textContent = username;
        usernameRulesDisplay.textContent = `Hi, ${username}`;
        // Hide the enter name section and show the rules section
        enterNameSection.classList.add("hide");
        rulesSection.classList.remove("hide");
    }
}

const start = document.getElementById("start"); 
start.addEventListener("click", playGame);

/**
 * Function to start the quiz
 */
function playGame() {
    // Show quiz section hide rules section
    rulesSection.classList.add("hide");
    quizSection.classList.remove("hide");

    // start timer
    startTimer();

    // set current question index

    // set score

    // call function to display questions

}

let timeLeft = 5; //how many seconds for the quiz
let timerId; //variable to change

/**
 * Function to start the timer
 */
function startTimer() {
    timeLeft = 5;
    updateDisplayTime();

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplayTime();

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

/**
 * Function to display time in HTML
 */
function updateDisplayTime() {
    timer.textContent = `${timeLeft} seconds `;
}

/**
 * Function to stop the timer and to show end screen, with reset button to start game again.
 */
function endQuiz() {
    clearInterval(timerId);
    questionBody.innerHTML = `<h3 id="question-number">Your time is up!</h3>
                    <p id="question-text">You managed to score SCORE!!</p>
                    <button class="btn" onclick=playGame()>Try again</button>`
}