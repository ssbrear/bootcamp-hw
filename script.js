$(document).ready(function() {
    // All anchors open a new tab
    var allAnchors = $("a")
    allAnchors.attr("target", "_blank");

    // Bio links are positioned properly
    var bioAnchors = $(".bio-link");
    bioAnchors.attr("class", "ml-1");

    // Assignment links are justified properly
    var assignmentLinks = $(".assignment-links");
    assignmentLinks.css("float", "right");


});