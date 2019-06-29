exports.run = (bot, message, args) => {
  const Discord = require('discord.js')
  message.author.send(new Discord.RichEmbed()
                                  .setTitle("Here ya go!")
                                  .setDescription("Hier hast du die Invites, die du gebrauchen könntest:\n"+
                                                  "Hier ist der [Bot-Invite](https://discordapp.com/api/oauth2/authorize?client_id=516710113529167882&permissions=8&scope=bot) und hier der [Support-Discord](https://discord.gg/X3dCvD4).")
                                  .setColor(bot.settings.colors.default))
  message.channel.send(":postbox: In den PMs!\n"+
                       "Nicht empfangen? Stelle sicher, dass du Direktnachrichten auf diesem Server aktiviert hast!")
}

exports.help = {
 name: "invite",
 args: "",
 desc: "Sendet dir ein paar Invites.",
 show: true
}