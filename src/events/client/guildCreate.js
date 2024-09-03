const Discord = require('discord.js');

const Functions = require("../../database/models/functions");

module.exports = async (client, guild) => {
  const webhookClient = new Discord.WebhookClient({
    id: client.webhooks.serverLogs.id,
    token: client.webhooks.serverLogs.token,
  });

  if (guild == undefined) return;

  new Functions({
    Guild: guild.id,
    Prefix: client.config.discord.prefix
  }).save();

  try {
    const embed = new Discord.EmbedBuilder()
      .setTitle("🟢・Added to a new server!")
      .addFields(
        { name: "Total servers:", value: `${client.guilds.cache.size}`, inline: true },
        { name: "Server name", value: `${guild.name}`, inline: true },
        { name: "Server ID", value: `${guild.id}`, inline: true },
        { name: "Server members", value: `${guild.memberCount}`, inline: true },
        { name: "Server owner", value: `<@!${guild.ownerId}> (${guild.ownerId})`, inline: true },
      )
      .setThumbnail("https://cdn.discordapp.com/attachments/843487478881976381/852419422392156210/BotPartyEmote.png")
      .setColor(client.config.colors.normal)
    webhookClient.send({
      username: 'Bot Logs',
      avatarURL: client.user.avatarURL(),
      embeds: [embed],
    });


    let defaultChannel = "";
    guild.channels.cache.forEach((channel) => {
      if (channel.type == Discord.ChannelType.GuildText && defaultChannel == "") {
        if (channel.permissionsFor(guild.members.me).has(Discord.PermissionFlagsBits.SendMessages)) {
          defaultChannel = channel;
        }
      }
    })

    client.embed({
      title: "Thanks for inviting the bot!",
      image: "https://cdn.discordapp.com/attachments/1279165137038872638/1280628775767375972/ONeity.jpg",
      fields: [{
        name: "❓┆How to setup?",
        value: 'The default prefix = \`/\` \nTo run setups with Bot run \`/setup\`',
        inline: false,
      },
      {
        name: "☎️┆I need help what now?",
        value: `You can open a ticket in the [ONeity Community](https://discord.com/channels/1161377679145181204/1162806686063529984) and ask the developers`,
        inline: false,
      },
      {
        name: "💻┆What are the commands?",
        value: 'See that list of commands by doing \`/help\`',
        inline: false,
      },
      ],
    }, defaultChannel)
  }
  catch (err) {
    console.log(err);
  }


};