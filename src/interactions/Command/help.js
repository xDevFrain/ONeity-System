const { Client, CommandInteraction, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with the bot'),

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const toUpperCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);
        const getCommandDescription = (name) => {
            const mentions = client.getSlashMentions(name); // array of [mention, description]
            return mentions.map(cmd => `${cmd[0]} - \`${cmd[1]}\``).join("\n");
        }

        const embeds = [];
        let currentPage = 0;

        const helpEmbed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username}\'s Help Menu`, iconURL: client.user.displayAvatarURL({ format: "png" }) })
            .setImage(`https://i.stack.imgur.com/Fzh0w.png`)
            .setColor(`#5865F2`)
            .addFields([
                { name: "Categories [1-9]", value: `>>> 🚫┆AFK\n📣┆Announcement\n👮‍♂️┆Auto mod\n⚙️┆Auto setup\n🎂┆Birthday\n🤖┆Bot\n🎰┆Casino\n⚙┆Configuration\n💻┆CustomCommand`, inline: true },
                { name: "Categories [19-27]", value: `>>> 🆙┆Leveling\n💬┆Messages\n👔┆Moderation\n🎶┆Music\n📓┆Notepad\n👤┆Profile\n📻┆Radio\n😛┆Reaction Role\n🔍┆Search`, inline: true },
                { name: "\u200b", value: "\u200b", inline: true },
                { name: "Categories [10-18]", value: `>>> 💳┆Dcredits\n💰┆Economy\n👪┆Family\n😂┆Fun\n🎮┆Games\n🥳┆Giveaway\n⚙️┆Guild\n🖼┆Images\n📨┆Invites`, inline: true },
                { name: "Categories Part [28-36]", value: `>>> 📊┆Server stats\n⚙️┆Setup\n🎛┆Soundboard\n🗨️┆StickyMessage\n💡┆Suggestions\n🤝┆Thanks\n🎫┆Tickets\n⚒️┆Tools\n🔊┆Voice`, inline: true },
                { name: "\u200b", value: "\u200b", inline: true },
            ]);

        const startButton = new ButtonBuilder().setStyle(2).setEmoji(`⏮️`).setCustomId('start').setDisabled(true);
        const backButton = new ButtonBuilder().setStyle(2).setEmoji(`⬅️`).setCustomId('back').setDisabled(true);
        const forwardButton = new ButtonBuilder().setStyle(2).setEmoji(`➡️`).setCustomId('forward').setDisabled(false);
        const endButton = new ButtonBuilder().setStyle(2).setEmoji(`⏭️`).setCustomId('end').setDisabled(false);
        const linkButton = new ButtonBuilder().setStyle(5).setLabel("Subscribe!").setEmoji(`🥹`).setURL('https://www.youtube.com/channel/UC2fwRvYGIPUry_i3XLbTCkg');

        const options1 = [{ label: 'Overview', value: '0' }];
        const options2 = [];

        require("fs").readdirSync(`${process.cwd()}/src/commands`).slice(0, 24).forEach((dir, index) => {
            options1.push({ label: toUpperCase(dir.replace("-", " ")), value: `${index + 1}` });
        });

        require("fs").readdirSync(`${process.cwd()}/src/commands`).slice(25, 37).forEach((dir, index) => {
            options2.push({ label: toUpperCase(dir.replace("-", " ")), value: `${index + 25}` });
        });

        const menu1 = new StringSelectMenuBuilder().setPlaceholder('Change page').setCustomId('pagMenu').addOptions(options1).setMaxValues(1).setMinValues(1);
        const menu2 = new StringSelectMenuBuilder().setPlaceholder('Change page').setCustomId('pagMenu2').addOptions(options2).setMaxValues(1).setMinValues(1);

        let groupButtons = new ActionRowBuilder().addComponents([startButton, backButton, forwardButton, endButton, linkButton]);
        const groupMenu1 = new ActionRowBuilder().addComponents(menu1);
        const groupMenu2 = new ActionRowBuilder().addComponents(menu2);

        const components = [groupButtons, groupMenu1, groupMenu2];

        let helpMessage = await interaction.reply({
            content: `Click on the buttons to change page`,
            embeds: [helpEmbed],
            components: components,
        });

        const collector = helpMessage.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id,
            time: 60e3
        });

        require("fs").readdirSync(`${process.cwd()}/src/commands`).forEach((dir) => {
            const embed = new EmbedBuilder()
                .setAuthor({ name: toUpperCase(dir), iconURL: client.user.displayAvatarURL({ format: "png" }), url: 'https://dsc.gg/uoaio' })
                .setDescription(getCommandDescription(dir))
                .setColor("#5865F2")
                .setImage(`https://i.stack.imgur.com/Fzh0w.png`)
                .setFooter({ text: `Page ${embeds.length + 1} / ${embeds.length}`, iconURL: client.user.displayAvatarURL() });
            embeds.push(embed);
        });

        const updateGroupButtons = () => {
            if (currentPage === 0) {
                groupButtons = new ActionRowBuilder().addComponents([
                    startButton.setDisabled(true),
                    backButton.setDisabled(true),
                    forwardButton.setDisabled(false),
                    endButton.setDisabled(false)
                ]);
            } else if (currentPage === embeds.length - 1) {
                groupButtons = new ActionRowBuilder().addComponents([
                    startButton.setDisabled(false),
                    backButton.setDisabled(false),
                    forwardButton.setDisabled(true),
                    endButton.setDisabled(true)
                ]);
            } else {
                groupButtons = new ActionRowBuilder().addComponents([
                    startButton.setDisabled(false),
                    backButton.setDisabled(false),
                    forwardButton.setDisabled(false),
                    endButton.setDisabled(false)
                ]);
            }
        };

        collector.on('collect', async (b) => {
            if (b.user.id !== interaction.user.id) {
                return b.reply({
                    content: `**You Can't Use it**`,
                    ephemeral: true
                });
            }

            switch (b.customId) {
                case 'start':
                    currentPage = 0;
                    updateGroupButtons();
                    b.update({ embeds: [embeds[currentPage]], components: components });
                    break;
                case 'back':
                    currentPage--;
                    updateGroupButtons();
                    b.update({ embeds: [embeds[currentPage]], components: components });
                    break;
                case 'forward':
                    currentPage++;
                    updateGroupButtons();
                    b.update({ embeds: [embeds[currentPage]], components: components });
                    break;
                case 'end':
                    currentPage = embeds.length - 1;
                    updateGroupButtons();
                    b.update({ embeds: [embeds[currentPage]], components: components });
                    break;
                case 'pagMenu':
                case 'pagMenu2':
                    currentPage = parseInt(b.values[0]);
                    updateGroupButtons();
                    b.update({ embeds: [embeds[currentPage]], components: components });
                    break;
                default:
                    currentPage = 0;
                    b.update({ embeds: [embeds[currentPage]], components: null });
                    break;
            }
        });

        collector.on('end', () => {
            helpMessage.edit({ embeds: [helpMessage.embeds[0]], content: [], components: [] });
        });

        collector.on('error', (e) => console.log(e));
    },
};
