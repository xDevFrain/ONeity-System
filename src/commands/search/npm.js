const Discord = require('discord.js');
const pop = require("popcat-wrapper");

module.exports = async (client, interaction, args) => {
    try {
        const name = interaction.options.getString('name');
        
        const r = await pop.npm(name).catch(e => {
            return client.errNormal({ 
                error: "Package not found!",
                type: 'editreply'
            }, interaction);
        });

        const keywords = Array.isArray(r.keywords) && r.keywords.length > 0 ? r.keywords.join(', ') : 'None';
        
        client.embed({
            title: `📁・${r.name}`,
            fields: [
                {
                    name: "💬┇Name",
                    value: r.name || 'N/A',
                    inline: true,
                },
                {
                    name: "🏷️┇Version",
                    value: r.version || 'N/A',
                    inline: true,
                },
                {
                    name: "📃┇Description",
                    value: r.description || 'No description available.',
                    inline: true,
                },
                {
                    name: "⌨️┇Keywords",
                    value: keywords,
                    inline: true,
                },
                {
                    name: "💻┇Author",
                    value: r.author || 'Unknown',
                    inline: true,
                },
                {
                    name: "📁┇Downloads (This Year)",
                    value: r.downloads_this_year ? r.downloads_this_year.toLocaleString() : 'N/A',
                    inline: true,
                },
                {
                    name: "⏰┇Last Publish",
                    value: r.last_published ? `<t:${Math.round(new Date(r.last_published).getTime() / 1000)}>` : 'N/A',
                    inline: true,
                },
            ],
            type: 'editreply'
        }, interaction);
    } catch (error) {
        return client.errNormal({
            error: `An error occurred: ${error.message}`,
            type: 'editreply'
        }, interaction);
    }
}
