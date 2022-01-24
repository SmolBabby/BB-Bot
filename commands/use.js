module.exports = {
    name: 'use',
    description: 'Use an item from your inventory! *<item>*',
    category: 'Money',
    command: true,
    async execute(client, message, args, user, Discord, db, economy, fortune, getRandomInt) {
        var itemToUse = args[0].toLowerCase();

        var fortuneMessage = fortune[getRandomInt(fortune.length) - 1];

        function getUserFromMention(mention) {
            if (!mention) return;

            if (mention.startsWith('<@') && mention.endsWith('>')) {
                mention = mention.slice(2, -1);

                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }

                return client.users.cache.get(mention);
            }
        }

        switch (itemToUse) {
            case 'tea':
                if (economy.get(`${message.author.id}.user.items[0].amount`) == 0) {
                    message.channel.send('You don\'t have anymore of this item!')
                    break;
                }
                economy.subtract(`${message.author.id}.user.items[0].amount`, 1)
                message.channel.send('The tea is warm and makes you feel cozy... but that\'s it.')
                break;

            case 'cookie':
                if (economy.get(`${message.author.id}.user.items[1].amount`) == 0) {
                    message.channel.send('You don\'t have anymore of this item!')
                    break;
                }
                economy.subtract(`${message.author.id}.user.items[1].amount`, 1);
                message.channel.send(`You ate the fortune cookie. There was a message inside:\n*${fortuneMessage}*`)
                break;

            case 'fortune':
                if (economy.get(`${message.author.id}.user.items[1].amount`) == 0) {
                    message.channel.send('You don\'t have anymore of this item!');
                    break;
                }
                economy.subtract(`${message.author.id}.user.items[1].amount`, 1);
                break;

            case 'bullet':
                message.channel.send('You can\'t use this item!')
                break;

            case 'gun':
                if (economy.get(`${message.author.id}.user.items[3].amount`) == 0) {
                    message.channel.send(`You don't own a gun! Purchase one from the shop.`)
                    break
                }
                if (economy.get(`${message.author.id}.user.items[2].amount`) == 0) {
                    message.channel.send('You don\'t have anymore bullets!')
                    break;
                }
                economy.subtract(`${message.author.id}.user.items[2].amount`, 1);
                if (!args[1]) {
                    message.channel.send('You need to mention who you will shoot at!');
                    break;
                }
                message.channel.send(`You shot at ${args[1]}!`)
                break;

            case 'stick':

                if (economy.get(`${message.author.id}.user.items[4].amount`) == 0) {
                    message.channel.send(`You don't own a stick! Purchase one from the shop.`)
                    break
                }

                if (!args[1]) {
                    message.channel.send('You need to mention who you will **BONK**!');
                    break;
                }
                message.channel.send(`You bonked ${args[1]}!`)
                break;


            case 'sandwich':
                if (economy.get(`${message.author.id}.user.items[5].amount`) == 0) {
                    message.channel.send('You don\'t have anymore of this item!')
                    break;
                }
                economy.subtract(`${message.author.id}.user.items[5].amount`, 1)
                message.channel.send('snadwihc')
                break;

            case ('bag' || 'air'):
                if (economy.get(`${message.author.id}.user.items[6].amount`) == 0) {
                    message.channel.send('You don\'t have anymore of this item!')
                    break;
                }
                economy.subtract(`${message.author.id}.user.items[6].amount`, 1)
                message.channel.send('What did you think was gonna happen? Did you really spend 1,000,000,000🔰 for this?It\'s literally air in a bag. You are a mistake.')
                break;

            default:
                message.channel.send('There are no item named ' + itemToUse);
                break;
        }
    },
};