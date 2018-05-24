require("dotenv").config()
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');



var fs = require("fs")

var keys = require("./keys.js")


var doWhat = process.argv[2];
var thing = process.argv[3];

var Tkeys = keys.twitter
var Skeys = keys.spotify


// fs.readFile("keys.js", "utf8", function(error, data) {
//     if (error) {
//         return console.log(error)
//     }
// })
//twitter npm
var client = new Twitter({
  consumer_key: 'Tkeys.consumer_keys',
  consumer_secret: 'Tkeys.consumer_secret',
  access_token_key: 'Tkeys.access_token_key',
  access_token_secret: 'Tkeys.access_token_secret'
});

function twit() {
    var params = {screen_name: 'ThisCoder'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
        else {
            console.log(error)
        }
    });
}


// SPOTIFY NPM 
var getArtist = function(artist) {
    return artist.name;
  };

function music () {
    var spotify = new Spotify({
        id: Skeys.id,
        secret: Skeys.secret
    });
    spotify.search({ type: 'track', query: thing }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    var song = data.tracks.items
    for (i= 0; i < song.length; i++) {
        console.log("artist(s): " + song[i].artists.map(getArtist));
        console.log("song name: " + song[i].name);
        console.log("preview song: " + song[i].preview_url);
        console.log("album: " + song[i].album.name);    }
    });

    //request npm
    var request = require('request');
    request('http://www.google.com', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    });
}


function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + thing + "&y=&plot=short&apikey=trilogy"

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {
            movie = JSON.parse(body)
            console.log("Title: " + movie.Title)
            console.log("Year: " + movie.Year)
            console.log("IMDB Rating: " +movie.imdbRating)
            console.log(movie.Ratings[1].Source + " Rating " + movie.Ratings[1].Value)
            console.log("Country: " + movie.Country)
            console.log("Language: " + movie.Language)
            console.log("Plot: " + movie.Plot)
            console.log("Actors: " + movie.Actors)
        }
    });
      
    
}


if (doWhat === "my-tweets") {
    twit()
}
else if (doWhat === "movie-this"){
    movie()
}
else if (doWhat === "spotify-this") {
    music()
}
else {
    console.log("Try Again")
}