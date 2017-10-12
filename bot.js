console.log("Bot is starting...");

const config = require("./config.js");
// const Twit = require("twit");
const geniusapi = require("genius-api");


// genius API does not have an artist entrypoint.
// Instead, search for the artist => get a song by that artist => get API info on that song => get artist id

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

Genius.getArtistIdByName('Lil Yachty')
.then(artistId => console.log(artistId))
.catch(err => console.error(err))

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
