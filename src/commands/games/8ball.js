const Discord = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (client, interaction, args) => {
    const question = interaction.options.getString('question');

    const gptResponse = await openai.createCompletion({
        model: "gpt-4",
        prompt: `You are an 8ball game. Respond to this question with a fun but mysterious answer: "${question}"`,
        max_tokens: 100,
    }).catch(error => {
        console.error(error);
        return client.errNormal({
            error: "There was an issue fetching the answer. Please try again later!",
            type: 'editreply'
        }, interaction);
    });

    const answer = gptResponse.data.choices[0].text.trim();

    const embed = new Discord.EmbedBuilder()
        .setColor('#5865F2')
        .setTitle(`🎱・8ball Magic Ball`)
        .setDescription(`Here is your answer!`)
        .addFields([
            { name: `❓┇Your Question`, value: `\`\`\`${question}\`\`\``, inline: false },
            { name: `🎱┇Magic Ball's Answer`, value: `\`\`\`${answer}\`\`\``, inline: false }
        ])
        .setFooter({ text: "Enjoy your fortune!", iconURL: client.user.displayAvatarURL() })
        .setTimestamp();

    interaction.editReply({ embeds: [embed] });
}
