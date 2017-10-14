const config = require("./config.js");
const Twit = require("twit");
const Lyrics = require("lyricist");

const lyricist = new Lyrics(config.geniuscfg.clientAccessToken);
const T = new Twit(config.twitcfg);

const ids = [2602578, 2404125, 2398521, 2438081, 2823621, 2375097, 3060677, 2437098, 2649660, 2823606, 2715072, 2436846, 2437263, 2823610, 3060710, 3054074, 2437092, 2623629, 3060669, 2823600, 2838457, 3060702, 2471513, 3060674, 2410472, 2817808, 2424072, 2437244, 2919638, 2466619, 3060686, 2510057];

async function tweetSongLyric() {
    var randSong = ids[Math.floor(Math.random() * ids.length)];
    var song = await lyricist.song(randSong, { fetchLyrics: true });
    var songLyrics = song.lyrics;
    songLyrics = songLyrics.split("  ");
    songLyrics = songLyrics[0].split("\n");

    goodLyric = false;
    while (goodLyric === false) {
        var songLyric = songLyrics[Math.floor(Math.random() * songLyrics.length)]
        if (songLyric.startsWith("[") === false && songLyric !== "") {
            songLyric = "\"" + songLyric + "\" - " + song.title + " by Lil Yachty #lilyachty #lit #poet #rap";
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

setInterval(() => {
    var num = Math.random();
    console.log(num);
    if (num > 0.995) tweetSongLyric();
}, 1000);
