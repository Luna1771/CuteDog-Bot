exports.run = (bot, message, args) => {
  const dc = require('discord.js');
  var longstring = "";
  const embed = new dc.RichEmbed()
                      .setTitle("Hilfe.")
                      .setDescription("Du brauchst Hilfe? Hier, bitteschön:")
                      .setColor(bot.settings.colors.default)
                      .setFooter(bot.settings.account.footer)

  bot.commands.tap(function(cmd){
                     if(cmd.help.show){longstring += "`"+`${cmd.help.name}`+"` - "+ `${cmd.help.desc}\n`}
  })

  embed.addField("Befehle:", longstring);
  embed.addField("Credits:", "Dies ist der Nachfolger des Kätchen Bots.\nErstellt von: Luna\nHelfer: Noch keine. :(");
  message.channel.send(embed);
}
// GG // ich wollte die Auswahl entfernen und was seh ich? Deinen Kommentar.
// ez rickroll
exports.help = {
  name: "help",
  args: "",
  desc: "Zeigt dir alle Befehle.",
  show: true
}