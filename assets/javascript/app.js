$(document).ready(function () {
var animals = ["cat", "dog", "squirrel", "rabbit", "fox", "gopher", "hamster", "hedgehog"];

// Creates initial array buttons
function loadBtns() {
    for (var i = 0; i < animals.length; i++) {
        createBtn(animals[i]);
    }
}

// Creates buttons
function createBtn(animal) {
    var button = $("<button style='margin-right: 5px;'>");
    button.addClass("btn btn-primary animalBtn");
    button.attr("data-name", animal);
    button.text(animal);
    $("#animalBtns").append(button);
}

$("#animalBtns").on("click", ".animalBtn", function() {
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
            animalImg.attr("src", results[j].images.fixed_height.url);
            animalDiv.append(rating);
            animalDiv.append(animalImg);
            $("#gifs").append(animalDiv);
        }
    });
});

loadBtns();

});