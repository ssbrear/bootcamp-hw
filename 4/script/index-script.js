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

// Reference to body at end of quiz
var initials = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit-button")

// Counter to keep track of current question
var currentQuestion = 0;

// Pre-determined arrays of questions and answers
var questionList = ["Which programming language runs the fastest?",
                "Where does javascript's console.log() function print the argument?",
                "Which of the following is used to compare content, but not data types?",
                "What is jQuery?",
                "If load multiple CSS files to be used for my webpage, what will happen?"];
var answersList = [["C++", "Python", "Java", "Fortran"],
                ["The body of the html page", "The command prompt of your operating system", "The console of the webpage", "It doesn't print the argument"],
                ["=", "==", "===", "===="],
                ["A programming language", "A library", "An operating system", "An IDE"],
                ["All CSS will be loaded, the first one linked will have priority", "The webpage will not load any CSS and will display an error", "The webpage will attempt to load all CSS and will display an error", "All CSS will be loaded, the last one linked will have priority"]];
var correctAnswer = [0, 2, 1, 1, 3];

// Array to keep track of highscores
var highscoresArray = [];

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

    // Initializes array of highscores from local storage
    highscoresArray = JSON.parse(localStorage.getItem("highscores"));
}

// Most of the javascript is tied to the clicking of the start button
startBtn.addEventListener("click", function(){
    // Changing current content
    question.textContent = questionList[0];
    subtitle.textContent = "";
    startBtnParent.style.display = "none";
    
    // New style for current content
    question.style.fontSize = "24px";

    // Timer has started
    theTimer = setInterval(function() {
        timer.textContent = parseInt(timer.textContent) - 1;
        if (parseInt(timer.textContent) == 0) {
            window.clearInterval(theTimer);
            allDone();
        }
    }, 1000);

    // Adding new content
    for (var i = 0; i < answersList[0].length; i++) {
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

        // Functionality for picking an answer
        listButton.onclick = function() {

            // Determines whether correct or incorrect and notifies the user
            if (correctAnswer[currentQuestion] == this.value) {
                response.textContent = "Correct!";
                
            }
            else {
                response.textContent = "Wrong!";
                // Additionally reduces timer by 10s if incorrect
                timer.textContent = parseInt(timer.textContent) - 10;
            }
            
            // Resets the response
            window.setTimeout(function () {
                response.textContent = "";
            }, 1000);

            // Loads next question, if there is one
            if (currentQuestion < questionList.length - 1) {
                // Increase the index of the question
                currentQuestion++;
                // Load new content
                question.textContent = questionList[currentQuestion];
                for (var i = 0; i < answersList[currentQuestion].length; i++) {
                    answer.children[i].children[0].textContent = answersList[currentQuestion][i];
                    answer.children[i].children[0].textContent
                }

            }
            else {
                allDone();
            }

        };
    }
});

// Submits new score
submitBtn.addEventListener("click", function(event) {
    // Prevents refreshing of the page
    event.preventDefault();
    // If there is currently an array of scores, pushes a new value
    if (highscoresArray != null) {
        highscoresArray.push(initials.value + ": " + timer.textContent);
    }
    // If there are no current values stored, .push() will result in an error, so the array is instead initialized with a single value.
    else {
        highscoresArray = [initials.value + ": " + timer.textContent];
    }
    // Updates the value of the data in local storage
    localStorage.setItem("highscores", JSON.stringify(highscoresArray));
});

function allDone() {
    // Load "All Done" page
    question.textContent = "All done!";
    answer.style.display = "none";
    subtitle.textContent = "Your score is: " + timer.textContent;
    initials.style.display = "inline-block";
    submitBtn.style.display = "inline-block";
    window.clearInterval(theTimer);
}