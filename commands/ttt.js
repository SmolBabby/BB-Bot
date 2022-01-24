module.exports = {
    name: 'ttt',
    description: 'Play some Tic-Tac-Toe *<BET> [EMOJI]*',
    category: 'Game',
    command: true,
    execute(client, message, args, Discord, getRandomInt, sleep, db, economy) {
        const author = message.author.id;
        let bet = 0

        if (!args[0]) {
            return message.channel.send('You must put a bet!');
        } else if (!isNaN(args[0])) {
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


        if (bet < 1) {
            return message.reply(' the bet is not a valid number!')
        } else if (bet > 1000) {
            return message.reply(' the bet is too high! (max. 1000)')
        }








        function takeEmoji(str) {
            let emojis = message.guild.emojis.cache.array();
            for (let i in emojis) {
                if (`<:${emojis[i].name}:${emojis[i].id}>` == str) {
                    return true
                }
            }
        }

        async function getCursor(args) {
            if (args.length > 1) {
                var str = args[1];
                if (takeEmoji(str)) {
                    console.log('EMOJI BAYBEE')
                    return str
                } else if (/\p{Extended_Pictographic}/u.test(str) == true) {
                    console.log('UNICODE BAYBEE')
                    return str
                } else {
                    message.channel.send("Invalid emoji: This emoji isn't in this server!");
                    return '🇽';
                }
            } else {
                return '🇽';
            }
        }






        var arraysMatch = function(arr1, arr2) {

            // Check if the arrays are the same length
            if (arr1.length !== arr2.length) return false;

            // Check if all items exist and are in the same order
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }

            // Otherwise, return true
            return true;

        };

        var gameOver = false;

        var CPUview = [];
        var win = false;
        var lost = false;
        //🟦 🇽 🇴
        var X;
        const empty = '🟦';
        var board = [empty, empty, empty, empty, empty, empty, empty, empty, empty];
        getCursor(args).then((r) => {

            X = r;
        });



        const O = '🇴';



        async function checkIfWon(board, A, empty) {

            var hBoard = [];
            var vBoard = [];
            var dBoard = [];
            hBoard = [
                [board[0], board[1], board[2]],
                [board[3], board[4], board[5]],
                [board[6], board[7], board[8]]
            ];
            vBoard = [
                [board[0], board[3], board[6]],
                [board[1], board[4], board[7]],
                [board[2], board[5], board[8]]
            ];
            dBoard = [
                [board[0], board[4], board[8]],
                [board[2], board[4], board[6]],
            ];

            let winBoard = [A, A, A];
            if (arraysMatch(winBoard, hBoard[0]) == true) {
                console.log('true');
                return true
            } else if (arraysMatch(winBoard, hBoard[1]) == true) {
                console.log('true');
                return true
            } else if (arraysMatch(winBoard, hBoard[2]) == true) {
                console.log('true');
                return true
            } else if (arraysMatch(winBoard, vBoard[0]) == true) {
                console.log('true');
                return true
            } else if (arraysMatch(winBoard, vBoard[1]) == true) {
                console.log('true');
                return true
            } else if (arraysMatch(winBoard, vBoard[2]) == true) {
                console.log('true');
                return true
            } else if (arraysMatch(winBoard, dBoard[0]) == true) {
                console.log('true');
                return true
            } else if (arraysMatch(winBoard, dBoard[1]) == true) {
                console.log('true');
                return true
            } else { return false };
        }







        async function cpuPlay(board, view, collector) {

            for (let i in board) {
                if (board[i] === empty) { CPUview.push(i) }
            }

            let a = getRandomInt(view.length);
            board[view[a]] = O;

            checkIfWon(board, O, empty).then((promise => {
                if (promise == true) return collector.emit('lost');
            }));
        }






        const setupEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor('#888888')
            .setTitle('Tic-Tac-Toe')
            .setDescription(`${message.author.username} vs BB\nBET: ${bet} 🔰`)
            .addFields({ name: '**LOADING...**', value: `⬜ ⬜ ⬜\n⬜ ⬜ ⬜\n⬜ ⬜ ⬜`, inline: true })
            .setTimestamp()
            .setFooter('From BB', client.user.avatarURL);





        var tttEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor('#0099ff')
            .setTitle('Tic-Tac-Toe')
            .setDescription(`${message.author.username} vs BB\nBET: ${bet} 🔰`)
            .addFields({ name: '**YOUR TURN**', value: `${board[0]} ${board[1]} ${board[2]}\n${board[3]} ${board[4]} ${board[5]}\n${board[6]} ${board[7]} ${board[8]}`, inline: true })
            .setTimestamp()
            .setFooter('From BB', client.user.avatarURL);

        message.channel.send(setupEmbed).then(sentEmbed => {
            sentEmbed.react('↖️').then(() => sentEmbed.react('⬆️').then(() => sentEmbed.react('↗️').then(() => sentEmbed.react('⬅️').then(() => sentEmbed.react('⏺️').then(() => sentEmbed.react('➡️').then(() => sentEmbed.react('↙️').then(() => sentEmbed.react('⬇️').then(() => sentEmbed.react('↘️').then(() => sentEmbed.edit(tttEmbed)))))))))).then(() => {

                console.log(sentEmbed);

                const filter = reaction => {
                    return ['↖️', '⬆️', '↗️', '⬅️', '⏺️', '➡️', '↙️', '⬇️', '↘️'].includes(reaction.emoji.name) && message.author.id === author;
                };

                const collector = sentEmbed.createReactionCollector(filter, { max: 6, time: 45000, errors: ['time'] });

                collector.on('collect', r => {




                    var tttEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setColor('#0099ff')
                        .setTitle('Tic-Tac-Toe')
                        .setDescription(`${message.author.username} vs BB\nBET: ${bet} 🔰`)
                        .addFields({ name: '**YOUR TURN**', value: `${board[0]} ${board[1]} ${board[2]}\n${board[3]} ${board[4]} ${board[5]}\n${board[6]} ${board[7]} ${board[8]}`, inline: true })
                        .setTimestamp()
                        .setFooter('From BB', client.user.avatarURL);

                    sentEmbed.edit(tttEmbed);
                    if (gameOver == true) {
                        if (win == true) {
                            return collector.emit('win');
                        } else if (lost == true) {
                            return collector.emit('lost');
                        }
                    }


                    switch (r.emoji.name) {
                        case '↖️':
                            if (board[0] == empty) {
                                board[0] = X;
                            } else { return }

                            break;

                        case '⬆️':
                            if (board[1] == empty) {
                                board[1] = X;
                            } else { return }
                            break;

                        case '↗️':
                            if (board[2] == empty) {
                                board[2] = X;
                            } else { return }
                            break;

                        case '⬅️':
                            if (board[3] == empty) {
                                board[3] = X;
                            } else { return }
                            break;

                        case '⏺️':
                            if (board[4] == empty) {
                                board[4] = X;
                            } else { return }
                            break;

                        case '➡️':
                            if (board[5] == empty) {
                                board[5] = X;
                            } else { return }
                            break;

                        case '↙️':
                            if (board[6] == empty) {
                                board[6] = X;
                            } else { return }
                            break;

                        case '⬇️':
                            if (board[7] == empty) {
                                board[7] = X;
                            } else { return }
                            break;

                        case '↘️':
                            if (board[8] == empty) {
                                board[8] = X;
                            } else { return }
                            break;
                    }


                    checkIfWon(board, X, empty).then((promise => {
                        if (promise == true) return collector.emit('win');
                    }));
                    checkIfWon(board, O, empty).then((promise => {
                        if (promise == true) return collector.emit('lost');
                    }));








                    var tttEmbed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setColor('#0099ff')
                        .setTitle('Tic-Tac-Toe')
                        .setDescription(`${message.author.username} vs BB\nBET: ${bet} 🔰`)
                        .addFields({ name: '**YOUR TURN**', value: `${board[0]} ${board[1]} ${board[2]}\n${board[3]} ${board[4]} ${board[5]}\n${board[6]} ${board[7]} ${board[8]}`, inline: true })
                        .setTimestamp()
                        .setFooter('From BB', client.user.avatarURL);

                    sentEmbed.edit(tttEmbed).then(() => {

                        if (gameOver == true) { return };
                        CPUview = [];
                        cpuPlay(board, CPUview, collector)
                    }).then(() => {




                        var tttEmbed = new Discord.MessageEmbed()
                            .setAuthor(message.author.tag, message.author.avatarURL())
                            .setColor('#0099ff')
                            .setTitle('Tic-Tac-Toe')
                            .setDescription(`${message.author.username} vs BB\nBET: ${bet} 🔰`)
                            .addFields({ name: '**YOUR TURN**', value: `${board[0]} ${board[1]} ${board[2]}\n${board[3]} ${board[4]} ${board[5]}\n${board[6]} ${board[7]} ${board[8]}`, inline: true })
                            .setTimestamp()
                            .setFooter('From BB', client.user.avatarURL);

                        sentEmbed.edit(tttEmbed);
                    });
                    checkIfWon(board, O, empty).then((promise => {
                        if (promise == true) return collector.emit('lost');
                    }));



                });
                collector.on('end', collected => {

                    sentEmbed.reactions.removeAll();
                    sleep(1000).then((t => {
                        if (win == true) {
                            economy.add(`${author}.user.balance`, (bet));
                            return sentEmbed.edit(new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL())
                                .setColor('#22a834')
                                .setTitle('Tic-Tac-Toe')
                                .setDescription(`${message.author.username} vs BB\nBET: ${bet} 🔰`)
                                .addFields({ name: `**${message.author.username.toUpperCase()} WON ${bet}🔰!**`, value: `${board[0]} ${board[1]} ${board[2]}\n${board[3]} ${board[4]} ${board[5]}\n${board[6]} ${board[7]} ${board[8]}`, inline: true })
                                .setTimestamp()
                                .setFooter('From BB', client.user.avatarURL));
                        } else if (lost == true) {
                            economy.subtract(`${author}.user.balance`, (bet));
                            return sentEmbed.edit(new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL())
                                .setColor('#d62929')
                                .setTitle('Tic-Tac-Toe')
                                .setDescription(`${message.author.username} vs BB\nBET: ${bet} 🔰`)
                                .addFields({ name: `**${message.author.username.toUpperCase()} LOST ${bet}🔰!**`, value: `${board[0]} ${board[1]} ${board[2]}\n${board[3]} ${board[4]} ${board[5]}\n${board[6]} ${board[7]} ${board[8]}`, inline: true })
                                .setTimestamp()
                                .setFooter('From BB', client.user.avatarURL));
                        } else {
                            return sentEmbed.edit(new Discord.MessageEmbed()
                                .setAuthor(message.author.tag, message.author.avatarURL())
                                .setColor('#ccab18')
                                .setTitle('Tic-Tac-Toe')
                                .setDescription(`${message.author.username} VS.BB `)
                                .addFields({ name: `**TIMED OUT**`, value: `${board[0]} ${board[1]} ${board[2]}\n${board[3]} ${board[4]} ${board[5]}\n${board[6]} ${board[7]} ${board[8]}`, inline: true })
                                .setTimestamp()
                                .setFooter('From BB', client.user.avatarURL));
                        }
                    }));


                });

                collector.on('win', collected => {

                    gameOver = true;
                    win = true;
                    message.reply("You won!").then(() => collector.stop('game over').then(() => console.log('finished')));
                });

                collector.on('lost', collected => {
                    gameOver = true;
                    lost = true;
                    message.reply("You lost!").then(() => collector.stop('game over').then(() => console.log('finished')));
                });






            });

        })



    },
};