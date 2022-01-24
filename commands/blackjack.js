module.exports = {
    name: 'blackjack',
    description: 'Play some good ol\' BlackJack!',
    category: 'Game',
    command: true,
    async execute(client, message, args, Discord, economy, db) {
        let bet = 0

        if (args.length < 1) {
            return message.reply('You need to put your bet!')
        }
        if (!isNaN(args[0])) {
            if (parseInt(args[0]) <= economy.get(`${message.author.id}.user.balance`)) {
                bet = parseInt(args[0]);
            } else {
                return message.reply(' you don\'t have enough money!')
            }
        } else {
            if (args[0].toLowerCase() == 'all') {
                let total = economy.get(`${message.author.id}.user.balance`);
                bet = total;
            } else {
                return message.reply(' the bet is not a valid number!')
            }
        }
        if (bet < 0) {
            return message.reply(' the bet is not a valid number!')
        }

        const player = message.author.id;

        var suits = ["spades", "diamonds", "clubs", "hearts"];
        var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


        function shuffle(deck) {
            // for 1000 turns
            // switch the values of two random cards
            for (var i = 0; i < 1000; i++) {
                var location1 = Math.floor((Math.random() * deck.length));
                var location2 = Math.floor((Math.random() * deck.length));
                var tmp = deck[location1];

                deck[location1] = deck[location2];
                deck[location2] = tmp;
            }
        }








        function createDeck() {
            deck = new Array();
            for (var i = 0; i < values.length; i++) {
                for (var x = 0; x < suits.length; x++) {
                    var weight = parseInt(values[i]);
                    if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                        weight = 10;
                    if (values[i] == "A")
                        weight = 11;
                    var card = { Value: values[i], Suit: suits[x], Weight: weight };
                    deck.push(card);
                }
            }
            return deck
        }

        function sortHand(array) {
            return array.sort(function(a, b) {
                var x = a.Weight;
                var y = b.Weight;
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
        }

        function checkTotal(hand) {
            let i = 0;
            hand.forEach(card => {
                if (i > 10 && card.Weight == 11) {
                    i = i + 1;
                } else {
                    i = i + card.Weight;
                }
            });
            return i
        }


        async function dealerPlay(embed, collector) {
            dealer.push(deck.shift());
            let value = 0;
            value = checkTotal(dealer)

            if (value == 21 && dealer.length == 2) {
                console.log(value);
                console.log(dealer)
                return console.log('BlackJack for dealer')
            } else {
                while (value < 17) {

                    dealer.push(deck.shift());
                    value = checkTotal(dealer);
                    if (value == 21) {
                        console.log('Dealer has 21!');

                        await embed.edit(new Discord.MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL())
                            .setColor('#d62929')
                            .setTitle('BLACKJACK')
                            .setDescription(`YOU LOSE ${bet}🔰`)
                            .addFields({ name: 'Your hand:', value: `${handValue}`, inline: false }, { name: `Dealer's hand:`, value: `${value}`, inline: false })
                            .setTimestamp()
                            .setFooter('From BB', 'https://media.discordapp.net/attachments/714776304498507849/761839160486395944/unknown.png?width=300&height=300'));
                        collector.emit('end');
                        economy.subtract(`${message.author.id}.user.balance`, (bet));
                        break;
                    }


                }

                if (value > 21) {
                    await embed.edit(new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setColor('#22a834')
                        .setTitle('BLACKJACK')
                        .setDescription(`THE DEALER BUSTED! YOU WIN ${bet}🔰`)
                        .addFields({ name: 'Your hand:', value: `${handValue}`, inline: false }, { name: `Dealer's hand:`, value: `${value}`, inline: false })
                        .setTimestamp()
                        .setFooter('From BB', 'https://media.discordapp.net/attachments/714776304498507849/761839160486395944/unknown.png?width=300&height=300'));
                    economy.add(`${message.author.id}.user.balance`, (bet));
                    console.log('Dealer bust!');
                    return 'win'
                }

            }


            if (value < handValue) {
                console.log(value);
                await embed.edit(new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setColor('#22a834')
                    .setTitle('BLACKJACK')
                    .setDescription(`YOU WIN ${bet}🔰`)
                    .addFields({ name: 'Your hand:', value: `${handValue}`, inline: false }, { name: `Dealer's hand:`, value: `${value}`, inline: false })
                    .setTimestamp()
                    .setFooter('From BB', 'https://media.discordapp.net/attachments/714776304498507849/761839160486395944/unknown.png?width=300&height=300'));
                economy.add(`${message.author.id}.user.balance`, (bet));
                return 'win'
            } else if (value > handValue) {
                console.log(value);
                await embed.edit(new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setColor('#d62929')
                    .setTitle('BLACKJACK')
                    .setDescription(`YOU LOSE ${bet}🔰`)
                    .addFields({ name: 'Your hand:', value: `${handValue}`, inline: false }, { name: `Dealer's hand:`, value: `${value}`, inline: false })
                    .setTimestamp()
                    .setFooter('From BB', 'https://media.discordapp.net/attachments/714776304498507849/761839160486395944/unknown.png?width=300&height=300'));
                economy.subtract(`${message.author.id}.user.balance`, (bet));
                return 'lost'
            } else if (value == handValue) {

                console.log(value);
                await embed.edit(new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setColor('#ccab18')
                    .setTitle('BLACKJACK')
                    .setDescription(`TIE`)
                    .addFields({ name: 'Your hand:', value: `${handValue}`, inline: false }, { name: `Dealer's hand:`, value: `${value}`, inline: false })
                    .setTimestamp()
                    .setFooter('From BB', 'https://media.discordapp.net/attachments/714776304498507849/761839160486395944/unknown.png?width=300&height=300'));

                return 'tie'
            }
        }





        var win = '';

        var deck = createDeck();
        var hand = [];
        var dealer = [];

        await shuffle(deck);

        hand.push(deck.shift());
        hand.push(deck.shift());
        dealer.push(deck.shift())
        sortHand(hand)

        var handValue = 0;
        var dealerValue = 0;



        handValue = checkTotal(hand)
        dealerValue = checkTotal(dealer)


        var bjEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor('#0099ff')
            .setTitle('BLACKJACK')
            .setDescription(`BET: ${bet}🔰`)
            .addFields({ name: 'Your hand:', value: `${handValue}`, inline: false }, { name: `Dealer's hand:`, value: `${dealerValue}`, inline: false })
            .setTimestamp()
            .setFooter('From BB', 'https://media.discordapp.net/attachments/714776304498507849/761839160486395944/unknown.png?width=300&height=300');

        message.channel.send(bjEmbed).then(sentEmbed => {
            const filter = m => m.author == player;
            const collector = sentEmbed.channel.createMessageCollector(filter, { time: 90000 });


            if (handValue == 21 && hand.length == 2) {
                sentEmbed.edit(new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setColor('#0099ff')
                    .setTitle('BLACKJACK')
                    .setDescription(`BET: ${bet}🔰`)
                    .addFields({ name: 'Your hand:', value: `${handValue}`, inline: false }, { name: `Dealer's hand:`, value: `${value}`, inline: false })
                    .setTimestamp()
                    .setFooter('From BB', 'https://media.discordapp.net/attachments/714776304498507849/761839160486395944/unknown.png?width=300&height=300'));

                console.log('Blackjack!')
                economy.add(`${message.author.id}.user.balance`, Math.floor(bet * 1.5));
                collector.emit('end');
            }


            collector.on('collect', async(m) => {


                switch (m.content.toLowerCase()) {
                    case 'hit':
                        console.log('hit');
                        hand.push(deck.shift());
                        handValue = await checkTotal(hand);
                        sentEmbed.edit(new Discord.MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL())
                            .setColor('#0099ff')
                            .setTitle('BLACKJACK')
                            .setDescription(`BET: ${bet}🔰`)
                            .addFields({ name: 'Your hand:', value: `${handValue}`, inline: false }, { name: `Dealer's hand:`, value: `${dealerValue}`, inline: false })
                            .setTimestamp()
                            .setFooter('From BB', 'https://media.discordapp.net/attachments/714776304498507849/761839160486395944/unknown.png?width=300&height=300'));

                        if (handValue > 21) {
                            sentEmbed.edit(new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL())
                                .setColor('#d62929')
                                .setTitle('BLACKJACK')
                                .setDescription(`YOU LOSE ${bet}🔰`)
                                .addFields({ name: 'Your hand:', value: `${handValue}`, inline: false }, { name: `Dealer's hand:`, value: `${dealerValue}`, inline: false })
                                .setTimestamp()
                                .setFooter('From BB', 'https://media.discordapp.net/attachments/714776304498507849/761839160486395944/unknown.png?width=300&height=300'));
                            economy.subtract(`${message.author.id}.user.balance`, (bet));
                            message.channel.send("Busted");
                            collector.emit('end');
                            break;
                        }

                        if (handValue == 21) {
                            win = dealerPlay(sentEmbed);
                            collector.emit('end');
                        }
                        break;


                    case 'stand':
                        win = dealerPlay(sentEmbed);
                        collector.emit('end');
                        break;

                    default:
                        break;
                }

            });

            collector.on('end', collected => {
                console.log(win)
                console.log(`End of the game.`);




            });
        });
    },
};