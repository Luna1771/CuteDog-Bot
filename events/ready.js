module.exports = (bot) => {
  console.log("Online!")

  const statusList = bot.settings.status.normal.games;

  if(bot.settings.maintenance.status) {
        return bot.user.setPresence({
          game: {
            type: bot.settings.status.maintenance.status,
            name: bot.settings.status.maintenance.game
          },
          status: bot.settings.status.maintenance.lamp
        });
      };

      setPresence(bot);

  const refreshInterval = `${bot.settings.status.refreshinterval}e3`;

  setInterval(() => {
      if(bot.settings.maintenance.status) {
        return bot.user.setPresence({
          game: {
            type: "PLAYING",
            name: bot.settings.status.maintenance.game
          },
          status: "dnd"
        });
      };

      setPresence(bot);
      }, refreshInterval);
}

function setPresence(bot) {
  const statusList = bot.settings.status.normal;
    const index = Math.floor(Math.random() * (statusList.length - 1) + 1);
      bot.user.setPresence({
          game: {
              type: 'WATCHING',
              name: statusList[index]+` | ${bot.settings.account.prefix}help` },
          status: "online"
        })
  }