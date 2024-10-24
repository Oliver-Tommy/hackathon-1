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
let timeLeft = 60;
let timerId;
let canAnswer = true;
let isQuizEnded = false;

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
    const apiUrl = 'https://opentdb.com/api.php?amount=50&category=17&difficulty=easy&type=multiple';
    isQuizEnded = false;

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
    if (isQuizEnded) return;

    if (currentQuestionIndex < questions.length) {
        // Reset the question body content
        questionBody.innerHTML = `
            <h3 id="question-number">Question ${currentQuestionIndex + 1}</h3>
            <p id="question-text"></p>
        `;
        
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById("question-text").innerHTML = currentQuestion.question;
        canAnswer = true;

        let optionsHtml = "";
        currentQuestion.options.forEach((option, index) => {
            optionsHtml += `
                <button class="btn border answer-btn" 
                        onclick="checkAnswer(this, '${option}')"
                        data-answer="${option}">
                    ${option}
                </button>`;
        });
        answerButtons.innerHTML = optionsHtml;
    } else {
        endQuiz();
    }
}

// Check answer
function checkAnswer(buttonElement, selectedAnswer) {
    if (!canAnswer || isQuizEnded) return;
    canAnswer = false;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        const answer = button.getAttribute('data-answer');
        if (answer === currentQuestion.correctAnswer) {
            button.classList.add('correct-answer');
        } else {
            button.classList.add('wrong-answer');
        }
    });

    if (isCorrect) {
        score++;
        updateScoreDisplay();
    }

    if (!isQuizEnded) {
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 1500);
    }
}

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
    }
}

// Timer functions
function startTimer() {
    timeLeft = 60;
    updateDisplayTime();

    if (!document.getElementById('score-display')) {
        const scoreElement = document.createElement('p');
        scoreElement.id = 'score-display';
        scoreElement.textContent = 'Score: 0 points';
        document.querySelector('.btn-window .row').appendChild(scoreElement);
    }

    if (timerId) {
        clearInterval(timerId);
    }

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplayTime();

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function updateDisplayTime() {
    timer.innerHTML = `${timeLeft}  <i class="fa-regular fa-clock"></i>`;
}

// End quiz function
function endQuiz() {
    isQuizEnded = true;
    clearInterval(timerId);
    
    questionBody.innerHTML = `
        <h3 id="question-number">Time's up!</h3>
        <p id="question-text">Your final score: ${score} points<br>
        Clone knowledge implant failure. Assign clone LNTWOS-4 to recyc.</p>
        <div class="text-center">
        <button class="btn btn-dark" id="reset-button">Try Again</button>
        <a href="form.html" class="btn btn-light">Leave Feedback</a>
        </div>
        `;
    
    answerButtons.innerHTML = '';
    
    // Add event listener to the reset button
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            resetQuiz();
        });
    }
}

// Reset quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    isQuizEnded = false;
    
    // Reset score display
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.textContent = 'Score: 0 points';
    }
    
    // Clear the question body before fetching new questions
    questionBody.innerHTML = `
        <h3 id="question-number"></h3>
        <p id="question-text"></p>
    `;
    
    // Get new questions and restart
    fetchQuestions();
}