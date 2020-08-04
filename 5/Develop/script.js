// References to html elements
var currentDay = $("#currentDay");
var timeContainer = $("#time-blocks");

// List of local storage data
var localData = [];

// Displays date in the header
initializeDate();

// Colour codes the hours to indicate the current time of day
// Also enables depending on current time of day
colourCode();

// Retrieves any current data in local storage
initializeData();

function initializeDate() {
    currentDay.text("Today's date is " + moment().format("dddd, MMMM Do, YYYY"));
}

function colourCode() {
    // Retrives the current hour in 24-hr format
    var currentHour = parseInt(moment().format("H"));
    for (var i = 0; i < 8; i++) {
        // Reference to current row of interest
        var currentRow = $(timeContainer.children()[i]);
        // Logic to detect if it this hour has passed or not
        if (currentRow.attr("value") >= currentHour) {
            currentRow.css("backgroundColor", "#99FF99");
            if (currentRow.attr("value") == currentHour) {
                currentRow.css("backgroundColor", "#FF9999");
            }
            // Navigates the DOM from the current row to the text area child and enables it
            $(currentRow.children()[1]).children()[0].disabled = false;
        }
    }
}

function initializeData() {
    for (var i = 0; i < 8; i++) {
        $($(timeContainer.children()[i]).children()[1]).children()[0].value = localStorage.getItem(i + 9);
    }
}

$(".btn").on("click", function() {
    // Navigates the DOM from button to the row that the button is a part of, and retrieves the value attribute that represents the hour
    var selectedHour = $($($(this).parent()).parent()).attr("value");
    // Navigates the DOM from button to the textarea that the button shares a row with, and retrieves the value of the user's input
    localStorage.setItem(selectedHour, $($($($(this).parent()).parent()).children()[1]).children()[0].value);
});