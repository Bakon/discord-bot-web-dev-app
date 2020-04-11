export default class Coin {
    static name = 'coinflip';
    static aliases = ['coin', 'munt'];
    static description = 'You either win, or lose!';

    static run = (bot, message) =>
        message.channel.send(
            Math.floor(Math.random() * 2)
                ? 'The coin landed on `tails`'
                : 'The coin landed on `heads`'
        );
}
