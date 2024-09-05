const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = async (client, interaction, args) => {
    try {
        if (!interaction.deferred && !interaction.replied) {
            await interaction.deferReply({ ephemeral: true });
        }

        const packageName = interaction.options.getString('name');

        const response = await fetch(`https://registry.npmjs.org/${packageName}`);
        if (!response.ok) {
            if (!interaction.replied) {
                return await interaction.editReply({
                    content: "Package not found!"
                });
            }
            return;
        }

        const data = await response.json();
        const latestVersion = data['dist-tags'].latest;
        const packageInfo = data.versions[latestVersion];

        let author = 'Unknown';
        if (packageInfo.author) {
            if (typeof packageInfo.author === 'string') {
                author = packageInfo.author;
            } else if (packageInfo.author.name) {
                author = packageInfo.author.name;
            }
        }

        const lastPublishTime = data.time && data.time[latestVersion] 
            ? `<t:${Math.round(new Date(data.time[latestVersion]).getTime() / 1000)}:F>` 
            : 'N/A';

        const downloadsResponse = await fetch(`https://api.npmjs.org/downloads/point/last-year/${packageName}`);
        if (!downloadsResponse.ok) {
            if (!interaction.replied) {
                return await interaction.editReply({
                    content: "Unable to fetch download statistics!"
                });
            }
            return;
        }

        const downloadsData = await downloadsResponse.json();
        const downloadsCount = downloadsData.downloads ? downloadsData.downloads.toLocaleString() : 'N/A';

        const keywords = Array.isArray(packageInfo.keywords) && packageInfo.keywords.length > 0 
            ? packageInfo.keywords.join(', ') 
            : 'None';

        const embed = new EmbedBuilder()
            .setTitle(`📁・${packageInfo.name}`)
            .addFields(
                { name: "💬┇Name", value: packageInfo.name || 'N/A', inline: true },
                { name: "🏷️┇Version", value: latestVersion || 'N/A', inline: true },
                { name: "📃┇Description", value: packageInfo.description || 'No description available.', inline: true },
                { name: "⌨️┇Keywords", value: keywords, inline: true },
                { name: "💻┇Author", value: author, inline: true },
                { name: "⏰┇Last Publish", value: lastPublishTime, inline: true },
                { name: "📁┇Downloads (Last Year)", value: downloadsCount, inline: true },
            );

        if (!interaction.replied) {
            await interaction.editReply({ embeds: [embed] });
        }
    } catch (error) {
        if (!interaction.replied) {
            await interaction.editReply({
                content: `An error occurred: ${error.message}`
            });
        }
    }
};
