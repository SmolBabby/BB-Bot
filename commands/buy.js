module.exports = {
    name: 'buy',
    description: 'Buy an item from the shop! *<item>*',
    category: 'Money',
    command: true,
    async execute(client, message, args, user, Discord, db, economy) {

        var purchase = args[0];
        var quantity = 1;
        if (args[1]) {
            quantity = parseInt(args[1])
        }



        switch (purchase) {
            //0
            case 'tea':
                if (economy.get(`${message.author.id}.user.balance`) < (5 * quantity)) {
                    message.channel.send('You don\'t have enough money for this item!')
                    break;
                }
                await economy.subtract(`${message.author.id}.user.balance`, (5 * quantity));
                message.channel.send(`You bought: ${quantity}x Tea`)
                await economy.add(`${message.author.id}.user.items[0].amount`, quantity);
                break;

                //1
            case 'cookie':
                if (economy.get(`${message.author.id}.user.balance`) < (100 * quantity)) {
                    message.channel.send('You don\'t have enough money for this item!')
                    break;
                }
                await economy.subtract(`${message.author.id}.user.balance`, (100 * quantity));
                await economy.add(`${message.author.id}.user.items[1].amount`, quantity);
                message.channel.send(`You bought: ${quantity}x Fortune Cookie `)

                break;

                //1
            case 'fortune':
                if (economy.get(`${message.author.id}.user.balance`) < (100 * quantity)) {
                    message.channel.send('You don\'t have enough money for this item!')

                    break;
                }
                await economy.subtract(`${message.author.id}.user.balance`, (100 * quantity));
                message.channel.send(`You bought: ${quantity}x Fortune Cookie`)
                await economy.add(`${message.author.id}.user.items[1].amount`, quantity);
                break;

                //2
            case 'bullet':
                if (economy.get(`${message.author.id}.user.balance`) < (1000 * quantity)) {
                    message.channel.send('You don\'t have enough money for this item!')
                    break;
                }
                economy.subtract(`${message.author.id}.user.balance`, (1000 * quantity));
                message.channel.send(`You bought: ${quantity}x Bullet`)
                economy.add(`${message.author.id}.user.items[2].amount`, quantity);
                break;

                //3
            case 'gun':
                if (economy.get(`${message.author.id}.user.balance`) < 50000) {
                    message.channel.send('You don\'t have enough money for this item!')
                    break;
                }
                if (economy.get(`${message.author.id}.user.items[3].amount`) == 1) {
                    message.channel.send('You already have this item!')
                    break;
                }
                if (quantity > 1) {
                    message.channel.send('You can only buy this item once!')
                    break;
                }
                economy.subtract(`${message.author.id}.user.balance`, 50000);
                economy.add(`${message.author.id}.user.items[3].amount`, 1);
                message.channel.send(`You bought: ${quantity}x Gun`)
                break;
            case 'stick':
                if (economy.get(`${message.author.id}.user.balance`) < 5000) {
                    message.channel.send('You don\'t have enough money for this item!')
                    break;
                }
                if (economy.get(`${message.author.id}.user.items[4].amount`) == 1) {
                    message.channel.send('You already have this item!')
                    break;
                }
                if (quantity > 1) {
                    message.channel.send('You can only buy this item once!')
                    break;
                }
                economy.subtract(`${message.author.id}.user.balance`, 5000);
                economy.add(`${message.author.id}.user.items[4].amount`, 1);
                message.channel.send(`You bought: ${quantity}x Stick`)
                break;
                //5
            case 'sandwich':
                if (economy.get(`${message.author.id}.user.balance`) < (200 * quantity)) {
                    message.channel.send('You don\'t have enough money for this item!')
                    break;
                }
                await economy.subtract(`${message.author.id}.user.balance`, (200 * quantity));
                await economy.add(`${message.author.id}.user.items[5].amount`, quantity);
                message.channel.send(`You bought: ${quantity}x Sandwich `)

                break;


            case ('bag' || 'air'):
                if (economy.get(`${message.author.id}.user.balance`) < (1000000000 * quantity)) {
                    message.channel.send('You don\'t have enough money for this item!')
                    break;
                }
                await economy.subtract(`${message.author.id}.user.balance`, (1000000000 * quantity));
                await economy.add(`${message.author.id}.user.items[6].amount`, quantity);
                message.channel.send(`You bought: ${quantity}x Bag Of Air `)

                break;

            default:
                message.channel.send('There are no item named ' + purchase);
                break;
        }

    },
};