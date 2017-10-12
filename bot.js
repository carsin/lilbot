console.log("Bot is starting...");

const config = require("./config.js");
// const Twit = require("twit");
const Lyrics = require("lyricist");

const lyricist = new Lyrics(config.geniuscfg.clientAccessToken);

async function getSongs() {
    return songs = await lyricist.songsByArtist(2, { page: 2, perPage: 50 });
}

async function getArtist() {
    const artist = await lyricist.artist(610968);
    console.log(artist.name);
}

getArtist();

// var T = new Twit(config.twitcfg);

// var tweet = {
//     status: "#test #twit"
// }

// T.post('statuses/update', tweet, tweeted)

// function tweeted(err, data, response) {
//     if (err) {
//         console.log("Error: " + err);
//     } else {
//         console.log("Success: " + data);
//     }
// }
