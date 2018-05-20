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
        console.log(tweets);
    }
    else {
        console.log(error)
    }

    });
}


// SPOTIFY NPM 

function music () {
    var spotify = new Spotify({
        id: Skeys.id,
        secret: Skeys.secret
      });
    spotify.search({ type: 'track', query: thing }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log(data)
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


if (doWhat === "movie" || doWhat === "Movie") {
    movie()
}
else if (doWhat === "twitter" || doWhat ==="Twiter"){
    twit()
}
else if (doWhat === "music" || doWhat === "Music") {
    music()
}