console.log("Bot is starting...");

const config = require("./config.js");
const Twit = require("twit");
const Lyricist = require("lyricist");

const lyrics = new Lyricist(config.geniuscfg.clientAccessToken);

lyrics.song(714198).then(song => console.log(song.title));

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
