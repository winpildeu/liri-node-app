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

// searches the API for concert info and returns the results
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

// searches the Spotify API and shows the song search results
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

            // loop thru and display the song info for each result
            for (let i = 0; i < data.length; i++) {
                // entry number
                console.log("\nEntry no: " + (i + 1));
                // artist name
                console.log("Artist: " + data[i].artists[0].name);
                // song name
                console.log("Song name: " + data[i].name);
                // preview URL
                console.log("Preview URL: " + data[i].preview_url);
                // album name
                console.log("Album name: " + data[i].album.name + "\n");
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

// searches the OMDB database for the inputted movie and shows the results
function omdb(movie) {
    let url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=7348df91";

    axios.get(url)
        .then(resp => {
            // confirm the data was received
            // console.log(resp);
            // console.log(url);


            // save the useful data
            let data = resp.data;

            // display the data
            console.log(`\nTitle: ${data.Title}`);
            console.log(`Year: ${data.Year}`);
            console.log(`IMDB rating: ${data.imdbRating}`);
            console.log(`Rotten Tomatoes rating: ${data.Ratings[1].Value}`);
            console.log(`Country: ${data.Country}`);
            console.log(`Language: ${data.Language}`);
            console.log(`Plot: ${data.Plot}`);
            console.log(`Actors: ${data.Actors}`);
        })
        .catch(err => console.log(err));
}

// imports a file that has a command/ input and then does stuff based on the command/input from the file
function readFile() {
    fs.readFile("random.txt", "utf8", (error, data) => {
        // catches and displays errors
        (error) ? console.log(error): console.log(`File: ${data}`);

        // split the string into an array of entries
        dataArr = data.split(',');
        
        // send the data to commands
        commands(dataArr[0], dataArr[1]);
    });
}

// logic for what to do with the input and query
function commands(input, query) {
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
            if (query == "") {
                query = "Mr. Nobody";
            }
            console.log(`Query: ${query}`);
            omdb(query);
            break;
        case "do-what-it-says":
            readFile();
            break;
        default:
            console.log(`Not a valid input.`);
            break;
    }
}

// main code ==========================================

// catch the input and put them into a variables
let input = process.argv[2];
let query = process.argv.slice(3).join(" ");
console.log(`LIRI input: ${input}`);

commands(input, query);