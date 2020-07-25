// References to change text
var title = document.querySelector("#title");
var list = document.querySelector("#list-highscores")

// References to buttons
var clearBtn = document.querySelector("#clear-highscores");
var returnBtn = document.querySelector("#return-to-index");

init();

function init() {
    // Initializes title
    title.textContent = "Highscores";
    // Retrieves data from local storage
    var arrayOfScores = JSON.parse(localStorage.getItem("highscores"));
    // Clears the lsit
    list.innerHTML = "";
    // Only attempts to create list items if the local storage item is not null
    if (arrayOfScores != null) {
        // For each score in local storage, creates and appends a list item
        arrayOfScores.forEach(i => {
            var newItem = document.createElement("li");
            newItem.textContent = i;
            list.appendChild(newItem);
        });
    }
}

clearBtn.addEventListener("click", function() {
    // Sets localstorage to empty
    localStorage.setItem("highscores", null);
    // Clears the list
    init();
});