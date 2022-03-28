var artistFormEl = document.querySelector("#artist-form");
var artistInputEl = document.querySelector("#artist");
var artistContainerEl = document.querySelector(".song-container");

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
        artistContainerEl.textContent = "";
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
                songContainer.append(`<button class="song-title" id="${songTitle}">${songTitle}</button>`);
                let button = document.getElementById(songTitle);
                console.log(button);
                button.addEventListener("click", function() {
                    getSongInfo(songTitle);
                });
                //console.log(songImage);
                //console.log(songTitle);

            }
        })
        .catch(err => console.error(err));
};


artistFormEl.addEventListener("submit", formSubmitHandler);

// Begin Genius Api Use

var songTitleButton = document.getElementById("#songTitle");

//songTitleButton.addEventListener("click", function(event) {});

const geniusApi = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'genius.p.rapidapi.com',
		'X-RapidAPI-Key': 'fc6f66fd96mshdbec18f03d4c96fp1de54cjsne13ca5b7d4c6'
	}
};

//  Genius Search Function

function getSongInfo (songTitle) {
    var apiUrl = `https://genius.p.rapidapi.com/search?q=${songTitle}`
fetch( apiUrl, geniusApi)
	.then(response => response.json())
	.then(response => {

            console.log(response.response.hits[0].result.url)
            // console.log(songTitle)
            var lyricLink = response.response.hits[0].result.url;
            console.log(lyricLink);
            var lyricContainer = $('#song-lyrics');
            lyricContainer.append(`<button class="song-lyrics btn-primary" id="lyric-btn" type="submit" onClick="${lyricLink}">Get ${songTitle} lyrics`);
            var btn = document.getElementById('lyric-btn');
            btn.addEventListener("click", ()=> {
                window.open(lyricLink, '_blank');
            });
            

        }
    )
	.catch(err => console.error(err));
};
