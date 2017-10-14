const config = require("./config.js");
const Twit = require("twit");
const Lyrics = require("lyricist");
const lyricist = new Lyrics(config.geniuscfg.clientAccessToken);
const geniusapi = require("genius-api");

const T = new Twit(config.twitcfg);

const ids = [2602578, 2404125, 2398521, 2438081, 2823621, 2375097, 3060677, 2437098, 2649660, 2823606, 2715072, 2436846, 2437263, 2823610, 3060710, 3054074, 2437092, 2623629, 3060669, 2823600, 2838457, 3060702, 2471513, 3060674, 2410472, 2817808, 2424072, 2437244, 2919638, 2466619, 3060686, 2510057];

geniusapi.prototype.getArtistIdByName = function getArtistIdByName(artistName) {
    const normalizeName = name => name.replace(/\./g, '').toLowerCase();   // regex removes dots
    const artistNameNormalized = normalizeName(artistName);

    return this.search(artistName).then((response) => {
        for (let i = 0; i < response.hits.length; i += 1) {
            const hit = response.hits[i];
            if (hit.type === 'song' && normalizeName(hit.result.primary_artist.name) === artistNameNormalized) {
                return hit.result;
            }
        }
    }).then(songInfo => songInfo.primary_artist.id);
}

const Genius = new geniusapi(config.geniuscfg.clientAccessToken);

Genius.getArtistIdByName('Trippie Redd')
.then(artistId => console.log(artistId))
.catch(err => console.error(err))

async function tweetSongLyric() {
    var randSong = ids[Math.floor(Math.random() * ids.length)];
    var song = await lyricist.song(randSong, { fetchLyrics: true });
    const songs = await lyricist.songsByArtist(1086436, { page: 1, perPage: 50 });
    console.log(songs);
    var songLyrics = song.lyrics;
    songLyrics = songLyrics.split("  ");
    songLyrics = songLyrics[0].split("\n");

    goodLyric = false;
    while (goodLyric === false) {
        var songLyric = songLyrics[Math.floor(Math.random() * songLyrics.length)]
        if (songLyric.startsWith("[") === false && songLyric !== "") {
            songLyric = "\"" + songLyric + "\" - " + song.title + " by " + song.album.artist.name + "#" + song.album.artist.name + "#lit #poet #rap #lilbot";
            console.log(songLyric);
            // T.post('statuses/update', { status: songLyric }, function(err, data, response) {
            //     if (err) {
            //         console.log("An error occured.");
            //     } else {
            //         console.log("Success! Tweeted " + songLyric);
            //     }
            // });
            goodLyric = true;
            break;
        }
    }
}

tweetSongLyric();

// setInterval(() => {
//     var num = Math.random();
//     console.log(num);
//     if (num > 0.995) tweetSongLyric();
// }, 1000);
