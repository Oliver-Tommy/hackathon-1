const enterNameSection = document.getElementById("enterNameSection");
const rulesSection = document.getElementById("rulesSection");
const submit = document.getElementById("submit");
const usernameGameDisplay = document.getElementById("usernameGameDisplay");
const usernameRulesDisplay = document.getElementById("usernameRulesDisplay");
const usernameError = document.getElementById("username-error");


submit.addEventListener("click", getUsername);

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

function playGame() {

}