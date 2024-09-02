const { CommandInteraction, Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const fs = require("fs");

module.exports = {
    data: new Discord.SlashCommandBuilder()
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

        const em1 = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username}\'s Help Menu`, iconURL: client.user.displayAvatarURL({ format: "png" }) })
            .setImage(`https://i.stack.imgur.com/Fzh0w.png`)
            .setColor(`#5865F2`)
            .addFields([
                {
                    name: "Categories [1-9]",
                    value: `>>> 🚫┆AFK
                    📣┆Announcement
                    👮‍♂️┆Auto mod
                    ⚙️┆Auto setup
                    🎂┆Birthday
                    🤖┆Bot
                    🎰┆Casino
                    ⚙┆Configuration
                    💻┆CustomCommand`,
                    inline: true
                },
                {
                    name: "Categories [19-27]",
                    value: `>>> 🆙┆Leveling
                    💬┆Messages
                    👔┆Moderation
                    🎶┆Music
                    📓┆Notepad
                    👤┆Profile
                    📻┆Radio
                    😛┆Reaction Role
                    🔍┆Search`,
                    inline: true
                },
                {
                    name: "\u200b",
                    value: "\u200b",
                    inline: true
                },
                {
                    name: "Categories [10-18]",
                    value: `>>> 💳┆Dcredits
                      💰┆Economy
                      👪┆Family
                      😂┆Fun
                      🎮┆Games
                      🥳┆Giveaway
                      ⚙️┆Guild
                      🖼┆Images
                      📨┆Invites`,
                    inline: true
                },
                {
                    name: "Categories Part [28-36]",
                    value: `>>> 📊┆Server stats
                    ⚙️┆Setup
                    🎛┆Soundboard
                    🗨️┆StickyMessage
                    💡┆Suggestions
                    🤝┆Thanks
                    🎫┆Tickets
                    ⚒️┆Tools
                    🔊┆Voice`,
                    inline: true
                },
                {
                    name: "\u200b",
                    value: "\u200b",
                    inline: true
                },
            ]);

        const startButton = new ButtonBuilder().setStyle(2).setEmoji(`⏮️`).setCustomId('start'),
            backButton = new ButtonBuilder().setStyle(2).setEmoji(`⬅️`).setCustomId('back'),
            forwardButton = new ButtonBuilder().setStyle(2).setEmoji(`➡️`).setCustomId('forward'),
            endButton = new ButtonBuilder().setStyle(2).setEmoji(`⏭️`).setCustomId('end'),
            linkButton = new ButtonBuilder().setStyle(5).setLabel("Subscribe!").setEmoji(`🥹`).setURL('https://www.youtube.com/channel/UC2fwRvYGIPUry_i3XLbTCkg');

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

        const menu = new StringSelectMenuBuilder()
            .setPlaceholder('Change page')
            .setCustomId('pagMenu')
            .addOptions(options)
            .setMaxValues(1)
            .setMinValues(1);

        const menu2 = new StringSelectMenuBuilder()
            .setPlaceholder('Change page')
            .setCustomId('pagMenu2')
            .addOptions(options2)
            .setMaxValues(1)
            .setMinValues(1);

        const allButtons = [
            startButton.setDisabled(true),
            backButton.setDisabled(true),
            forwardButton.setDisabled(false),
            endButton.setDisabled(false),
            linkButton
        ];

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

        const embeds = [em1];

        fs.readdirSync(`${process.cwd()}/src/commands`).forEach(dirs => {
            embeds.push(new EmbedBuilder()
                .setAuthor({ name: toUpperCase(dirs), iconURL: client.user.displayAvatarURL({ format: "png" }), url: `https://discord.gg/uoaio` })
                .setDescription(`${commad(dirs)}`)
            );
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
                    b.update({ embeds: [embeds[currentPage]], components: components });
                    break;
                case 'back':
                    --currentPage;
                    if (currentPage === 0) {
                        group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]);
                    } else {
                        group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(false), endButton.setDisabled(false)]);
                    }
                    b.update({ embeds: [embeds[currentPage]], components: components });
                    break;
                case 'forward':
                    currentPage++;
                    if (currentPage === embeds.length - 1) {
                        group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), endButton.setDisabled(true)]);
                    } else {
                        group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(false), endButton.setDisabled(false)]);
                    }
                    b.update({ embeds: [embeds[currentPage]], components: components });
                    break;
                case 'end':
                    currentPage = embeds.length - 1;
                    group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), endButton.setDisabled(true)]);
                    b.update({ embeds: [embeds[currentPage]], components: components });
                    break;
                case 'pagMenu':
                    currentPage = parseInt(b.values[0]);
                    if (currentPage === 0) {
                        group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(true), backButton.setDisabled(true), forwardButton.setDisabled(false), endButton.setDisabled(false)]);
                    } else if (currentPage === embeds.length - 1) {
                        group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(true), endButton.setDisabled(true)]);
                    } else {
                        group2 = new ActionRowBuilder().addComponents([startButton.setDisabled(false), backButton.setDisabled(false), forwardButton.setDisabled(false), endButton.setDisabled(false)]);
                    }
                    b.update({ embeds: [embeds
