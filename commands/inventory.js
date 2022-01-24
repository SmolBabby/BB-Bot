module.exports = {
    name: 'inventory',
    description: 'Check your inventory',
    category: 'Money',
    command: true,
    async execute(client, message, args, Discord, db, economy) {
        let itemList = '';
        let username = '';
        var user = {};
        var a = '';

        if (message.mentions.members.size > 0) {
            let i = message.mentions.members.first()
            username = i.user.tag
            user = i.user.id
        } else {
            username = message.author.tag
            user = message.author.id
        }


        var userEco = economy.get(`${user}`);
        await userEco.user.items.forEach(item => {
            if (!item.amount) {
                return
            }

            itemList = itemList + `${item.amount}x ${item.name}\n`;
        });
        if (!itemList) {
            itemList = 'The inventory is empty!'
        }
        const invEmbed = new Discord.MessageEmbed()
            .setTitle(`${username.toUpperCase()}'s INVENTORY`)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor('#7f1f1f')
            .addFields({ name: "Balance", value: parseInt(economy.get(`${user}.user.balance`)) + '🔰', inline: false }, { name: "Inventory", value: itemList, inline: false })
            .setThumbnail('https://cdn.discordapp.com/attachments/792595487332761610/792971775482658816/backpack.png')
            .setTimestamp()
            .setFooter('From BB', `${client.user.avatarURL()}`);
        message.channel.send(invEmbed);
    },
};