// @flow
const Discord = require('discord.js');
const glob = require('glob');
const DISCORD_TOKEN = require('../token');

const prefix = '?';
const active = new Map();
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.on('ready', (): Promise<void> =>
    bot.user
        .setActivity('Dreamweaver tutorial 2003', { type: 'WATCHING' })
        .then(() => console.log(`${bot.user.username} is online!`))
        .catch(console.error)
);

glob.sync(`${__dirname}/command/*.js`).forEach((filePath: string): void => {
    const commandClass = require(filePath);

    type commandProps = {
        name: string,
        aliases: string[],
    };

    if (commandClass.default) {
        const { name, aliases }: commandProps = commandClass.default;

        bot.commands.set(name, commandClass.default);
        aliases.forEach((alias) => bot.aliases.set(alias, name));
    }
});

bot.on(
    'message',
    async (message: Discord.Message): Promise<Discord.Message> => {
        if (message.author.bot || message.channel.type === 'dm') return;
        if (!message.content.startsWith(prefix)) return;

        const messageArray = message.content.split(' ');
        const cmd = messageArray[0].slice(prefix.length);
        const args = messageArray.slice(1);
        const options = { active };
        const foundCommand =
            bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

        foundCommand?.run(message, bot, args, options);
    }
);

bot.login(DISCORD_TOKEN);
