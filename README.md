# liri-node-app
A command line node app that takes in parameters and gives you back data. This app accepts input from the user in the form of a command and a query. Depending on the command, it will do different things.

*Example input*
node liri movie-this Avengers

## 4 Possible Commands

### 1. concert-this
This takes the user's input and searches the Bands In Town API for concerts.
![concert-this gif](assets/concert-this.gif)

### 2. spotify-this-song
This takes the user's input and searches the Spotify API for songs related. It defaults to "The Sign Ace of Base" if nothing is entered by the user.
![spotify-this-song](assets/spotify-this.gif)

### 3. movie-this
This takes the user's input and searches the OMDB API for the closest match. It defaults to "Mr. Nobody" if there is no user input.
![movie-this](assets/movie-this.gif)

### 4. do-what-it-says
This takes in a formatted text file and uses that file as input. It will read the file and run the command and query based on what is written in the file.
![do what it says](assets/do-what-it-says.gif)
