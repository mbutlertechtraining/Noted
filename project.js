//$(document).ready(function ()) {

var container = document.querySelector('container')
var image = document.querySelector('#music-image')

const input = document.querySelector('#container')
const submitBtn = document.querySelector('#submit')
const key = 
const url = https:

// const url = 'https://musixmatch

submitBtn.addEventListener('click', function(event) {
    event.preventDefault()
    console.log(input.value)
    fetch(url + input.value).then(Response => { 
        return response.json()
    }).then(function (data) {
        console.log(data.result[0].image)
        let music = data.result.image

    })  
})


//}) 

API.code and key is still needed
