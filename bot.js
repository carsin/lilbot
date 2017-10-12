console.log("Bot is starting...");

const config = require("./config.js");
// const Twit = require("twit");
const Lyrics = require("lyricist");

const lyricist = new Lyrics(config.geniuscfg.clientAccessToken);

async function getSongs() {
    return songs = await lyricist.songsByArtist(2, { page: 2, perPage: 50 });
}

async function findLilYachtyId() {
    var curArtist = "";
    var curArtistName = "";
    var i = 11;

    while (curArtistName !== "Lil Yachty") {
        curArtist = await lyricist.artist(i);
        curArtistName = curArtist.name;
        console.log(i + ": " + curArtistName);
        i++;
    }

    console.log(i)
}

async function findArtist(id) {
    const artist = await lyricist.artist(id);
    console.log(artist.name);
}

findArtist(9);

// findLilYachtyId();


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
