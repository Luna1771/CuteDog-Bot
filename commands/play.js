var dc = require('discord.js')
var servers = {};
const ytdl = require('ytdl-core');
const YouTube = require("discord-youtube-api");
const settings = require("../settings.json");
const youtube = new YouTube(process.env.YTtoken);

function play(connection, msg, bot) {
	var server = servers[msg.guild.id];
	if (!connection) return;
	server.dispatcher = connection.playStream(ytdl(server.queue[0], {
		filter: 'audioonly'
	}))
	server.queue.shift();
	server.dispatcher.on('end', function(reason) {
		setTimeout(async () => {
			server.songTitles.shift();
			if (!server.queue[0]) return connection.disconnect();
			let info = await ytdl.getInfo(server.queue[0]);
			if (server.queue[0]) {
				play(connection, msg, bot)
				msg.channel.send(new dc.RichEmbed()
					.setColor(bot.settings.colors.default)
					.addField('Song bzw. Video:', info.title, false)
					.addField('Von YouTube-Kanal:', info.author.name, true)

					.setThumbnail(info.author.avatar)
					.setImage(info.thumbnail_url))
			} else connection.disconnect();
		}, 2000)
	})
}
exports.run = async (bot, msg, args) => {
	const dis = require("discord.js")
	const playembed = new dis.RichEmbed();
	let connection = undefined;

	var url = args[0];
	if (!args[0])
		return msg.channel.send(new dis.RichEmbed()
			.setColor(bot.settings.colors.error)
			.setDescription(`Du weißt schon, dass ich einen Link oder einen Suchbegriff brauche, oder?`)
      .setFooter("Syntax: ++play <Link oder Suchbegriff>"))

	if (!msg.member.voiceChannel)
		return msg.channel.send(new dis.RichEmbed()
			.setColor(bot.settings.colors.error)
			.setDescription(`Du weißt schon, dass du in einem Voice Channel sein musst, oder?`))

	if (msg.guild.me.voiceChannel && msg.guild.me.voiceChannelID !== msg.member.voiceChannelID)
		return msg.channel.send(new dis.RichEmbed()
			.setColor(bot.settings.colors.error)
			.setDescription(`Du weißt schon, dass du in dem selben Voice Channel wie ich sein musst, oder?`))

	if (!msg.guild.me.voiceChannel)
		try {
			connection = await msg.member.voiceChannel.join()
		} catch (err) {
			return msg.channel.send(new dis.RichEmbed()
				.setColor(bot.settings.colors.error)
				.setTitle("Sorry, aber...")
				.setDescription("Ich kann deinem Channel nicht beitreten. Stelle sicher, dass der Bot über die notwendigen Berechtigungen verfügt."))
		}


	let validate = await ytdl.validateURL(args[0]);
	var sent = await msg.channel.send(new dis.RichEmbed()
		.setColor(bot.settings.colors.default)
		.setDescription(":hourglass: Bitte warte kurz.")).then(s => sent = s);
	if (!validate) {
		const video = await youtube.searchVideos(args.join(' '))
			.catch((err) => {
				return msg.channel.send(new dis.RichEmbed()
					.setColor(bot.settings.colors.error)
          .setTitle("Sorry, aber...")
					.setDescription(`Ich konnte kein YouTube-Video namens \`${args.join(' ')}\` finden.`))
			})
		url = video.url
	}

  if(!url) return;
	let info = await ytdl.getInfo(url).catch(e => sent.edit("Oh, oh. Ein API-Fehler ist aufgetreten. Melde diesen Fehler bitte an Luna#1771.\n\n``"+e));
	// queue
	if (!servers[msg.guild.id]) servers[msg.guild.id] = {
		queue: [],
		songTitles: [],
		votes: 0,
		voter: []
	};
	var server = servers[msg.guild.id];
	server.queue.push(url)
	server.songTitles.push(info.title)

	sent.edit(new dis.RichEmbed()
		.setColor(bot.settings.colors.default)
		.setTitle("Erfolgreich zur Queue hinzugefügt.")
		.addField('Song bzw. Video:', info.title, false)
		.addField('Von YouTube-Kanal:', info.author.name, true)

		.setThumbnail(info.author.avatar)
		.setImage(info.thumbnail_url));


	play(connection, msg, bot, info)




};

exports.help = {
	name: "play",
  args: "<Link oder Suchbegriff>",
	desc: "Spielt Musik ab",
	show: true
};

exports.getServers = () => {
  return servers;
}