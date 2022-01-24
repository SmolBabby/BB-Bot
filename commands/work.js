module.exports = {
    name: 'work',
    description: 'Work to make some money!',
    category: 'Money',
    command: true,
    async execute(client, message, args, works, db, economy, getRandomInt) {
        let pay = getRandomInt(35) + 15
        let workMsg = works[getRandomInt(works.length) - 1];;
        await economy.add(`${message.author.id}.user.balance`, pay);
        message.channel.send(`You worked and got ${pay} 🔰`);

    },
};