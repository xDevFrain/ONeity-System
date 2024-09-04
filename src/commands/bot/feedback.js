const Discord = require('discord.js');

const webhookClient = new Discord.WebhookClient({
    id: "1163553267993813063",
    token: "um440YKQZFVl9k9EVuXXG8R1uK5ssgLJuXiEaspa6dMfagul912Td1d-PAJnEyszyBGk",
});

module.exports = async (client, interaction, args) => {
    const feedback = interaction.options.getString('feedback');

    const embed = new Discord.EmbedBuilder()
        .setTitle(`📝・New feedback!`)
        .addFields(
            { name: "User", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
        )
        .setDescription(`${feedback}`)
        .setColor(client.config.colors.normal)
    webhookClient.send({
        username: 'Bot Feedback',
        embeds: [embed],
    });

    client.succNormal({ 
        text: `Feedback successfully sent to the developers`,
        type: 'editreply'
    }, interaction);
}

 