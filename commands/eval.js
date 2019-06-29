exports.run = (bot, message, args, command) => {
    const Discord = require('discord.js');
		if(!isInArray(message.author.id, bot.settings.team.memberIDs)) return message.channel.send("Lasse ich dich das ausführen...? Ehh, nope.");
  var embed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setFooter(bot.settings.account.footer)
    var output;
    try{
      output = eval(args.join(' '))
      embed.setColor(bot.settings.colors.default)
      embed.setDescription(`\`${output}\``)
    }
    catch (err) {
      embed.setColor(bot.settings.colors.error)
      embed.setTitle("oopsie!")
      embed.setDescription(`\`${err}\``)
    }

  message.channel.send(embed)
}

exports.help = {
  name: "eval",
  args: "",
  desc: "Ein Debugging Tool für das Bot-Team.",
  show: false
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}