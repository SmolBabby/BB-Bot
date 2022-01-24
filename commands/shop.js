module.exports = {
    name: 'shop',
    description: 'Show the shop!',
    category: 'Money',
    command: true,
    async execute(client, message, args, shop, Discord, sort_by_key) {
        let catalog = '';

        await sort_by_key(shop, 'cost');


        shop.forEach(item => {
            if (item.cost < 0) {
                catalog = catalog + `${item.name}: ??? 🔰\n`;
            } else {
                catalog = catalog + `${item.name}: ${item.cost} 🔰\n`;
            }
        });


        const shopEmbed = new Discord.MessageEmbed()
            .setTitle('SHOP')
            .setColor('#7f1f1f')
            .setDescription('"Lamp oil, ropes, bombs, you want it? It\'s yours my friend, as long as you have enough rupees!"')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setThumbnail('https://cdn.discordapp.com/attachments/734227469749714964/792878169186238504/shopGif.gif')
            .addField('CATALOG', catalog)
            .setTimestamp()
            .setImage('https://i.kym-cdn.com/photos/images/newsfeed/001/928/258/824.gif')
            .setFooter('From BB', client.user.avatarURL);
        message.channel.send(shopEmbed);
    },
};