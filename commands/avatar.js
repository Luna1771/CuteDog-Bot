exports.run = (bot, msg, args) => {
  const dc = require('discord.js');
  msg.channel.send("Hier, bitteschön!", { file: new dc.Attachment(msg.author.avatarURL, "Dein Avatar.png")})

}

exports.help = {
  name: "avatar",
  args: "",
  desc: "Sendet dir deinen Avatar.",
  show: true
}