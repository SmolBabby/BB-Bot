module.exports = {
    name: 'poll',
    description: 'Creates a poll/event! <duration> <message>',
    category: 'Utility',
    command: true,
    execute(client, message, args, Discord, ms) {
        var filter = (reaction) => {
            return reaction.emoji.name === '👍' || reaction.emoji.name === '👎'
        };



        var timer = ms(args.shift());

        message.channel.send('Message').then(sentMessage => {
            sentMessage.react('👍').then(() => sentMessage.react('👎'));



            const collector = sentMessage.createReactionCollector(filter, { time: timer });

            console.log(timer)
            collector.on('collect', r => {
                console.log(`Collected ${r.emoji.name}`);
            });


            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });
        });


    },
};