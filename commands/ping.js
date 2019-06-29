exports.run = async (bot, message, args) => {
  const dc = new require('discord.js');
  const RichEmbed = require('discord.js');
  const m = await message.channel.send(new dc.RichEmbed()
				.setTitle("Ping?")
				.setColor(0x0088ff)
				.setDescription(":thinking:")
        .setFooter(bot.settings.account.footer)).then(function(sentmessage){
    sentmessage.edit(new dc.RichEmbed()
				.setTitle("Ping?")
				.setColor(0x0088ff)
        .setDescription("Pong! :ping_pong:")
        .setFooter(bot.settings.account.footer)
        .addField("Dein Ping:", `${sentmessage.createdTimestamp - message.createdTimestamp}ms`, true)
        .addField("Mein Ping:", `${Math.round(bot.ping)}ms`, true));});

}

exports.help = {
 name: "ping",
 args: "",
 desc: "Wie schnell reagiert dein Internet?",
 show: true
}