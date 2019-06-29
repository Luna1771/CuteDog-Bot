exports.run = (bot, msg, args) => {
  const dc = require('discord.js')
  if(!msg.guild.voiceConnection) return msg.channel.send("Ich bin nichtmal da!")

  var server = require('./play.js').getServers()[msg.guild.id]
  if(!msg.guild.voiceConnection.channel.members.has(msg.author.id)) return msg.channel.send(new dc.RichEmbed()
                                                                                            .setTitle("Sorry, aber...")
                                                                                            .setDescription("...du bist nicht bei mir.")
                                                                                            .setColor(bot.settings.colors.error))
  if(server.voter.includes(msg.author.id)) return msg.channel.send(new dc.RichEmbed()
                                                                                            .setTitle("Sorry, aber...")
                                                                                            .setDescription("...du hat schon für das Skippen gevotet.")
                                                                                            .setColor(bot.settings.colors.error))
  if(msg.member.permissions.has("MOVE_MEMBERS")){
    if(server.dispatcher) server.dispatcher.end();
    server.votes = 0;
    server.voter = [];
    return;
  }
  server.voter.push(msg.author.id);
  server.votes = server.votes+1;
  if(server.votes+1 > msg.guild.voiceConnection.channel.members.size-1){
    if(server.dispatcher) server.dispatcher.end();
    server.votes = 0;
    server.voter = [];
  }else{
    msg.channel.send(new dc.RichEmbed().setColor(bot.settings.colors.default)
             .setTitle("Skip-Abstimmung")
             .setDescription(`Es fehlen nur noch \`${msg.guild.voiceConnection.channel.members.size-1-server.votes}\` Votes!`))
  }





}
exports.help = {
  name: "skip",
  args: "",
  desc: "Skippt einen Song",
  show: true
};