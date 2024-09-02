const app = require("express")();
const { Client, WebhookClient, EmbedBuilder, codeBlock } = require('discord.js');
const chalk = require('chalk');
const axios = require('axios');
require('dotenv').config('./.env');
const webhook = require("./config/webhooks.json");
const config = require("./config/bot.js");
const keep_alive = require('./keep_alive.js');

// إعداد ويب هوك
const webHooksArray = ['startLogs', 'shardLogs', 'errorLogs', 'dmLogs', 'voiceLogs', 'serverLogs', 'serverLogs2', 'commandLogs', 'consoleLogs', 'warnLogs', 'voiceErrorLogs', 'creditLogs', 'evalLogs', 'interactionLogs'];
if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
    for (const webhookName of webHooksArray) {
        webhook[webhookName].id = process.env.WEBHOOK_ID;
        webhook[webhookName].token = process.env.WEBHOOK_TOKEN;
    }
}

// تسجيلات بدء التشغيل
console.clear();
console.log(chalk.blue.bold(`System`), chalk.white(`>>`), chalk.green(`Starting up...`));
console.log(chalk.blue.bold(`System`), chalk.white(`>>`), chalk.red(`Version ${require(`${process.cwd()}/package.json`).version} loaded`));

// إعداد السيرفر
app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`<iframe style="margin: 0; padding: 0;" width="100%" height="100%" src="https://uoaio.vercel.app/" frameborder="0" allowfullscreen></iframe>`);
    res.end();
});

app.listen(3000, () => {
    console.log(chalk.blue.bold(`Server`), chalk.white(`>>`), chalk.green(`Running on port`), chalk.red(`3000`));
});

// Webhooks
const consoleLogs = new WebhookClient({ id: webhook.consoleLogs.id, token: webhook.consoleLogs.token });
const warnLogs = new WebhookClient({ id: webhook.warnLogs.id, token: webhook.warnLogs.token });

// التعامل مع الأخطاء
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
    let errorMessage = error.toString();
    let stackMessage = error.stack ? error.stack.toString() : "No stack error";

    if (errorMessage.length > 950) errorMessage = errorMessage.slice(0, 950) + '... view console for details';
    if (stackMessage.length > 950) stackMessage = stackMessage.slice(0, 950) + '... view console for details';

    const embed = new EmbedBuilder()
        .setTitle('🚨・Unhandled promise rejection')
        .addFields([
            { name: "Error", value: codeBlock(errorMessage) },
            { name: "Stack error", value: codeBlock(stackMessage) }
        ]);

    consoleLogs.send({ username: 'Bot Logs', embeds: [embed] })
        .catch(() => {
            console.log('Error sending unhandled promise rejection to webhook');
        });
});

process.on('warning', warn => {
    console.warn("Warning:", warn);

    const embed = new EmbedBuilder()
        .setTitle('🚨・New warning found')
        .addFields([{ name: 'Warn', value: codeBlock(warn.toString()) }]);

    warnLogs.send({ username: 'Bot Logs', embeds: [embed] })
        .catch(() => {
            console.log('Error sending warning to webhook');
        });
});

// بدء تشغيل البوت
require('./bot');
