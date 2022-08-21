//HTML elements on page. These may be unneeded if we use jQuerry
const $locationInput = document.querySelector("#location-input");
const $breweryInput = document.querySelector("#brewery-input");

//Sample UI Request to use for testing
//Will take sample term and console log JSON data
const searchBrewery = (searchTerm) => {
    const API_URL = "https://api.openbrewerydb.org/breweries/search?query="
    fetch(API_URL + searchTerm).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    });
}
searchBrewery("Eugene");