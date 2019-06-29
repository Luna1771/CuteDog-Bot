const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');

bot.settings = require("./settings.json");

var express = require('express');
var app = express();

require('./modules/webserver.js').start();

fs.readdir("./events/", (err, files) => {
  if(err) return console.error(err);
  files.forEach(file => {
    if(!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`[CMD][LOAD] ${commandName}`);
    bot.commands.set(props.help.name, props);
  });
});

bot.login("NTE2NzEwMTEzNTI5MTY3ODgy.XRe0xA.0D0YSmgAZBXZgUopWIk5rDOPEao");
