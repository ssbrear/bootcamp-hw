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
var initials = document.querySelector("#initials");

// Boolean to keep track of current question
var currentQuestion = 0;

// Pre-determined arrays of questions and answers
var questionList = ["Which programming language runs the fastest?", "Where does javascript's console.log() function print the argument?", "Which of the following is used to compare content, but not data types?", "What is jQuery?", "If load multiple CSS files to be used for my webpage, what will happen?"];
var answersList = [["C++", "Python", "Java", "Fortran"], ["The body of the html page", "The command prompt of your operating system", "The console of the webpage", "It doesn't print the argument"], ["=", "==", "===", "===="], ["A programming language", "A library", "An operating system", "An IDE"], ["All CSS will be loaded, the first one linked will have priority", "The webpage will not load any CSS and will display an error", "The webpage will attempt to load all CSS and will display an error", "All CSS will be loaded, the last one linked will have priority"]];
var correctAnswer = [0, 2, 1, 0, 0];

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
                question.textContent = questionList[currentQuestion];
                for (i = 0; i < answersList[currentQuestion].length; i++) {
                    answer.children[i].children[0].textContent = answersList[currentQuestion][i];
                    answer.children[i].children[0].textContent
                }

            }
            else {
                // Load "All Done" page
                question.textContent = "All done!";
                answer.style.display = "none";
                subtitle.textContent = "Your score is: ";
                initials.style.display = "inline-block";
            }

        };
    }
});
