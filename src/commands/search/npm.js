const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = async (client, interaction, args) => {
    try {
        const packageName = interaction.options.getString('name');

        const response = await fetch(`https://registry.npmjs.org/${packageName}`);
        if (!response.ok) {
            return client.errNormal({
                error: "Package not found!",
                type: 'editreply'
            }, interaction);
        }

        const data = await response.json();
        const latestVersion = data['dist-tags'].latest;
        const packageInfo = data.versions[latestVersion];

        const downloadsResponse = await fetch(`https://api.npmjs.org/downloads/point/last-year/${packageName}`);
        if (!downloadsResponse.ok) {
            return client.errNormal({
                error: "Unable to fetch download statistics!",
                type: 'editreply'
            }, interaction);
        }

        const downloadsData = await downloadsResponse.json();
        const downloadsCount = downloadsData.downloads || 'N/A';

        const keywords = Array.isArray(packageInfo.keywords) && packageInfo.keywords.length > 0 
            ? packageInfo.keywords.join(', ') 
            : 'None';

        client.embed({
            title: `📁・${packageInfo.name}`,
            fields: [
                {
                    name: "💬┇Name",
                    value: packageInfo.name || 'N/A',
                    inline: true,
                },
                {
                    name: "🏷️┇Version",
                    value: latestVersion || 'N/A',
                    inline: true,
                },
                {
                    name: "📃┇Description",
                    value: packageInfo.description || 'No description available.',
                    inline: true,
                },
                {
                    name: "⌨️┇Keywords",
                    value: keywords,
                    inline: true,
                },
                {
                    name: "💻┇Author",
                    value: packageInfo.author ? packageInfo.author.name : 'Unknown',
                    inline: true,
                },
                {
                    name: "⏰┇Last Publish",
                    value: packageInfo.time ? `<t:${Math.round(new Date(data.time[latestVersion]).getTime() / 1000)}>` : 'N/A',
                    inline: true,
                },
                {
                    name: "📁┇Downloads (Last Year)",
                    value: `${downloadsCount}`,
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
