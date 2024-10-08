const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = {

    // Meme Images

    data: new SlashCommandBuilder()
        .setName('images')
        .setDescription('See all the images in Bot')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Get information about the message category commands')
        )
        .addSubcommandGroup((group) =>
            group
                .setName('memes')
                .setDescription('See all the memes in Bot')
                .addSubcommand((subcommand) =>
                    subcommand.setName('drake').setDescription('Create a drake meme')
                        .addStringOption(option => option.setName('text1').setDescription('Enter a text').setRequired(true))
                        .addStringOption(option => option.setName('text2').setDescription('Enter a text').setRequired(true)),

                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('pooh').setDescription('Create a pooh meme')
                        .addStringOption(option => option.setName('text1').setDescription('Enter a text').setRequired(true))
                        .addStringOption(option => option.setName('text2').setDescription('Enter a text').setRequired(true)),

                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('trumptweet').setDescription('Display\'s a custom tweet from Donald Trump with the message provided')
                        .addStringOption(option => option.setName('text').setDescription('Enter a text').setRequired(true))
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('tweet').setDescription('Tweet something on twitter')
                        .addStringOption(option => option.setName('text').setDescription('Enter a text').setRequired(true))
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('wasted').setDescription('GTA wasted overlay'),
                )

        )

        // Animal Images

        .addSubcommandGroup((group) =>
            group
                .setName('animals')
                .setDescription('See all the animal images in Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('bird')
                        .setDescription('Get a random bird'),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('cat')
                        .setDescription("Get a random cat")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('dog')
                        .setDescription("Get a random dog")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('fox')
                        .setDescription("Get a random fox")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('koala')
                        .setDescription("Get a random koala")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('panda')
                        .setDescription("Get a random panda")
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('redpanda')
                        .setDescription("Get a random redpanda")
                )
        )

        // User Images

        .addSubcommandGroup((group) =>
            group
                .setName('user')
                .setDescription('See all the user images in Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('ad')
                        .setDescription('Generate a ad image')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('The user you want the ad from').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('avatar')
                        .setDescription('See a users avatar')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('The user you want the avatar from').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('banner')
                        .setDescription('See a users banner')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('The user you want the banner from').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('clown')
                        .setDescription('Generate a clown image')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('The user you want make a clown').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('invert')
                        .setDescription('Invert a image')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('The user you want the inverted image from').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('kiss')
                        .setDescription('Kiss a user')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('The user you want to kiss').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('podium')
                        .setDescription('Make a user podium')
                        .addUserOption((option) =>
                            option.setName('user1').setDescription('The first podium user').setRequired(true),
                        )
                        .addUserOption((option) =>
                            option.setName('user2').setDescription('The second podium user').setRequired(true),
                        )
                        .addUserOption((option) =>
                            option.setName('user3').setDescription('The third podium user').setRequired(true),
                        )

                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('spank')
                        .setDescription('Spank a user')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('The user you want to spank').setRequired(true),
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('wanted')
                        .setDescription('Wanted a user')
                        .addUserOption((option) =>
                            option.setName('user').setDescription('The user you want to wanted').setRequired(true),
                        )
                )
        )

        // Extra Images

        .addSubcommandGroup((group) =>
            group
                .setName('extra')
                .setDescription('See all the extra images in Bot')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('glass')
                        .setDescription('Overlays a glass texture over an image'),
                )
                .addSubcommand((subcommand) =>
                    subcommand.setName('image').setDescription('Show a image in an embed')
                        .addChannelOption(option => option.setName('channel').setDescription('Channel where the embed should be').setRequired(true).addChannelTypes(ChannelType.GuildText))
                        .addStringOption(option => option.setName('image-url').setDescription('Enter a image url').setRequired(true))
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('triggered')
                        .setDescription('Trigger yourself'),
                )
        ),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};


 