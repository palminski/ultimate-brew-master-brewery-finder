//HTML elements on page. These may be unneeded if we use jQuerry
const $locationInput = document.querySelector("#location-input");
const $breweryInput = document.querySelector("#brewery-input");


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

const updateBeerQuote = () => {
    quoteToDisplay = beerQuotes[randomNumber(0,beerQuotes.length-1)];
    $("#beer-quote").html(quoteToDisplay.quote+"<br><span>"+quoteToDisplay.author+"</span>");
}

const searchBrewery = (locationInput,stateInput,breweryInput) => {
    // Declaring the basis of the url to be used with the API
    // const API_URL = "https://api.openbrewerydb.org/breweries?per_page=10&by_city=san_diego&by_name=cooper";
    let locationParameter = "";
    let breweryParameter = "";
    let stateParameter = "";
    const API_URL_BASE = "https://api.openbrewerydb.org/breweries?per_page=20";
    //Check to see if search terms were entered and then create a querry string based off the input
    if (locationInput) {
        locationParameter = "&by_city="+locationInput;
    }
    if (stateInput) {
        stateParameter = "&by_state="+stateInput;
    }
    if (breweryInput) {
        breweryParameter = "&by_name="+breweryInput ;
    }
    let API_URL = API_URL_BASE+locationParameter+stateParameter+breweryParameter;

    fetch(API_URL).then(function (response) {
        return response.json();
    }).then(function (data) {
        
        listBreweries(data);

    });
}

const listBreweries = (breweries) => {

    $("#card-container").html("");

    //Randomly shuffles an array to be used when determining the gif to use for each card
    let numberTOGrab = 50;
        let startingArray = [];
        for (let i =0; i < numberTOGrab; i++){
            startingArray.push(i)
        }
    let randomArray = shuffle(startingArray);
   

    for (let i = 0; i< breweries.length; i++) {
        //Grab Gif
        fetch("https://api.giphy.com/v1/gifs/search?api_key=t8B9bOhzlzT6JWigjBj02k9eDnQx1nFI&q=simpsons-beer&rating=pg&limit="+numberTOGrab).then(function (response) {
            return response.json();
        }).then(function (data) {
            
            let gif = data.data[randomArray[i]].images.original.url;

        
        //Make and append Brewery Cards
        let $breweryCard = $("<div>")
        .addClass("ui card brew-card")
        .attr("data-breweryID",(breweries[i].name+breweries[i].phone).replace(/\s+/g,""))
        .append(
            $("<a>").addClass("ui medium bordered image").attr("href",breweries[i].website_url).attr("target","_blank")
                .append(
                    $("<img>").addClass("ui small image").attr("src",gif)
                ),
            $("<div>").addClass("content")
                .append(
                    $("<a>").addClass("header").text(breweries[i].name).attr("href",breweries[i].website_url).attr("target","_blank"),
                    $("<div>").addClass("type").text("Brewery Type: "+breweries[i].brewery_type),
                    $("<div>").addClass("adress").text(breweries[i].street + " " + breweries[i].city + " " + breweries[i].state),
                    $("<div>").addClass("number").text("Phone Number: "+ breweries[i].phone),
                    $("<input>").attr("type","radio").attr("value",(breweries[i].name+breweries[i].phone).replace(/\s+/g,"")).addClass("favorite-radio")
                    // $("<div>").addClass("description").text("Description"), //Description not contained in JSON data
                    // $("<div>").addClass("review").text("REVIEW"), //Review Data not contained in JSON data
                    
                )
        );
        $("#card-container").append($breweryCard); //<= places info on page

    });
    }
}

const formSubmitHandler = (event) => {
    event.preventDefault();
    locationInput = $("#location-input").val();
    stateInput = $("#state-input").val();
    breweryInput = $("#brewery-input").val();
    
    updateBeerQuote();
    searchBrewery(locationInput,stateInput,breweryInput);
}

const favoriteRadioHandler = (event) => {
    let clickedID = event.target.defaultValue;

    $('*[data-breweryID="'+clickedID+'"]').append($("<div>").text("test"));
}


let randomNumber = function (min, max) {
    let value = Math.floor(Math.random()*(max - min +1)+min);
    return value;
}
let shuffle = (array) => {
    let i = array.length;
    let j = 0;
    let temp;

    while (i--) {
        j = Math.floor(Math.random() * (i+1)); //grabs number between 0 and current i

        temp = array[i]; //holds onto item at current array spot
        array[i] = array[j];   //makes current array spot equal randomly selected slot
        array[j] = temp;    //makes randomly selected slot eauel whatever current slot is. essentially swapping them around. Just doing this for each slot in array to shuffle them like a deck of cards
    }
    return array
}



$("#search-form").on("submit", formSubmitHandler);
$(document.body).on("click",".favorite-radio",favoriteRadioHandler);