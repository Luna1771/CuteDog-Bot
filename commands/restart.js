exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  if(!bot.settings.team.memberIDs.includes(msg.author.id)) return;
  msg.channel.send("Okay, ich rufe die Funktion `bot.destroy()` auf.")
  bot.destroy();
  bot.login(bot.settings.tokens.discord).then(() => msg.channel.send("Bin wieder da!"))
}
exports.help = {
  name : "restart",
  description: "Restartet den Bot",
  shown: false,
  kategorie: "anderes"
};

