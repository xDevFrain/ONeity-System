const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = async (client, interaction, args) => {
    try {
        let countries = interaction.options.getString('country');

        if (!countries) {
            return client.errNormal({ error: `Please provide a valid country!`, type: 'editreply' }, interaction);
        }

        const response = await fetch(`https://covid19.mathdro.id/api/countries/${encodeURIComponent(countries)}`);
        
        if (!response.ok) {
            throw new Error(`Invalid country or data not available!`);
        }

        const data = await response.json();

        if (!data.confirmed || !data.recovered || !data.deaths) {
            throw new Error('Incomplete data received from the API');
        }

        let confirmed = data.confirmed.value.toLocaleString();
        let recovered = data.recovered.value.toLocaleString();
        let deaths = data.deaths.value.toLocaleString();

        return client.embed({
            title: `💉・COVID-19 Statistics - ${countries}`,
            fields: [
                {
                    name: "✅┇Confirmed Cases",
                    value: `${confirmed}`,
                    inline: true,
                },
                {
                    name: "🤗┇Recovered",
                    value: `${recovered}`,
                    inline: true,
                },
                {
                    name: "💀┇Deaths",
                    value: `${deaths}`,
                    inline: true,
                },
            ],
            type: 'editreply'
        }, interaction);
        
    } catch (error) {
        return client.errNormal({ error: `Error: ${error.message}`, type: 'editreply' }, interaction);
    }
}
