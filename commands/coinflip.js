module.exports = {
    name: 'flip',
    description: 'A coin flip! *<tail/head> <bet>*',
    category: 'Game',
    command: true,
    async execute(client, message, args, Discord, getRandomInt, economy, db, sleep) {
        if (args.length < 2) {
            return message.reply('You need to put every arguments!')
        }




        let bet = 0

        if (!isNaN(args[1])) {
            if (parseInt(args[1]) <= economy.get(`${message.author.id}.user.balance`)) {
                bet = parseInt(args[1]);
            } else {
                return message.reply(' you don\'t have enough money!')
            }

        } else {
            if (args[1].toLowerCase() == 'all') {
                let total = economy.get(`${message.author.id}.user.balance`);
                bet = total;
            } else {
                return message.reply(' the bet is not a valid number!')
            }
        }


        if (bet < 0) {
            return message.reply(' the bet is not a valid number!')
        }
        //else if (bet > 1000) {    return message.reply(' the bet is too high! (max. 1000)')}


        function flip() {
            let x = getRandomInt(2000);

            if (x < 999) {
                return 'head';
            } else return 'tail';
        }
        var coin = flip();
        var win = bet
        if (args[0] == 'h' || args[0] == 'head') {
            var side = 'HEAD'
        } else if (args[0] == 't' || args[0] == 'tail') {
            var side = 'TAIL'
        } else {
            return message.reply(` ${args[0]} is not a valid coin side!`);
        }


        message.channel.send(new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setTitle('COIN FLIPPING')
                .setDescription(`You bet: ${bet}🔰 on ${side}`)
                .setColor('#0099ff')
                .setTimestamp()
                .setFooter('From BB', 'https://cdn.discordapp.com/attachments/714776304498507849/761839160486395944/unknown.png')
                .setImage('https://cdn.discordapp.com/attachments/729852287433965632/792930056737259540/Flipping_coin.gif'))
            .then(sentEmbed => {

                sleep(4000).then(() => {

                    if (args[0] == 'tail' || args[0] == 't') {
                        if (coin == 'tail') {
                            economy.add(`${message.author.id}.user.balance`, (bet));
                            sentEmbed.edit(new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL())
                                .setTitle('COIN FLIPPING')
                                .setDescription(`The coin's face is **${coin.toUpperCase()}**! Your bet was **TAIL**. You won ${win}🔰!`)
                                .setColor('#22a834')
                                .setTimestamp()
                                .setFooter('From BB', 'https://cdn.discordapp.com/attachments/714776304498507849/761839160486395944/unknown.png')
                                .setImage('https://cdn.discordapp.com/attachments/729852287433965632/792926777894371399/Sans_titre.png'))
                            return

                        } else {
                            economy.subtract(`${message.author.id}.user.balance`, bet);
                            sentEmbed.edit(new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL())
                                .setTitle('COIN FLIPPING')
                                .setDescription(`The coin's face is **${coin.toUpperCase()}**! Your bet was **HEAD**. You lost ${bet}🔰!`)
                                .setColor('#d62929')
                                .setTimestamp()
                                .setFooter('From BB', 'https://cdn.discordapp.com/attachments/714776304498507849/761839160486395944/unknown.png')
                                .setImage('https://media.discordapp.net/attachments/729852287433965632/792925086202068992/d74906d39a1964e7d07555e7601b06ad.png?width=623&height=467'))
                            return
                        }
                    } else if (args[0] == 'head' || args[0] == 'h') {
                        if (coin == 'head') {
                            economy.add(`${message.author.id}.user.balance`, (bet));
                            sentEmbed.edit(new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL())
                                .setTitle('COIN FLIPPING')
                                .setDescription(`The coin's face is **${coin.toUpperCase()}**! Your bet was **HEAD**. You won ${win}🔰!`)
                                .setColor('#22a834')
                                .setTimestamp()
                                .setFooter('From BB', 'https://cdn.discordapp.com/attachments/714776304498507849/761839160486395944/unknown.png')
                                .setImage('https://media.discordapp.net/attachments/729852287433965632/792925086202068992/d74906d39a1964e7d07555e7601b06ad.png?width=623&height=467'))
                            return
                        } else {
                            economy.subtract(`${message.author.id}.user.balance`, bet);
                            sentEmbed.edit(new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL())
                                .setTitle('COIN FLIPPING')
                                .setDescription(`The coin's face is **${coin.toUpperCase()}**! Your bet was **HEAD**. You lost ${bet}🔰!`)
                                .setColor('#d62929')
                                .setTimestamp()
                                .setFooter('From BB', 'https://cdn.discordapp.com/attachments/714776304498507849/761839160486395944/unknown.png')
                                .setImage('https://cdn.discordapp.com/attachments/729852287433965632/792926777894371399/Sans_titre.png'))
                            return
                        }

                    };
                });

            })

    },
};