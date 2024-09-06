const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: "📃・Changelogs",
        desc: `_____`,
        thumbnail: client.user.avatarURL({ size: 1024 }),
        fields: [{
            name: "📃┆Changelogs",
                value: `- 6/9/2024 Updated dependencies\n- New Activities\n- Unnecessary commands removed\n- Some commands rearranged\n- Better error handling for commands`,
                inline: false,
            },
        ],
        type: 'editreply'
    }, interaction)
}

 
