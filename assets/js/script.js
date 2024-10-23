let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const enterNameSection = document.getElementById("enterNameSection");
const rulesSection = document.getElementById("rulesSection");
const quizSection = document.getElementById("quizSection");
const submit = document.getElementById("submit");
const usernameGameDisplay = document.getElementById("usernameGameDisplay");
const usernameRulesDisplay = document.getElementById("usernameRulesDisplay");
const usernameError = document.getElementById("username-error");
const questionBody = document.getElementById("question-body");
const timer = document.getElementById("timer");

// Get references to existing HTML elements
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");

submit.addEventListener("click", getUsername);

function getUsername(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    
    if (username === "") {
        console.error("You must enter a username");
        usernameError.classList.remove("hide");
    } else {
        usernameGameDisplay.textContent = username;
        usernameRulesDisplay.textContent = `Hi, ${username}`;
        enterNameSection.classList.add("hide");
        rulesSection.classList.remove("hide");
    }
}

const start = document.getElementById("start");
start.addEventListener("click", playGame);

async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=50&category=17&difficulty=easy&type=multiple');
        const data = await response.json();
        
        questions = data.results.map(function(question) {
            var incorrectAnswers = question.incorrect_answers.map(function(answer) {
                return {
                    text: answer,
                    correct: false
                };
            });
            
            var answers = [
                { text: question.correct_answer, correct: true }
            ].concat(incorrectAnswers);
            
            answers.sort(function() {
                return Math.random() - 0.5;
            });
            
            return {
                question: question.question,
                answers: answers
            };
        });
        
        displayQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
        questionText.textContent = "Error loading questions. Please try again.";
    }
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        
        // Update question elements
        questionNumber.textContent = `Question ${currentQuestionIndex + 1}`;
        questionText.textContent = decodeHTML(currentQuestion.question);
        
        // Clear existing buttons
        answersContainer.innerHTML = '';
        
        // Create new answer buttons
        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'btn btn-dark m-2';
            button.textContent = decodeHTML(answer.text);
            button.addEventListener('click', () => checkAnswer(index));
            answersContainer.appendChild(button);
        });
    } else {
        endQuiz();
    }
}

function checkAnswer(index) {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.answers[index].correct) {
        score++;
    }
    currentQuestionIndex++;
    displayQuestion();
}

function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

function playGame() {
    rulesSection.classList.add("hide");
    quizSection.classList.remove("hide");
    currentQuestionIndex = 0;
    score = 0;
    // Clear any existing buttons
    answersContainer.innerHTML = '';
    startTimer();
    fetchQuestions();
}

let timeLeft = 60;
let timerId;

function startTimer() {
    timeLeft = 60;
    updateDisplayTime();
    timerId = setInterval(function() {
        timeLeft--;
        updateDisplayTime();
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function updateDisplayTime() {
    timer.textContent = `${timeLeft} seconds `;
    timer.appendChild(document.createElement('i')).className = "fa-regular fa-clock";
}

function endQuiz() {
    clearInterval(timerId);
    questionNumber.textContent = "Time's up!";
    questionText.textContent = `You scored ${score} out of ${questions.length}!`;
    
    // Clear answers container
    answersContainer.innerHTML = '';
    
    // Add single try again button
    const tryAgainButton = document.createElement('button');
    tryAgainButton.className = 'btn btn-dark m-2';
    tryAgainButton.textContent = 'Try again';
    tryAgainButton.addEventListener('click', playGame);
    answersContainer.appendChild(tryAgainButton);
}