//HTML elements on page. These may be unneeded if we use jQuerry
const $locationInput = document.querySelector("#location-input");
const $breweryInput = document.querySelector("#brewery-input");


    


const searchBrewery = (locationInput,breweryInput) => {
    // Declaring the basis of the url to be used with the API
    // const API_URL = "https://api.openbrewerydb.org/breweries?per_page=10&by_city=san_diego&by_name=cooper";
    let locationParameter = "";
    let breweryParameter = "";
    const API_URL_BASE = "https://api.openbrewerydb.org/breweries?per_page=20";
    //Check to see if search terms were entered and then create a querry string based off the input
    if (locationInput) {
        locationParameter = "&by_city="+locationInput ;
    }
    if (breweryInput) {
        breweryParameter = "&by_name="+breweryInput ;
    }
    let API_URL = API_URL_BASE+locationParameter+breweryParameter

    fetch(API_URL).then(function (response) {
        return response.json();
    }).then(function (data) {
        listBreweries(data);
    });
}

const listBreweries = (breweries) => {

    $("#card-container").html("");

    for (let i = 0; i< breweries.length; i++) {
        console.log(breweries[i]);

        fetch("http://api.giphy.com/v1/gifs/search?api_key=t8B9bOhzlzT6JWigjBj02k9eDnQx1nFI&q=simpsons-beer&rating=pg").then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            let gif = data.data[i].images.original.url;
        

        let $breweryCard = $("<a>") //<= create a card to hold brewery info
        .addClass("ui card brew-card")
        .attr("href",breweries[i].website_url).attr("target","_blank")
        .append( //This is where information from the JSON data will be added to each card
            $("<div>").addClass("ui medium bordered image")
                .append(
                    $("<img>").addClass("ui medium image").attr("src",gif)
                ),
            $("<div>").addClass("content")
                .append(
                    $("<div>").addClass("header").text(breweries[i].name),
                    $("<div>").addClass("type").text("Brewery Type: "+breweries[i].brewery_type),
                    $("<div>").addClass("adress").text(breweries[i].street),
                    $("<div>").addClass("number").text("Phone Number: "+ breweries[i].phone),
                    $("<div>").addClass("description").text("Description"), //Description not contained in JSON data
                    $("<div>").addClass("review").text("REVIEW"), //Review Data not contained in JSON data
                )
        );
        $("#card-container").append($breweryCard); //<= places info on page
    });
    }
}

let randomNumber = function (min, max) {
    let value = Math.floor(Math.random()*(max - min +1)+min);
    return value;
}

const formSubmitHandler = (event) => {
    event.preventDefault();
    locationInput = $("#location-input").val();
    breweryInput = $("#brewery-input").val();

    searchBrewery(locationInput,breweryInput);
}

// console.log(getBeerGif());

$("#search-form").on("submit", formSubmitHandler);