const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = async (client, interaction, args) => {
  const duration = moment.duration(client.uptime).format("\`D\` [days], \`H\` [hrs], \`m\` [mins], \`s\` [secs]");

  client.embed({
    title: `ℹ・Bot information`,
    desc: `____________________________`,
    thumbnail: client.user.avatarURL({ size: 1024 }),
    fields: [
      {
        name: "ℹ️┆Information",
        value: `ONeity System Bot enhances member experience by offering quick support, automating tasks, and providing personalized recommendations, making interactions smoother and more efficient., we have a large bot with many options to improve your experience in our server!`,
        inline: false,
      },
      {
        name: "🤖┆Bot name",
        value: `${client.user.username}`,
        inline: true,
      },
      // {
      //   name: "🆔┆Bot id",
      //   value: `${client.user.id}`,
      //   inline: true,
      // },
      {
        name: "🔧┆Bot owner",
        value: `<@!${process.env.OWNER_ID}> `,
        inline: true,
      },
      {
        name: "🔧┆Bot developer",
        value: `<@!721366985031680070> - @5fn`,
        inline: true,
      },
      {
        name: "💻┆Commands",
        value: `\`${client.commands.size}\` commands`,
        inline: true,
      },
      {
        name: "🌐┆Servers",
        value: `\`${client.guilds.cache.size}\` servers`,
        inline: true,
      },
      {
        name: "👥┆Members",
        value: `\`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\` members`,
        inline: true,
      },
      {
        name: "🔊┆Connected channels",
        value: `\`${client.voice.adapters.size}\` channels`,
        inline: true,
      },
      {
        name: "📺┆Channels",
        value: `\`${client.channels.cache.size}\` channels`,
        inline: true,
      },
      {
        name: "📅┆Created",
        value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
        inline: true,
      },
      {
        name: "🆙┆Uptime",
        value: `${duration}`,
        inline: true,
      },
      {
        name: "⌛┆API speed:",
        value: `\`${client.ws.ping}\`ms`,
        inline: true,
      },
      {
        name: "🏷┆Bot Version",
        value: `\`${require(`${process.cwd()}/package.json`).version}\``,
        inline: true,
      },
      {
        name: "🏷┆Node.js Version",
        value: `\`${process.version}\``,
        inline: true,
      },
      {
        name: "📂┆Discord.js Version",
        value: `\`${Discord.version}\``,
        inline: true,
      },
      {
        name: "💾┆Bot memory",
        value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\` MB`,
        inline: true,
      }],
    type: 'editreply'
  }, interaction)

}


