const Discord = require('discord.js');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (client, interaction, args) => {
    try {
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply();
        }

        const question = interaction.options.getString('question');

        if (!question) {
            if (interaction.deferred) {
                return interaction.editReply({
                    content: "Please provide a question for the 8ball.",
                    ephemeral: true
                });
            } else {
                return interaction.reply({
                    content: "Please provide a question for the 8ball.",
                    ephemeral: true
                });
            }
        }

        const gptResponse = await openai.completions.create({
            model: "gpt-4",
            prompt: `You are an 8ball game. Respond to this question with a fun but mysterious answer: "${question}"`,
            max_tokens: 100,
        });

        const answer = gptResponse.choices[0].text.trim();

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

        if (interaction.deferred) {
            await interaction.editReply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
    } catch (error) {
        console.error(error);
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({
                content: "There was an issue fetching the answer. Please try again later!",
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: "There was an issue fetching the answer. Please try again later!",
                ephemeral: true
            });
        }
    }
}
