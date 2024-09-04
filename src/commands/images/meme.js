const fetch = require("node-fetch");
const Discord = require('discord.js');
module.exports = async (client, interaction, args) => {
    try {
        const response = await fetch(`https://www.reddit.com/r/memes.json?sort=top&t=week&limit=100`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        const i = Math.floor(Math.random() * json.data.children.length);
        const image = json.data.children[i].data.url;
        const caption = json.data.children[i].data.title;

        const embed = new Discord.EmbedBuilder()
            .setTitle(caption)
            .setImage(image)
            .setColor(client.config.colors.normal)
            .setFooter({ text: `👍 ${json.data.children[i].data.ups} | 💬 ${json.data.children[i].data.num_comments}` });

        interaction.editReply({ embeds: [embed] });
    } catch (error) {
        console.error('Error fetching meme:', error);
        interaction.editReply({ content: 'There was an error trying to fetch a meme. Please try again later.' });
    }
}
