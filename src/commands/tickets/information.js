const Discord = require('discord.js');
const ticketSchema = require("../../database/models/tickets");
const ticketChannels = require("../../database/models/ticketChannels");

module.exports = async (client, interaction, args) => {

    if (interaction.replied || interaction.deferred) {
        return client.errNormal({
            error: "This interaction has already been replied to!",
            type: 'ephemeral'
        }, interaction);
    }

    await interaction.deferReply();

    ticketChannels.findOne({ Guild: interaction.guild.id, channelID: interaction.channel.id }, async (err, ticketData) => {
        if (err) {
            console.error(err);
            return client.errNormal({
                error: "An error occurred while fetching ticket data.",
                type: 'editreply'
            }, interaction);
        }

        if (ticketData) {
            ticketSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                if (err) {
                    console.error(err);
                    return client.errNormal({
                        error: "An error occurred while fetching ticket schema.",
                        type: 'editreply'
                    }, interaction);
                }

                if (data) {
                    const ticketCategory = interaction.guild.channels.cache.get(data.Category);

                    if (!ticketCategory) {
                        return client.errNormal({
                            error: "Do the setup!",
                            type: 'editreply'
                        }, interaction);
                    }

                    if (interaction.channel.parentId === ticketCategory.id) {
                        const msg = await client.embed({
                            desc: `${client.emotes.animated.loading}・Loading information...`,
                            type: 'editreply'
                        }, interaction);

                        try {
                            await client.transcript(interaction, interaction.channel);

                            return client.embed({
                                title: `ℹ・Information`,
                                fields: [
                                    {
                                        name: "Ticket name",
                                        value: `\`${interaction.channel.name}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Channel id",
                                        value: `\`${interaction.channel.id}\``,
                                        inline: true,
                                    },
                                    {
                                        name: "Creator",
                                        value: `<@!${ticketData.creator}>`,
                                        inline: true,
                                    },
                                    {
                                        name: "Claimed by",
                                        value: ticketData.claimed ? `<@!${ticketData.claimed}>` : "Unclaimed",
                                        inline: true,
                                    },
                                    {
                                        name: "Ticket id",
                                        value: `${ticketData.TicketID}`,
                                        inline: true,
                                    },
                                ],
                                type: 'editreply'
                            }, msg);
                        } catch (error) {
                            console.error(error);
                            return client.errNormal({
                                error: "An error occurred while generating the transcript.",
                                type: 'editreply'
                            }, interaction);
                        }

                    } else {
                        client.errNormal({
                            error: "This is not a ticket!",
                            type: 'editreply'
                        }, interaction);
                    }
                } else {
                    return client.errNormal({
                        error: "Do the setup!",
                        type: 'editreply'
                    }, interaction);
                }
            });
        } else {
            client.errNormal({
                error: "This is not a ticket!",
                type: 'editreply'
            }, interaction);
        }
    });
}
