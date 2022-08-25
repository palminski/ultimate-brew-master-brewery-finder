//HTML elements on page. These may be unneeded if we use jQuerry
const $locationInput = document.querySelector("#location-input");
const $breweryInput = document.querySelector("#brewery-input");


const beerQuotes = [
    {
       "quote": '"Humankind was built on beer. From the world’s first writing to its first laws, in rituals social, religious, and political, civilization is soaked in beer.”',
       "author": '–William Bostwick'
    },
    {
        "quote": '“So when the devil says to you, ‘Do not drink,’ answer him: ‘I will drink, and right freely, just because you tell me not to.’ One must always do what Satan forbids.”',
        "author": '— Martin Luther'
     },
     {
        "quote": '“The mouth of a perfectly happy man is filled with beer.”',
        "author": '-Ancient Egyptian Wisdom, 2200 B.C.'
     },
     {
         "quote": '“He was a wise man who invented beer”',
         "author": '–Plato'
      },
      {
        "quote": '“Fermentation may have been a greater discovery than fire.”',
        "author": '–David Rains Wallace'
     },
     {
         "quote": '“Many battles have been fought and won by soldiers nourished on beer.”',
         "author": '—Frederick the Great'
      },
      {
         "quote": '“This is grain, which any fool can eat, but for which the lord has intended a more divine form of consumption. Let us give praise to our maker and glory to His bounty by learning about beer.”',
         "author": '–Friar Tuck, Robin Hood'
      },
      {
          "quote": '“Thirstily he set it to his lips, and as its cool refreshment began to soothe his throat, he thanked Heaven that in a world of much evil there was still so good a thing as ale.”',
          "author": '–Rafael Sabatini,  Fortune’s Fool'
       },
       {
        "quote": '“There is nothing which has yet been contrived by man by which so much happiness is produced as by a good tavern or inn.”',
        "author": '-Samuel Johnson'
     },
     {
        "quote": '“We could not now take time for further search or consideration: our victuals being much spent, especially our beer.”',
        "author": '–Mayflower logbook entry dated December 16, 1620'
     },
     {
         "quote": '“Beer, if drank with moderation, softens the temper, cheers the spirit and promotes health.”',
         "author": '-Thomas Jefferson'
      },
      {
        "quote": '“We should look for someone to eat and drink with before looking for something to eat and drink.”',
        "author": '—Epicurus'
     },
     {
        "quote": '“Let no man thirst for good beer.”',
        "author": '–Sam Adams'
     },
     {
         "quote": '“Give me a woman who loves beer and I will conquer the world.”',
         "author": '–Kaiser Wilhelm'
      },
      {
        "quote": '“Prohibition makes you want to cry into your beer and denies you the beer to cry into.”',
        "author": '—Don Marquis'
     },
     {
       "quote": '“On victory, you deserve beer, in defeat, you need it.”',
       "author": '—Napoleon'
    },
    {
       "quote": '“Beer, it’s the best damn drink in the world.”',
       "author": '-Jack Nicholson'
    },
    {
        "quote": '“There is no such thing as a bad beer. It’s that some taste better than others.”',
        "author": '-Bill Carter'
     },
     {
        "quote": '“For a quart of Ale is a dish for a king.”',
        "author": '-William Shakespeare'
     },
     {
        "quote": '“Without question, the greatest invention in the history of mankind is beer. Oh, I grant you that the wheel was also a fine invention, but the wheel does not go nearly as well with pizza.”',
        "author": '-Dave Berry'
     }
]

    


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

        //Grab Gif
        let numberTOGrab = 25;
        fetch("http://api.giphy.com/v1/gifs/search?api_key=t8B9bOhzlzT6JWigjBj02k9eDnQx1nFI&q=simpsons-beer&rating=pg&limit="+numberTOGrab).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            let gif = data.data[i].images.original.url;
        
        //Make and append Brewery Cards
        let $breweryCard = $("<a>")
        .addClass("ui card brew-card")
        .attr("href",breweries[i].website_url).attr("target","_blank")
        .append(
            $("<div>").addClass("ui medium bordered image")
                .append(
                    $("<img>").addClass("ui small image").attr("src",gif)
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