console.log("Bot is starting...");

const config = require("./config.js");
const songs = require("./songs.js");
// const Twit = require("twit");
const Lyrics = require("lyricist");
const lyricist = new Lyrics(config.geniuscfg.clientAccessToken);

const artistId = 610968;

async function getSongLyric() {
    var randSong = songs.ids[Math.floor(Math.random() * songs.ids.length)];
    var song = await lyricist.song(randSong, { fetchLyrics: true });
    var songLyrics = song.lyrics;
    songLyrics = songLyrics.split("  ");
    songLyrics = songLyrics[0].split("\n");

    goodLyric = false;
    while (goodLyric === false) {
        var songLyric = songLyrics[Math.floor(Math.random() * songLyrics.length)]
        if (songLyric.startsWith("[") === false) {
            console.log("\"" + songLyric + "\" - " + song.title + " by Lil Yachty");
            goodLyric = true;
            break;
        }
    }

}

getSongLyric();


// var T = new Twit(config.twitcfg);

// var tweet = {
//     status: "#test #twit"
// }

// T.post("statuses/update", tweet, tweeted)

// function tweeted(err, data, response) {
//     if (err) {
//         console.log("Error: " + err);
//     } else {
//         console.log("Success: " + data);
//     }
// }
