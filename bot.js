const config = require("./config.js");
const songs = require("./songs.js");
const Twit = require("twit");
const Lyrics = require("lyricist");

const lyricist = new Lyrics(config.geniuscfg.clientAccessToken);
const T = new Twit(config.twitcfg);

async function tweetSongLyric() {
    var randSong = songs.ids[Math.floor(Math.random() * songs.ids.length)];
    var song = await lyricist.song(randSong, { fetchLyrics: true });
    var songLyrics = song.lyrics;
    songLyrics = songLyrics.split("  ");
    songLyrics = songLyrics[0].split("\n");

    goodLyric = false;
    while (goodLyric === false) {
        var songLyric = songLyrics[Math.floor(Math.random() * songLyrics.length)]
        if (songLyric.startsWith("[") === false) {
            songLyric = "\"" + songLyric + "\" - " + song.title + " by Lil Yachty";
            T.post('statuses/update', { status: songLyric }, function(err, data, response) {
                if (err) {
                    console.log("An error occured.");
                } else {
                    console.log("Success! Tweeted " + songLyric);
                }
            })
            goodLyric = true;
            break;
        }
    }
}

tweetSongLyric();
