
let favorites = [];
if (localStorage.getItem("favorites")) {
    favorites = JSON.parse(localStorage.getItem("favorites"));
    console.log(favorites);
}


const beerQuotes = [
    {
        quote: '“The mouth of a perfectly happy man is filled with beer.”',
        author: '-Ancient Egyptian Wisdom, 2200 B.C.'
    },
    {
        quote: '“He was a wise man who invented beer”',
        author: '–Plato'
    },
    {
        quote: '“Fermentation may have been a greater discovery than fire.”',
        author: '–David Rains Wallace'
    },
    {
        quote: '“Many battles have been fought and won by soldiers nourished on beer.”',
        author: '—Frederick the Great'
    },
    {
        quote: '“Beer, if drank with moderation, softens the temper, cheers the spirit and promotes health.”',
        author: '-Thomas Jefferson'
    },
    {
        quote: '“We should look for someone to eat and drink with before looking for something to eat and drink.”',
        author: '—Epicurus'
    },
    {
        quote: '“Let no man thirst for good beer.”',
        author: '–Sam Adams'
    },
    {
        quote: '“Give me a woman who loves beer and I will conquer the world.”',
        author: '–Kaiser Wilhelm'
    },
    {
        quote: '“Prohibition makes you want to cry into your beer and denies you the beer to cry into.”',
        author: '—Don Marquis'
    },
    {
        quote: '“On victory, you deserve beer, in defeat, you need it.”',
        author: '—Napoleon'
    },
    {
        quote: '“Beer, it’s the best damn drink in the world.”',
        author: '-Jack Nicholson'
    },
    {
        quote: '“There is no such thing as a bad beer. It’s that some taste better than others.”',
        author: '-Bill Carter'
    },
    {
        quote: '“For a quart of Ale is a dish for a king.”',
        author: '-William Shakespeare'
    }
]
// Cycles through our array of beer quotes when a user searches
const updateBeerQuote = () => {
    quoteToDisplay = beerQuotes[randomNumber(0, beerQuotes.length - 1)];
    $("#beer-quote").html(quoteToDisplay.quote + "<br><span>" + quoteToDisplay.author + "</span>");
}

const searchBrewery = (locationInput, stateInput, breweryInput) => {
    // Declaring the basis of the url to be used with the API
    // const API_URL = "https://api.openbrewerydb.org/breweries?per_page=10&by_city=san_diego&by_name=cooper";
    let locationParameter = "";
    let breweryParameter = "";
    let stateParameter = "";
    const API_URL_BASE = "https://api.openbrewerydb.org/breweries?per_page=20";
    //Check to see if search terms were entered and then create a querry string based off the input
    if (locationInput) {
        locationParameter = "&by_city=" + locationInput;
    }
    if (stateInput) {
        stateParameter = "&by_state=" + stateInput;
    }
    if (breweryInput) {
        breweryParameter = "&by_name=" + breweryInput;
    }
    let API_URL = API_URL_BASE + locationParameter + stateParameter + breweryParameter;

    fetch(API_URL).then(function (response) {
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
                listBreweries(data);
            });
        }
        else{
            console.log("error");
            displayError();
        }
    }).catch(function(error) {
        displayError();
    });
}

const listBreweries = (breweries) => {
    //clears all cards in card container
    console.log("listing breweries");
    $("#card-container").html("");

    
    //Randomly shuffles an array to be used when determining the gif to use for each card
    let numberTOGrab = 50;
    let startingArray = [];
    for (let i = 0; i < numberTOGrab; i++) {
        startingArray.push(i)
    }
    let randomArray = shuffle(startingArray);

    for (let i = 0; i < breweries.length; i++) {
        //Grab Gif
        fetch("https://api.giphy.com/v1/gifs/search?api_key=t8B9bOhzlzT6JWigjBj02k9eDnQx1nFI&q=simpsons-beer&rating=pg&limit=" + numberTOGrab).then(function (response) {
            if (response.ok) {
                response.json().then(function(data){
                    let gif = data.data[randomArray[i]].images.original.url;

                    //Make and append Brewery Cards
                    let $breweryCard = $("<div>")
                        .addClass("ui card brew-card")
                        .attr("data-breweryID", (breweries[i].name + breweries[i].phone).replace(/\s+/g, ""));
        
                    // Checks if there is an associated Link
                    if (breweries[i].website_url) {
                        $breweryCard.append(
                            $("<a>").addClass("ui medium bordered image").attr("href", breweries[i].website_url).attr("target", "_blank")
                                .append(
                                    $("<img>").addClass("ui small image").attr("src", gif)
                                ),
                            $("<div>").addClass("content")
                                .append(
                                    $("<a>").addClass("header").text(breweries[i].name).attr("href", breweries[i].website_url).attr("target", "_blank"),
                                    $("<div>").addClass("type").text("Brewery Type: " + breweries[i].brewery_type),
                                    $("<div>").addClass("adress").text(breweries[i].street + " " + breweries[i].city + " " + breweries[i].state),
                                    $("<div>").addClass("number").text("Phone Number: " + breweries[i].phone),
                                    $("<a>").attr("href", "https://www.google.com/maps/search/" + breweries[i].street + ", " + breweries[i].city + ", " + breweries[i].state + breweries[i].name).attr("target", "_blank").append(
                                        $("<button>").addClass("ui icon map button").text("Map").attr("id", "favorites")),
                                    
                                    $("<label>").addClass("star-checkbox").append(
                                        $("<input>").attr("type", "checkbox").attr("value", (breweries[i].name + breweries[i].phone).replace(/\s+/g, "")).addClass("favorite-checkbox"),
                                        $("<i>").addClass("heart icon").attr("id","filled"),
                                        $("<i>").addClass("heart outline icon").attr("id","outline"),
                                    ),
                                   
                                )
                        );
                    }
                    else {
                        $breweryCard.append(
                            $("<div>").addClass("ui medium bordered image")
                                .append(
                                    $("<img>").addClass("ui small image").attr("src", gif)
                                ),
                            $("<div>").addClass("content")
                            .append(
                                $("<a>").addClass("header").text(breweries[i].name).attr("href", breweries[i].website_url).attr("target", "_blank"),
                                $("<div>").addClass("type").text("Brewery Type: " + breweries[i].brewery_type),
                                $("<div>").addClass("adress").text(breweries[i].street + " " + breweries[i].city + " " + breweries[i].state),
                                $("<div>").addClass("number").text("Phone Number: " + breweries[i].phone),
                                $("<a>").attr("href", "https://www.google.com/maps/search/" + breweries[i].street + ", " + breweries[i].city + ", " + breweries[i].state + breweries[i].name).attr("target", "_blank").append(
                                    $("<button>").addClass("ui icon map button").text("Map").attr("id", "favorites")),
                                
                                $("<label>").addClass("star-checkbox").append(
                                    $("<input>").attr("type", "checkbox").attr("value", (breweries[i].name + breweries[i].phone).replace(/\s+/g, "")).addClass("favorite-checkbox"),
                                    $("<i>").addClass("heart icon").attr("id","filled"),
                                    $("<i>").addClass("heart outline icon").attr("id","outline"),
                                ),
                               
                            )
                        );
                    }
        
                    $("#card-container").append($breweryCard); //<= places info on page
                    updateFavorites(); 
                })
            } else {
                console.log("error");
            }
        }).catch(function (error) {
            displayError();
        });
    }
    if (breweries.length === 0){
        displayError();
    }
}
// Displays error if no results can be found 
const displayError = () => {
    
    $("#card-container").html("");
    $("#card-container").append(
        $("<div>").text("404 Brewery Not Found").addClass("about"),

    );
}
// Favorites Section
const addFavorites = (ID, HTML) => {
    favorites.push({
        id: ID,
        html: HTML
    });
    updateFavorites();
}

const removeFavorites = (ID) => {
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === ID) {
            favorites.splice(i, 1);
        }
    }
    updateFavorites();
}

const updateFavorites = () => {
    $("input[type=checkbox]").attr("checked", false); //Sets all checkboxes off
    for (let i = 0; i < favorites.length; i++) {
        $("input[type=checkbox][value=" + JSON.stringify(favorites[i].id) + "]").attr("checked", true); //rechecks everything in favorites

    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

const displayFavorites = () => {
    $("#card-container").html("");
    console.log(favorites);
    for (let i = 0; i < favorites.length; i++) {
        let $breweryCard = $("<div>")
            .addClass("ui card brew-card")
            .attr("data-breweryID", favorites[i].id)
            .html(favorites[i].html);
        $("#card-container").append($breweryCard);
    }
    updateFavorites();
}
// Favorite Section End 
const formSubmitHandler = (event) => {
    event.preventDefault();
    locationInput = $("#location-input").val();
    stateInput = $("#state-input").val();
    breweryInput = $("#brewery-input").val();

    updateBeerQuote();
    searchBrewery(locationInput, stateInput, breweryInput);
}

const favoriteCheckboxHandler = (event) => {

    let clickedID = event.target.defaultValue;
    let clickedCard = $('*[data-breweryID="' + clickedID + '"]');
    let cardHTML = (clickedCard.html());

    if (event.target.checked) {
        addFavorites(clickedID, cardHTML);
    }
    else {
        removeFavorites(clickedID);
    }
}

const randomNumber = function (min, max) {
    let value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}
const shuffle = (array) => {
    let i = array.length;
    let j = 0;
    let temp;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1)); //grabs number between 0 and current i

        temp = array[i]; //holds onto item at current array spot
        array[i] = array[j];   //makes current array spot equal randomly selected slot
        array[j] = temp;    //makes randomly selected slot equel whatever current slot is. essentially swapping them around. Just doing this for each slot in array to shuffle them like a deck of cards
    }
    return array
}

$("#search-form").on("submit", formSubmitHandler);
$("#display-favorites").on("click", displayFavorites);
$(document.body).on("click", ".favorite-checkbox", favoriteCheckboxHandler);