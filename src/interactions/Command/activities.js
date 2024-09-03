const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('activities')
        .setDescription('Start a activity')
        .addStringOption(option =>
            option.setName('activity')
                .setDescription('The activity that you want')
                .setRequired(true)
                .addChoices(
                    { name: 'Blazing 8s', value: 'blazing' },
                    { name: 'BOPZ-io', value: 'bopz' },
                    { name: 'Bobble Bash', value: 'bobblebash' },
                    { name: 'Bobble League', value: 'bobbleleague' },
                    { name: 'Chef Showdown', value: 'chefshowdown' },
                    { name: 'Checkers in the Park', value: 'checkers' },
                    { name: 'Chess In The Park', value: 'chess' },
                    { name: 'Colonist', value: 'colonist' },
                    { name: 'Color Together', value: 'colortogether' },
                    { name: 'Death by AI', value: 'deathbyai' },
                    { name: 'Farm Merge Valley', value: 'farm' },
                    { name: 'Gartic Phone', value: 'gartic' },
                    { name: 'Goober Dash', value: 'gooberdash' },
                    { name: 'Know What I Meme', value: 'knowwhatimeme' },
                    { name: 'Krunker Strike FRVR', value: 'krunker' },
                    { name: 'Land-io', value: 'land' },
                    { name: 'Letter League', value: 'letterleague' },
                    { name: 'Poker Night', value: 'poker' },
                    { name: 'Putt Party', value: 'puttparty' },
                    { name: 'Rocket Bot Royale', value: 'rocket' },
                    { name: 'Roll20', value: 'roll' },
                    { name: 'Rythm', value: 'rythm' },
                    { name: 'Sketch Heads', value: 'sketchheads' },
                    { name: 'Spell Cast', value: 'spellcast' },
                    { name: 'TuneIn Radio & Podcasts', value: 'tunein' },
                    { name: 'Watch Together', value: 'watchtogether' },
                    { name: 'Whiteboard', value: 'whiteboard' }
                )
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const activity = interaction.options.getString('activity');

        const channel = interaction.member.voice.channel;
        if (!channel) return client.errNormal({ 
            error: `You're not in a voice channel!`, 
            type: 'editreply' 
        }, interaction);

        if (activity == "blazing") {
            client.generateActivity("832025144389533716", "Blazing 8s", channel, interaction)
        }
        else if (activity == "bopz") {
            client.generateActivity("1199817737728442569", "BOPZ-io", channel, interaction)
        }
        else if (activity == "bobblebash") {
            client.generateActivity("1107689944685748377", "Bobble Bash", channel, interaction)
        }
        else if (activity == "bobbleleague") {
            client.generateActivity("947957217959759964", "Bobble League", channel, interaction)
        }
        else if (activity == "chefshowdown") {
            client.generateActivity("1037680572660727838", "Chef Showdown", channel, interaction)
        }
        else if (activity == "Checkers in the Park") {
            client.generateActivity("832013003968348200", "checkers", channel, interaction)
        }
        else if (activity == "Chess In The Park") {
            client.generateActivity("832012774040141894", "chess", channel, interaction)
        }
        else if (activity == "Colonist") {
            client.generateActivity("1106787098452832296", "colonist", channel, interaction)
        }
        else if (activity == "Color Together") {
            client.generateActivity("1039835161136746497", "colortogether", channel, interaction)
        }
        else if (activity == "Death by AI") {
            client.generateActivity("1194351737264406548", "deathbyai", channel, interaction)
        }
        else if (activity == "Farm Merge Valley") {
            client.generateActivity("1187013846746005515", "farm", channel, interaction)
        }
        else if (activity == "Gartic Phone") {
            client.generateActivity("1007373802981822582", "gartic", channel, interaction)
        }
        else if (activity == "Goober Dash") {
            client.generateActivity("1186785228182798556", "gooberdash", channel, interaction)
        }
        else if (activity == "Know What I Meme") {
            client.generateActivity("1078728822972764312", "knowwhatimeme", channel, interaction)
        }
        else if (activity == "Krunker Strike FRVR") {
            client.generateActivity("1011683823555199066", "krunker", channel, interaction)
        }
        else if (activity == "Land-io") {
            client.generateActivity("903769130790969345", "land", channel, interaction)
        }
        else if (activity == "Letter League") {
            client.generateActivity("879863686565621790", "letterleague", channel, interaction)
        }
        else if (activity == "Poker Night") {
            client.generateActivity("755827207812677713", "poker", channel, interaction)
        }
        else if (activity == "Putt Party") {
            client.generateActivity("945737671223947305", "puttparty", channel, interaction)
        }
        else if (activity == "Rocket Bot Royale") {
            client.generateActivity("1186796615432937584", "rocket", channel, interaction)
        }
        else if (activity == "Roll20") {
            client.generateActivity("1199271093882589195", "roll", channel, interaction)
        }
        else if (activity == "Rythm") {
            client.generateActivity("235088799074484224", "rythm", channel, interaction)
        }
        else if (activity == "Sketch Heads") {
            client.generateActivity("902271654783242291", "sketchheads", channel, interaction)
        }
        else if (activity == "Spell Cast") {
            client.generateActivity("852509694341283871", "spellcast", channel, interaction)
        }
        else if (activity == "TuneIn Radio & Podcasts") {
            client.generateActivity("1196535986226745437", "tunein", channel, interaction)
        }
        else if (activity == "Watch Together") {
            client.generateActivity("880218394199220334", "watchtogether", channel, interaction)
        }
        else if (activity == "Whiteboard") {
            client.generateActivity("1070087967294631976", "whiteboard", channel, interaction)
        }
    },
};

 