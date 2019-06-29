module.exports = (bot, message) => {
  const prefix = bot.settings.account.prefix;
  const Discord = require('discord.js');

  if(message.author.id === bot.user.id) return;
  if(bot.settings.maintenance.status && !bot.settings.team.memberIDs.some(e=>e === message.author.id)) return;
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  const botbans = bot.settings.users.botbans;
  if(botbans.some(e=>e === message.author.id)) return message.channel.send(new Discord.RichEmbed()
                                                                                      .setTitle("Sorry, aber...")
                                                                                      .setDescription("...du wurdest aus der Nutzung des Bots ausgeschlossen.")
                                                                                      .setColor(bot.settings.colors.error)
                                                                                      .addField("Wie du den Bot-Ban loswirst:", "Schreibe Luna#1771 an oder gehe auf den [Support-Server](), um nach einer Entbannung bei diesem Bot erfragen zu können.")
                                                                                      .setFooter(bot.settings.account.footer));

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = bot.commands.get(command);
  if(!cmd) {return;}
  console.log(`[CMD][MESSAGE] ${message.author.username}: ${command} ${args.join(' ')}`);

  cmd.run(bot, message, args);
}