//$(document).ready(function ()) {

var container = document.querySelector('container')
var image = document.querySelector('#music-image')

const input = document.querySelector('#container')
const submitBtn = document.querySelector('#submit')

var artistSearch = document.querySelector("#artist-search");
var artistSearchButton = document.querySelector("artist-search-button")

artistSearch.addEventListener("click", () => {
    
})
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'genius.p.rapidapi.com',
		'X-RapidAPI-Key': 'fc6f66fd96mshdbec18f03d4c96fp1de54cjsne13ca5b7d4c6'
	}
};

fetch(`https://genius.p.rapidapi.com/search?q=${artistSearch.value}`, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


//}) 