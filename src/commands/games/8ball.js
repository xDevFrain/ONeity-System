const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const question = interaction.options.getString('question');

    const antwoorden = [
        "Yes!", "Absolutely!", "Without a doubt!", "You can count on it.", "Definitely!",
        "For sure!", "It is certain!", "No doubt about it!", "You bet!", "Of course!",
        "Yes, for sure!", "The stars align!", "Your wish will come true!", "You have luck on your side!",

        "Unfortunately not.", "No, sorry.", "My sources say no.", "Don't count on it.",
        "Probably not.", "I wouldn't bet on it.", "No chance!", "It's not looking good.",
        "Very doubtful.", "Nope!", "Not in a million years!", "The future says no.",

        "Ask again later.", "I'm not sure.", "I don't know.", "Maybe.", "Could go either way.",
        "Hard to say...", "It's possible.", "Who knows?", "I can't tell right now.",
        "It's up to you!", "It depends on how you see it.", "You should think it over.",

        "Why are you asking me?", "I'm just a bot, what do I know?", "Let me check my magic crystal ball...",
        "I'd tell you, but then I'd have to delete your account.", "Why not flip a coin instead?",
        "42. The answer to life, the universe, and everything.", "Not even the stars know the answer to that.",
        "I need coffee to answer that.", "You don't want to know...", "Only time will tell!",
        "Do you really want to know?", "That’s a secret!", "Just google it!",

        "Believe in yourself!", "Anything is possible if you try hard enough!", "Don't let doubts hold you back!",
        "Follow your dreams!", "It’s your decision, trust your instincts!", "Only you can decide that!",
        "Go for it!", "Take the leap of faith!", "Nothing is impossible!", "The future is what you make it.",
        "Stay positive!", "You are in control of your destiny!", "The answer lies within you!",

        "Signs point to yes.", "Looks promising!", "It's a coin toss.", "The answer is foggy.",
        "Try again tomorrow.", "I wouldn't be so sure.", "You might regret it.",
        "The universe says yes.", "Go with the flow.", "This one's tricky.",
        "Ask your heart!", "Do or do not, there is no try.", "Listen to your gut feeling."
    ];

    const resultaat = Math.floor((Math.random() * antwoorden.length));

    const embed = new Discord.EmbedBuilder()
        .setColor('#5865F2')
        .setTitle(`🎱・8ball Magic Ball`)
        .setDescription(`Here is your answer!`)
        .addFields([
            { name: `❓┇Your Question`, value: `\`\`\`${question}\`\`\``, inline: false },
            { name: `🎱┇Magic Ball's Answer`, value: `\`\`\`${antwoorden[resultaat]}\`\`\``, inline: false }
        ])
        .setFooter({ text: "Enjoy your fortune!", iconURL: client.user.displayAvatarURL() })
        .setTimestamp();

    interaction.editReply({ embeds: [embed] });
}
