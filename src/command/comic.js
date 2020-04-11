const { Message } = require('discord.js');
const fetch = require('node-fetch');
const parse = require('node-html-parser');

module.exports = class Comic {
    static name = 'comic';
    static aliases = ['comics'];
    static description = 'Gets a fun Cyanide and Happiness meme!';

    static run = async (message: Message) => {
        const imagesArray = await fetch('http://explosm.net/rcg')
            .then((res) => res.text())
            .then((html) =>
                parse(html)
                    .querySelectorAll('.rcg-panels img')
                    .map((image) =>
                        image.rawAttrs
                            .replace('src="', '')
                            .replace('" alt=""', '')
                            .trim()
                    )
            );

        message.channel.send('###############################', {
            files: imagesArray,
        });
    };
};
