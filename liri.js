// set any environmental variables to the dotenv package
const result = require("dotenv").config();
// console.table(result.parsed);

const fs = require('fs');
const keys = require("./keys");
// console.table(keys);

const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require('moment');
const inquirer = require('inquirer');
const axios = require('axios');

// functions ==========================================

function bandsInTown(artist) {
    let url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    console.log(`Searching for ${artist} concerts...\nURL: ${url}\n`);

    // perform a get request with the URL and artist info
    axios.get(url)
        .then(function (response) {
            // show the raw data response
            // console.log(response);

            // keep only the useful data
            let data = response.data;

            // display the name, location and date of each venue
            data.forEach(element => {
                console.log(`Name: ${element.venue.name} \nLocation: ${element.venue.city}, ${element.venue.country} \nDate: ${moment(response.datetime).format("MM/DD/YYYY")}\n\n`);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function spotifySearch(song) {
    spotify
        .search({
            type: 'track',
            query: song
        })
        .then(function (response) {
            // confirm data was received
            // console.table(response.tracks.items, ["artists", "name", "preview_url", "album"]);

            // save the useful data
            let data = response.tracks.items;

            // album name
            // console.log(data[0].album.name);
            // artist name
            // console.log(data[0].artists[0].name);
            // preview URL
            // console.log(data[0].preview_url);
            // song name
            // console.log(data[0].name);
            
        })
        .catch(function (err) {
            console.log(err);
        });
}
// main code ==========================================

// catch the input and put them into a variables
let input = process.argv[2];
let query = process.argv.slice(3).join(" ");
console.log(`LIRI input: ${input}`);


// depending on the input, run the command
switch (input) {
    case "concert-this":
        console.log(`Query: ${query}`);
        bandsInTown(query);
        break;
    case "spotify-this-song":
        if (query == "") {
            query = "The Sign Ace of Base";
        }
        console.log(`Query: ${query}\n`);
        spotifySearch(query);
        break;
    case "movie-this":
        console.log(`Query: ${query}`);
        omdb();
        break;
    case "do-what-it-says":
        readFile();
        break;
    default:
        console.log(`Not a valid input.`);
        break;
}