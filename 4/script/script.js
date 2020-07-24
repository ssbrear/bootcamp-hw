// Reference to headers
var viewHighscores = document.querySelector("#view-highscores");
var timer = document.querySelector("#timer");
var timerLabel = document.querySelector("#timer-label");

// Reference to the body
var question = document.querySelector("#question");
var subtitle = document.querySelector("#subtitle");
var answer = document.querySelector("#answers");
var response = document.querySelector("#response");
var startBtnParent = document.querySelector("#start-button-parent");
var startBtn = document.querySelector("#start-button");

// Boolean to keep track of current question
var currentQuestion = 0;

// Pre-determined arrays of questions and answers
var questionList = ["My Q0", "My Q1", "My Q2", "My Q3", "My Q4"];
var answersList = [["Q0A0", "Q0A1", "Q0A2", "Q0A3"], ["Q1A0", "Q1A1", "Q1A2", "Q1A3"], ["Q2A0", "Q2A1", "Q2A2", "Q2A3"], ["Q3A0", "Q3A1", "Q3A2", "Q3A3"], ["Q4A0", "Q4A1", "Q4A2", "Q4A3"]];
var correctAnswer = [0, 0, 0, 0, 0];

init();

// Function that initializes text to keep the html document small
function init() {
    // Header content
    viewHighscores.textContent = "View Highscores";
    timer.textContent = "75";
    timerLabel.textContent = "Timer: ";

    // Main content
    question.textContent = "Code Quiz"
    subtitle.textContent = "Try answering the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds!";
}

startBtn.addEventListener("click", function(){
    // Changing current content
    question.textContent = questionList[0];
    subtitle.textContent = "";
    startBtnParent.style.display = "none";
    
    // New style for current content
    question.style.fontSize = "24px";

    // Adding new content
    for (i = 0; i < answersList[0].length; i++) {
        // Creation of list item
        var listItem = document.createElement("li");

        // Creation of button
        var listButton = document.createElement("button");
        listButton.textContent = answersList[0][i];
        listButton.value = i;

        // Styling of button
        listButton.classList.add("btn");
        listButton.classList.add("btn-success");
        listButton.style.marginTop = "8px";

        // Append new content to html
        listItem.appendChild(listButton);
        answer.appendChild(listItem);

        listButton.onclick = function() {

            // Determines whether correct or incorrect
            if (correctAnswer[currentQuestion] == this.value) {
                // Display "Correct!"
                response.textContent = "Correct!";
            }
            else {
                // Reduce timer by 10 seconds and display "Wrong!"
                response.textContent = "Wrong!";
            }

            // Loads next question, if there is one
            if (currentQuestion < questionList.length - 1) {
                // Increase the index of the question
                currentQuestion++;
                // Load new content
            }
            else {
                // Load "All Done" page
                question.textContent = "All done!";
                answer.style.display = "none";
            }

        };
    }
});
