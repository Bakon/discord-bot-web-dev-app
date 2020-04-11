// @flow
import { Message } from 'discord.js';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

export default class Comic {
    static name = 'comic';
    static aliases = ['comics'];
    static description = 'Gets a fun Cyanide and Happiness meme!';

    static run = async (message: Message): Promise<Message> => {
        const imagesArray = await fetch('http://explosm.net/rcg')
            .then((res) => res.text())
            .then((html: HTMLElement) =>
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
}
