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

    var artistName = artistInputEl.value.trim();

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
            console.log(response.data);
            return (response.data[0]);
        })
	    .catch(err => console.error(err));
};


var getTopFive = function(id) {
    var apiURL = "https://deezerdevs-deezer.p.rapidapi.com/artist/" + id + "/top";
   
    return fetch(apiURL, options)
        .then(response => response.json())
        .then(response => {
            for (let i = 0; i < response.data.length; i++)
            {
                let songImage = response.data[i].album.cover;
                let songTitle = response.data[i].title;
                
                let songContainer = $('#song-container')
                songContainer.append(`<img id="albumCover" src=${songImage}>`);
                songContainer.append(`<p id="songTitle">${songTitle}</p>`);
                
                //console.log(songImage);
                //console.log(songTitle);

            }
        })
        .catch(err => console.error(err));
};

artistFormEl.addEventListener("submit", formSubmitHandler);