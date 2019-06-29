exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  const volume = parseInt(args[0])
  if(!msg.member.voiceChannel) return msg.channel.send(new dc.RichEmbed()
  .setColor(bot.settings.colors.error)
  .setDescription(`Bist du auch in einem Voice-Channel?`))

  if(msg.guild.me.voiceChannelID !== msg.member.voiceChannelID) return msg.channel.send(new dc.RichEmbed()
  .setColor(bot.settings.colors.error)
  .setDescription(`Du bist in dem falschen Voice-Channel. Such mich.`))
  if(!volume) return msg.channel.send(new dc.RichEmbed()
  .setColor(bot.settings.colors.error)
  .setTitle("Sorry, aber...")
  .setDescription("Wie laut soll es denn sein?")
  .setFooter("Argument fehlte. | Syntax: "+bot.settings.account.prefix+"volume [15-500]"))
  //if(!isInArray(msg.author.id, bot.settings.team.memberIDs)) {
  if(volume > "500") return msg.channel.send(new dc.RichEmbed()
  .setColor(bot.settings.colors.error)
  .setTitle("\"Wait. That's illegal.\"")
  .setThumbnail("https://cdn.glitch.com/7f9408cf-3471-44f7-b543-9d7eff5d3710%2Fimage.png?1558022242414")
  .setDescription("Das ist zu laut!")
  .setFooter("Wert über 500. | Syntax: "+bot.settings.account.prefix+"volume [15-500]"))

  if(volume < "15") return msg.channel.send(new dc.RichEmbed()
  .setColor(bot.settings.colors.error)
  .setTitle("*flüster flüster*")
  .setDescription("Hörst du mich noch oder muss ich lauter singen?")
  .setFooter("Wert unter 15. | Syntax: "+bot.settings.account.prefix+"volume [15-500]"))
  //}
  const server = require('./play.js').getServers()[msg.guild.id]
  if(!msg.guild.voiceConnection) return msg.channel.send(new dc.RichEmbed()
  .setColor(bot.settings.colors.error)
  .setDescription(`Ich bin hier ja in keinem Voice-Channel!`))
  server.dispatcher.setVolume(volume/100);
  msg.channel.send(new dc.RichEmbed()
  .setColor(bot.settings.colors.default)
  .setTitle("Erfolgreich!")
  .setDescription(`Die Lautstärke ist nun auf \`${volume}%\` eingestellt.`))

};

exports.help = {
 name: "volume",
 args: "[15-500]",
 desc: "Ändert die Lautstärke.",
 show: true
}


function isInArray(value, array) {
  return array.indexOf(value) > -1;
}