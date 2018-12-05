// set any environmental variables to the dotenv package
const result = require("dotenv").config();
// console.table(result.parsed);

const fs = require('fs');
const keys = require("./keys");
console.table(keys);

const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const inquirer = require('inquirer');
const axios = require('axios');

// functions ==========================================

function bandsInTown(artist) {
    let url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    console.log(`Searching for ${artist} concerts...`);
    
    // perform a get request with the URL and artist info
    axios.get(url)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// main code ==========================================

// catch the input and put them into a variables
let input = process.argv[2];
let query = process.argv.slice(3).join(" ");
console.log(`LIRI input: ${input} \nQuery: ${query}`);


// depending on the input, run the command
switch (input) {
    case "concert-this":
        bandsInTown(query);
        break;
    case "spotify-this-song":
        spotify();
        break;
    case "movie-this":
        omdb();
        break;
    case "do-what-it-says":
        readFile();
        break;
    default:
        console.log(`Not a valid input.`);
        break;
}