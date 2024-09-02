const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const fs = require("fs");

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
        const commad = (name) => {
            const mentions = client.getSlashMentions(name); // array of [mention, description]
            return mentions.map(cmd => `${cmd[0]} - \`${cmd[1]}\``).join("\n");
        }

        let em1 = new EmbedBuilder()
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

        let startButton = new ButtonBuilder().setStyle(2).setEmoji(`⏮️`).setCustomId('start'),
            backButton = new ButtonBuilder().setStyle(2).setEmoji(`⬅️`).setCustomId('back'),
            forwardButton = new ButtonBuilder().setStyle(2).setEmoji(`➡️`).setCustomId('forward'),
            endButton = new ButtonBuilder().setStyle(2).setEmoji(`⏭️`).setCustomId('end'),
            link = new ButtonBuilder().setStyle(5).setLabel("Subscribe!").setEmoji(`🥹`).setURL('https://www.youtube.com/channel/UC2fwRvYGIPUry_i3XLbTCkg');

        const options = [{ label: 'Overview', value: '0' }];
        const options2 = [];

        let counter = 0;
        let counter2 = 25;
        fs.readdirSync(`${process.cwd()}/src/commands`).slice(0, 24).forEach(dirs => {
            counter++;
            const opt = {
                label: toUpperCase(dirs.replace("-", " ")),
                value: `${counter}`
            };
            options.push(opt);
        });
        fs.readdirSync(`${process.cwd()}/src/commands`).slice(25, 37).forEach(dirs => {
            counter2++;
            const opt = {
                label: toUpperCase(dirs.replace("-", " ")),
                value: `${counter2}`
            };
            options2.push(opt);
        });

        let menu = new StringSelectMenuBuilder().setPlaceholder('Change page').setCustomId('pagMenu').addOptions(options).setMaxValues(1).setMinValues(1),
            menu2 = new StringSelectMenuBuilder().setPlaceholder('Change page').setCustomId('pagMenu2').addOptions(options2).setMaxValues(1).setMinValues(1);

        const allButtons = [startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false), link];

        let group1 = new ActionRowBuilder().addComponents(menu);
        let group2 = new ActionRowBuilder().addComponents(allButtons);
        let group3 = new ActionRowBuilder().addComponents(menu2);

        const components = [group2, group1, group3];

        let helpMessage = await interaction.reply({
            content: `Click on the buttons to change page`,
            embeds: [em1],
            components: components,
        });

        const collector = helpMessage.createMessageComponentCollector((button) => button.user.id === interaction.user.id, { time: 60e3 });

        var embeds = [em1];
        fs.readdirSync(`${process.cwd()}/src/commands`).forEach(dirs => {
            embeds.push(new EmbedBuilder().setAuthor({ name: toUpperCase(dirs), iconURL: client.user.displayAvatarURL({ format: "png" }), url: `https://dsc.gg/uoaio` }).setDescription(`${commad(dirs)}`));
        });

        let currentPage = 0;

        collector.on('collect', async (b) => {
            if (b.user.id !== interaction.user.id) {
                return b.reply({
                    content: `**You Can't Use it\n**`,
                    ephemeral: true
                });
            }

            switch (b.customId) {
                case 'start':
                    currentPage = 0;
                    group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]);
                    break;
                case 'back':
                    if (currentPage > 0) currentPage--;
                    group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(currentPage === 0), backButton.setDisabled(currentPage === 0), forwardButton.setDisabled(false), endButton.setDisabled(false)]);
                    break;
                case 'forward':
                    if (currentPage < embeds.length - 1) currentPage++;
                    group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(currentPage === embeds.length - 1), endButton.setDisabled(currentPage === embeds.length - 1)]);
                    break;
                case 'end':
                    currentPage = embeds.length - 1;
                    group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(true), endButton.setDisabled(true)]);
                    break;
                case 'pagMenu':
                case 'pagMenu2':
                    if (b.values && b.values.length > 0) {
                        currentPage = parseInt(b.values[0], 10);
                        currentPage = Math.max(0, Math.min(currentPage, embeds.length - 1)); // Ensure the page is within bounds
                    }
                    group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(currentPage === 0), backButton.setDisabled(currentPage === 0), forwardButton.setDisabled(currentPage === embeds.length - 1), endButton.setDisabled(currentPage === embeds.length - 1)]);
                    break;
                default:
                    currentPage = 0;
                    group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]);
                    break;
            }
            b.update({ embeds: [embeds[currentPage]], components: [group2, group1, group3] });
        });

        collector.on('end', b => {
            b.update({ embeds: [helpMessage.embeds[0]], content: [], components: [] });
        });

        collector.on('error', (e) => console.log(e));

        embeds.forEach((embed, index) => {
            embed.setColor("#5865F2").setImage(`https://i.stack.imgur.com/Fzh0w.png`)
                .setFooter({ text: `Page ${index + 1} / ${embeds.length}`, iconURL: client.user.displayAvatarURL() });
        });
    },
};
