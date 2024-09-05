const Discord = require('discord.js');
const Schema = require("../../database/models/reminder");
const ms = require("ms");

module.exports = async (client, interaction, args) => {
    const time = interaction.options.getString('time');
    const text = interaction.options.getString('message');

    if (!interaction.replied && !interaction.deferred) {
        await interaction.deferReply({ ephemeral: true });
    }

    const timeInMs = ms(time);
    if (!timeInMs || timeInMs <= 0) {
        return client.errNormal({ 
            error: "Invalid time format! Please use formats like '10m', '1h', etc.", 
            type: 'editreply' 
        }, interaction);
    }

    const endtime = Date.now() + timeInMs;

    Schema.findOne({ Text: text, User: interaction.user.id }, async (err, data) => {
        if (err) {
            console.error(err);
            return client.errNormal({ 
                error: "An error occurred while accessing the database.", 
                type: 'editreply' 
            }, interaction);
        }

        if (data) {
            return client.errNormal({ 
                error: `You already made this reminder!`, 
                type: 'editreply' 
            }, interaction);
        } else {
            await new Schema({
                Text: text,
                User: interaction.user.id,
                endTime: endtime
            }).save();

            return client.succNormal({
                text: `Your reminder is set!`,
                fields: [
                    {
                        name: `${client.emotes.normal.clock}┇End Time`,
                        value: `${new Date(endtime).toLocaleString()}`,
                        inline: true,
                    },
                    {
                        name: `💭┇Reminder`,
                        value: `${text}`,
                        inline: true,
                    }
                ],
                type: 'editreply'
            }, interaction);
        }
    });

    setTimeout(async () => {
        client.embed({
            title: `🔔・Reminder`,
            desc: `Your reminder just ended!`,
            fields: [
                {
                    name: `💭┇Reminder`,
                    value: `${text}`,
                    inline: true,
                }
            ],
        }, interaction.user);

        await Schema.findOneAndDelete({ Text: text, User: interaction.user.id });
    }, timeInMs);
};
