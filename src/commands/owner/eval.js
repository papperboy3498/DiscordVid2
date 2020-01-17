/* jshint evil: true */
const Command = require('../../structures/Command');
const Util = require('../../util');
const config = require('config');

module.exports = class Eval extends Command {
  get name() { return 'eval'; }

  get _options() { return {
    aliases: ['e'],
    listed: false,
  }; }

  // eslint-disable-next-line no-unused-vars
  async exec(message, { args }) {
    if(message.author.id !== config.get('owner')) return;
    try {
      const start = Date.now();
      const result = eval(Util.Prefix.strip(message).split(' ').slice(1).join(' '));
      const time = Date.now() - start;
      message.channel.send(`Took ${time} ms\n\`\`\`js\n${result}\`\`\`\n`);
    } catch(e) {
      message.channel.send('```js\n' + e.stack + '\n```');
    }
  }

  get metadata() { return {
    description: 'Do a thing.',
    usage: '<code>',
  }; }
};
