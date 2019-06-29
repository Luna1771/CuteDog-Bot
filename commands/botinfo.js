exports.run = (bot, msg, args) => {
    const dc = require('discord.js');
    const servers = bot.guilds.size;
    const users = bot.users.size;
    const loginname = bot.user.tag;
  
    msg.channel.send(new dc.RichEmbed()
                    .setTitle("Bot-Informationen")
                    .setColor(bot.settings.colors.default)
                    .setFooter(bot.settings.account.footer)
                    .setDescription("Der Bot ist Mitglied von ``" + servers + "`` Servern.\n"+
                                    "Der Bot kennt ``" + users + "`` Nutzer.\n"+
                                    "Der Bot hat sich mit dem Discord-Tag ``" + loginname + "`` eingeloggt."))
    
  
  }
  
  exports.help = {
    name: "botinfo",
    args: "",
    desc: "Zeigt dir Infos über den Bot.",
    show: true
  }