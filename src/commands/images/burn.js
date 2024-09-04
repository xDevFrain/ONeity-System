const Discord = require('discord.js');
const { Canvas } = require("canvacord");

module.exports = async (client, interaction, args) => {
    try {
        const member = interaction.options.getUser('user');
        
        if (!member) {
            return interaction.editReply({ content: "User not found!", ephemeral: true });
        }

        const userAvatar = member.displayAvatarURL({ dynamic: false, size: 1024, extension: 'png' });
        const lvl = 4;

        // تحقق من أن دالة burn موجودة وتعمل بشكل صحيح
        if (typeof Canvas.burn !== 'function') {
            throw new Error("The 'burn' function is not available in Canvacord.");
        }

        const img = await Canvas.burn(userAvatar, lvl);

        let attach = new Discord.AttachmentBuilder(img, { name: "burn.png" });
        const embed = client.templateEmbed().setImage("attachment://burn.png");

        await interaction.editReply({ files: [attach], embeds: [embed] });

    } catch (error) {
        console.error("Error processing burn command:", error);
        interaction.editReply({ content: "An error occurred while processing the burn effect.", ephemeral: true });
    }
}
