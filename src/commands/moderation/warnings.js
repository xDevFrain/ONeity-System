const Discord = require('discord.js');
const Schema = require("../../database/models/warnings");

module.exports = async (client, interaction, args) => {
    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
        return client.errNormal({
            error: "You don't have the required permissions to use this command!",
            type: 'editreply'
        }, interaction);
    }

    const member = interaction.options.getUser('user');

    if (!member) {
        return client.errNormal({
            error: "User not found!",
            type: 'editreply'
        }, interaction);
    }

    Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
        if (err) {
            console.error(err);
            return client.errNormal({
                error: "An error occurred while fetching the warnings.",
                type: 'editreply'
            }, interaction);
        }

        if (data && data.Warnings.length > 0) {
            const fields = data.Warnings.map(element => ({
                name: `Warning **${element.Case}**`,
                value: `Reason: ${element.Reason}\nModerator: <@${element.Moderator}>`,
                inline: true
            }));

            client.embed({
                title: `${client.emotes.normal.error}・Warnings`,
                desc: `The warnings of **${member.tag}**`,
                fields: [
                    {
                        name: "Total",
                        value: `${data.Warnings.length}`,
                    },
                    ...fields
                ],
                type: 'editreply'
            }, interaction);
        } else {
            client.embed({
                title: `${client.emotes.normal.error}・Warnings`,
                desc: `User **${member.tag}** has no warnings!`,
                type: 'editreply'
            }, interaction);
        }
    });
};
