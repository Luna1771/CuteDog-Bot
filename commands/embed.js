exports.run = (bot, message, args, command) => {
  const Discord = require('discord.js');
  if(args.join(' ') == "") return message.channel.send(new Discord.RichEmbed()
                                                                      .setTitle("Du hast die Argumente vergessen!")
                                                                      .setDescription("Deswegen siehst du hier eine Auflistung aller verfügbaren Argumente.")
                                                                      .setColor(bot.settings.colors.error)
                                                                      .addField("--title <Text>", "Setzt den Titel.", true)
                                                                      .addField("--description <Text>", "Setzt die Beschreibung.", true)
                                                                      .addField("--color <Hexadezimal-Farbcode>", "Setzt die Embed-Farbe.", true)
                                                                      .addField("--footer <Text>", "Setzt die Fußzeile.", true)
                                                                      .addField("--image <Bild-URL>", "Setzt ein Bild.", true)
                                                                      .setFooter(bot.settings.account.footer))

  function findArgs(str, toFind) {
   try{
      return str.split("--"+toFind+" ")[1].split(" --")[0]
   }catch(e){
      return;
   }
}

  //var title = findArgs(args.join(' '), 'title')
  //var description = findArgs(args.join(' '), 'description')
  //if(!title && !description) return message.channel.send("Du musst schon angeben, was du senden willst!");
  const custembed = new Discord.RichEmbed()
  if(findArgs(args.join(' '), 'title') != undefined) custembed.setTitle(findArgs(args.join(' '), 'title'))
  if(findArgs(args.join(' '), 'description') != undefined) custembed.setDescription(findArgs(args.join(' '), 'description'));
  if(findArgs(args.join(' '), 'color') != undefined) custembed.setColor(findArgs(args.join(' '), 'color'))
  if(findArgs(args.join(' '), 'footer') != undefined) custembed.setFooter(findArgs(args.join(' '), 'footer'))
  if(findArgs(args.join(' '), 'image') != undefined) custembed.setImage(findArgs(args.join(' '), 'image'));
  message.channel.send(custembed);


}

exports.help = {
  name: "embed",
  args: "--title, --description, --color, --footer, --image",
  desc: "Baue deine eigenen Embeds.",
  show: true
}
