const Discord = require('discord.js');
const { Canvas } = require("canvacord");

module.exports = async (client, interaction, args) => {
    try {
        const member = interaction.options.getUser('user');
        const userAvatar = member.displayAvatarURL({ dynamic: false, size: 1024, extension: 'png' });

        const image = await Canvas.color(userAvatar, "#ff0000");
        let attach = new Discord.AttachmentBuilder(image, { name: "colorify.png" });

        const embed = client.templateEmbed().setImage("attachment://colorify.png");
        interaction.editReply({ files: [attach], embeds: [embed] });
    } catch (error) {
        console.error('Error processing image:', error);
        interaction.editReply({ content: 'There was an error trying to process the image. Please try again later.' });
    }
}
