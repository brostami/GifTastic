$(document).ready(function () {
var animals = ["cat", "dog", "squirrel", "rabbit", "fox", "gopher", "hamster", "hedgehog"];

loadBtns();

// Create initial array buttons
function loadBtns() {
    for (var i = 0; i < animals.length; i++) {
        createBtn(animals[i]);
    }
}

// Create buttons
function createBtn(animal) {
    var button = $("<button style='margin: 0 5px 5px 0;'>");
    button.addClass("btn btn-primary animalBtn");
    button.attr("data-name", animal);
    button.text(animal);
    $("#animalBtns").append(button);
}

// Add click event listener to animal buttons to get gifs from giphy api and display in #gifs div
$("#animalBtns").on("click", ".animalBtn", function() {
    $("#gifs").empty();
    var clickedAnimal = $(this).text();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + clickedAnimal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        for (var j = 0; j < results.length; j++) {
            var animalDiv = $("<div style='display: inline-block; margin: 0 5px 20px 0;'>");
            var rating = $("<p>").text("Rating: " + results[j].rating.toUpperCase());
            var animalImg = $("<img>");
            animalImg.attr("src", results[j].images.fixed_height_still.url);
            animalImg.attr("data-still", results[j].images.fixed_height_still.url);
            animalImg.attr("data-animate", results[j].images.fixed_height.url);
            animalImg.attr("data-state", "still");
            animalImg.addClass("gif");
            animalDiv.append(rating);
            animalDiv.append(animalImg);
            $("#gifs").append(animalDiv);
        }
    });
});

$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("#newAnimal").val().trim();
    $("#newAnimal").val("");
    animals.push(newAnimal);
    createBtn(newAnimal);
});

$("#gifs").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

});