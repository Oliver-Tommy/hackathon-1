// Select necessary elements
const enterNameSection = document.getElementById("enterNameSection");
const rulesSection = document.getElementById("rulesSection");
const quizSection = document.getElementById("quizSection");
const submit = document.getElementById("submit");
const start = document.getElementById("start");
const usernameGameDisplay = document.getElementById("usernameGameDisplay");
const usernameRulesDisplay = document.getElementById("usernameRulesDisplay");
const usernameError = document.getElementById("username-error");
const questionBody = document.getElementById("question-body");
const timer = document.getElementById("timer");
const answerButtons = document.getElementById("answer-buttons");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerId;

// Handle username submission
submit.addEventListener("click", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;

    if (username === "") {
        usernameError.classList.remove("hide");
    } else {
        usernameGameDisplay.textContent = username;
        usernameRulesDisplay.textContent = `Hi, ${username}`;
        enterNameSection.classList.add("hide");
        rulesSection.classList.remove("hide");
    }
});

// Start game button
start.addEventListener("click", () => {
    rulesSection.classList.add("hide");
    quizSection.classList.remove("hide");
    fetchQuestions();
});

// Fetch questions from Open Trivia DB
function fetchQuestions() {
    const apiUrl = 'https://opentdb.com/api.php?amount=5&category=9&type=multiple';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            questions = data.results.map((questionData) => {
                const formattedQuestion = {
                    question: questionData.question,
                    options: [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5),
                    correctAnswer: questionData.correct_answer
                };
                return formattedQuestion;
            });

            startTimer();
            displayQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));
}

// Display the current question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1}`;
        document.getElementById("question-text").innerHTML = currentQuestion.question;  // use innerHTML to decode HTML entities

        // Display answer options
        let optionsHtml = "";
        currentQuestion.options.forEach((option, index) => {
            optionsHtml += `<button class="btn border" onclick="checkAnswer('${option}')">${option}</button>`;
        });
        answerButtons.innerHTML = optionsHtml;
    } else {
        endQuiz();
    }
}

// Check answer
function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    displayQuestion();
}

// Timer functions
function startTimer() {
    timeLeft = 30;  // Set quiz time
    updateDisplayTime();

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplayTime();

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function updateDisplayTime() {
    timer.textContent = `${timeLeft} seconds`;
}

// End quiz function
function endQuiz() {
    clearInterval(timerId);
    questionBody.innerHTML = `<h3 id="question-number">Time's up!</h3>
                              <p id="question-text">Your score: ${score} / ${questions.length}</p>
                              <button class="btn" onclick="resetQuiz()">Try Again</button>`;
}

// Reset quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    playGame();
}
