console.log("Bot is starting...");
var Twit = require("twit");
var tokens = require("./tokens.js");

var T = new Twit({
    consumer_key:         tokens.consumer_key,
    consumer_secret:      tokens.consumer_secret,
    access_token:         tokens.access_token,
    access_token_secret:  tokens.access_token_secret,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});
