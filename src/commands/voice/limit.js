const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkBotPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageChannels],
        perms: [Discord.PermissionsBitField.Flags.ManageChannels]
    }, interaction);

    if (!perms) {
        console.log('Bot does not have sufficient permissions to manage channels.');
        return;
    }

    let limit = interaction.options.getNumber('limit');
    const channel = interaction.member.voice.channel;

    if (!channel) {
        return client.errNormal({
            error: `You're not in a voice channel!`,
            type: 'editreply'
        }, interaction);
    }

    var checkVoice = await client.checkVoice(interaction.guild, channel);
    if (!checkVoice) {
        console.log(`Failed checkVoice for channel: ${channel.name} (ID: ${channel.id})`);
        return client.errNormal({
            error: `You cannot edit this channel!`,
            type: 'editreply'
        }, interaction);
    }

    try {
        await channel.setUserLimit(limit);
        client.succNormal({
            text: `The channel limit was set to \`${limit}\`!`,
            fields: [
                {
                    name: `📘┆Channel`,
                    value: `${channel} (${channel.name})`
                }
            ],
            type: 'editreply'
        }, interaction);
    } catch (error) {
        console.error(`Failed to set user limit for channel: ${channel.name} (ID: ${channel.id})`, error);
        return client.errNormal({
            error: `There was an error editing the channel!`,
            type: 'editreply'
        }, interaction);
    }
}
