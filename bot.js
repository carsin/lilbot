// Load libs & apis
const config = require("./config.js");
const Twit = require("twit");
const Lyrics = require("lyricist");
const lyricist = new Lyrics(config.geniuscfg.clientAccessToken);
const geniusapi = require("genius-api");

const T = new Twit(config.twitcfg);

// Genius song IDs. Used for looking up lyrics, artist, etc.
const ids = [2602578, 2404125, 2398521, 2438081, 2823621, 2375097, 3060677, 2437098, 2715072, 2436846, 2437263, 2823610, 3060710, 3054074, 2437092, 3060669, 2823600, 2838457, 3060702, 2471513, 3060674, 2410472, 2817808, 2424072, 2437244, 2919638, 2466619, 3060686, 2510057, 3001910, 3191006, 3262460, 3091604, 3183654, 3086860, 3190610, 3121411, 3138099, 3030767, 3112700, 3089054, 3098326, 3262459, 3138849, 3216141, 3178647, 3088706, 3198490, 3138819, 3005836, 3138171, 3088314, 3261777, 3059623, 3088993, 3246992, 3107295, 2890500, 2597606, 2449820, 3125543, 3023327, 3261768, 3067458, 2840363, 3214267, 2822559, 3134910, 3065564, 3234318, 3212599, 3121471, 2441478, 3082569, 2460482, 2865278, 3126392, 2431237, 2807850, 3182604, 3151455, 2455048, 3044650, 3185662, 2465721, 1783157, 2843684, 2831211, 2829706, 2897183, 2465662, 2463139, 2893839, 2885962, 3085702, 2445333, 2818287, 3120650, 3063333, 2821640, 2670547, 2532295, 2899800, 3070581, 1783102, 2841566, 2833987, 2846034, 3138029, 2474016, 3054872, 2839946, 2837594, 2450113];

// Finds ID of an artist on genius. Thanks to cmichel.io
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

// Genius.getArtistIdByName('Ski Mask the Slump God').then(artistId => console.log(artistId)).catch(err => console.error(err));

// Where the magic happens. Takes a random song from the ID array, looks up the lyrics, gets a single line from it, and tweets it with the artist.
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
            songLyric = "\"" + songLyric + "\" - " + song.title + " by " + song.primary_artist.name + " #" + song.primary_artist.name.replace(/\s+/g, '') + " #lit #poet #rap #lilbot";
            console.log(songLyric);
            T.post('statuses/update', { status: songLyric }, function(err, data, response) {
                if (err) {
                    console.log("An error occured.");
                } else {
                    console.log("Success! Tweeted " + songLyric);
                }
            });

            goodLyric = true;
            break;
        }
    }
}

// Randomly tweet a song lyric. Generates a random number every second. If number meets requirement, tweet.
setInterval(() => {
    var num = Math.random();
    console.log(num);
    if (num > 0.995) tweetSongLyric();
}, 1000);

// Finds a song in the array of ids. Useful for checking broken songs or dead ids.
async function findSong(songTitle) {
    for (var i = 0; i < ids.length; i++) {
        console.log(i);
        var curSong = await lyricist.song(ids[i]);
        if (curSong.title === songTitle) {
            console.log(ids[i]);
            break;
        }
    }
}
