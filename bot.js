console.log("Bot is starting...");
var Twit = require("twit");
var config = require("./config.js");

var T = new Twit(config);

var tweet = {
    status: "#test #twit"
}

T.post('statuses/update', tweet, tweeted)

function tweeted(err, data, response) {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Success: " + data);
    }
}
