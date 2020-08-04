var currentDay = $("#currentDay");
var timeContainer = $("#time-blocks");

// Displays date in the header
initializeDate();

// Colour codes the hours to indicate the current time of day
// Also enables depending on current time of day
colourCode();

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
            if (currentRow.attr("value") == 14) {
                currentRow.css("backgroundColor", "#FF9999");
            }
            $(currentRow.children()[1]).children()[0].disabled = false;
        }
    }
}

