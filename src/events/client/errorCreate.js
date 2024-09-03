const { WebhookClient, EmbedBuilder } = require('discord.js');
const generator = require('generate-password');

module.exports = (client, err, command, interaction) => {
    console.error(err);

    const password = generator.generate({
        length: 10,
        numbers: true,
    });

    const errorlog = new WebhookClient({
        id: client.webhooks.errorLogs.id,
        token: client.webhooks.errorLogs.token,
    });

    const embed = new EmbedBuilder()
        .setTitle(`🚨・${password}`)
        .addFields(
            { name: "✅┇Guild", value: `${interaction.guild.name} (${interaction.guild.id})` },
            { name: "💻┇Command", value: `${command}` },
            { name: "💬┇Error", value: `\`\`\`${err}\`\`\`` },
            { name: "📃┇Stack error", value: `\`\`\`${err.stack?.substr(0, 1018) || 'No stack trace available'}\`\`\`` }
        )
        .setColor(client.config.colors.normal);

    errorlog.send({
        username: 'Bot errors',
        embeds: [embed],
    }).catch(error => console.error(error));

    client.embed({
        title: `${client.emotes.normal.error}・Error`,
        desc: 'There was an error executing this command',
        color: client.config.colors.error,
        fields: [
            {
                name: 'Error code',
                value: `\`${password}\``,
                inline: true,
            },
            {
                name: 'What now?',
                value: 'You can contact the developers by opening a ticket on the ONeity Community server',
                inline: true,
            }
        ],
        type: 'editreply'
    }, interaction).catch(() => {
        client.embed({
            title: `${client.emotes.normal.error}・Error`,
            desc: 'There was an error executing this command',
            color: client.config.colors.error,
            fields: [
                {
                    name: 'Error code',
                    value: `\`${password}\``,
                    inline: true,
                },
                {
                    name: 'What now?',
                    value: 'You can contact the developers by joining the support server',
                    inline: true,
                }
            ],
            type: 'editreply'
        }, interaction);
    });
};
