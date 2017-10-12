console.log("Bot is starting...");
var Twit = require("twit");
var config = require("./config.js");

var T = new Twit(config);
