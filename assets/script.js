var artistFormEl = document.querySelector("#artist-form");
var artistInputEl = document.querySelector("#artist");
var artistContainerEl = document.querySelector("#artist-name");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
		'X-RapidAPI-Key': 'aec760e2bdmsh0a10242876bc5c6p120a8ejsn45013568bb91'
	}
};

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var artistName = artistInputEl.value.trim();

    // make sure there's a value in the artistName variable
    if (artistName) {
        getArtist(artistName)
        .then(artist => {
            console.log(artist);
            getTopFive(artist.id);
            console.log(artist.id);
        })
        artistInputEl.value = "";
    } else {
        alert("Please enter an artist name.");
    }
};


var getArtist = function(artist) {
    var apiURL = "https://deezerdevs-deezer.p.rapidapi.com/search/artist?q=" + artist;

    return fetch(apiURL, options)
	    .then(response => response.json())
	    .then(response => {
            return (response.data[0]);
            // displayArtist(response.data[0].name);
        })
	    .catch(err => console.error(err));
};


var getTopFive = function(id) {
    var apiURL = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + id + "/top";
   
    return fetch(apiURL, options)
        .then(response => response.json())
        .then(response => {
            return (response);
        })
        .catch(err => console.error(err));
};

var displayArtist = function(data) {
    console.log(data);
    // // artistContainerEl.textContent = "";

    // var artistName = response.data[0].name;

    // var artistEl = document.createElement("h2");
    // artistEl.textContent = artistName;

    // artistContainerEl.appendChild(artistEl);

};

var displayTopFive = function() {

};


artistFormEl.addEventListener("submit", formSubmitHandler);