const enterNameSection = document.getElementById("enterNameSection");
const rulesSection = document.getElementById("rulesSection");
const submit = document.getElementById("submit");
const usernameGameDisplay = document.getElementById("usernameGameDisplay");
const usernameRulesDisplay = document.getElementById("usernameRulesDisplay");


submit.addEventListener("click", getUsername);

function getUsername(event) {
    event.preventDefault();
    if (username === "") {
        console.error("You must enter a username");
    } else {
        username = document.getElementById("username").value;
    }
    usernameGameDisplay.textContent = username;
    usernameRulesDisplay.textContent = `Hi, ${username}`;
    enterNameSection.classList.add("hide");
    rulesSection.classList.remove("hide");
}

function playGame(){

}
