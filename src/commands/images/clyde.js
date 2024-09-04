const { Canvas } = require("canvacord");
const Discord = require("discord.js");

module.exports = async (client, interaction, args) => {
    try {
        const clydeMessage = interaction.options.getString('text');

        if (!clydeMessage) {
            return interaction.editReply({
                content: '⚠️ You need to provide text for this command to work.',
                ephemeral: true
            });
        }

        const image = await Canvas.clyde(clydeMessage);

        if (!image) {
            return interaction.editReply({
                content: '⚠️ An error occurred while generating the image. Please try again later.',
                ephemeral: true
            });
        }

        const attachment = new Discord.AttachmentBuilder(image, { name: "clyde.png" });

        const embed = client.templateEmbed().setImage("attachment://clyde.png");
        interaction.editReply({ files: [attachment], embeds: [embed] });

    } catch (error) {
        console.error('Error generating Clyde image:', error);
        interaction.editReply({
            content: '⚠️ An unexpected error occurred. Please try again later.',
            ephemeral: true
        });
    }
}
