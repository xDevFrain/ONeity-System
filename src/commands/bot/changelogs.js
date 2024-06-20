const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "📃・Changelogs",
        desc: `_____`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
            name: "📃┆Changelogs",
                value: '21/6/2024 Updated dependencies',
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}

 
