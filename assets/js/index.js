//HTML elements on page. These may be unneeded if we use jQuerry
const $locationInput = document.querySelector("#location-input");
const $breweryInput = document.querySelector("#brewery-input");


const searchBrewery = (locationInput,breweryInput) => {
    // Declaring the basis of the url to be used with the API
    // const API_URL = "https://api.openbrewerydb.org/breweries?per_page=10&by_city=san_diego&by_name=cooper";
    let locationParameter = "";
    let breweryParameter = "";
    const API_URL_BASE = "https://api.openbrewerydb.org/breweries?per_page=9";
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
        let $breweryCard = $("<div>") //<= create a card to hold brewery info
        .addClass("ui card brew-card")
        .append( //This is where information from the JSON data will be added to each card
            $("<div>").addClass("ui medium bordered image")
                .append(
                    $("<img>").addClass("ui small image").attr("src","./assets/images/stock_photos/brewery17.jpeg")
                ),
            $("<div>").addClass("content")
                .append(
                    $("<a>").addClass("header").text(breweries[i].name).attr("href",breweries[i].website_url).attr("target","_blank"),
                    $("<div>").addClass("type").text("Brewery Type: "+breweries[i].brewery_type),
                    $("<div>").addClass("adress").text(breweries[i].street),
                    $("<div>").addClass("number").text("Phone Number: "+ breweries[i].phone),
                    $("<div>").addClass("description").text("Description"), //Description not contained in JSON data
                    $("<div>").addClass("review").text("REVIEW"), //Review Data not contained in JSON data
                )
        );
        $("#card-container").append($breweryCard); //<= places info on page
    }
}

const formSubmitHandler = (event) => {
    event.preventDefault();
    locationInput = $("#location-input").val();
    breweryInput = $("#brewery-input").val();

    searchBrewery(locationInput,breweryInput);
}

$("#search-form").on("submit", formSubmitHandler);