module.exports = {
    name: 'credits',
    description: 'Send the credits, to show who collaborated to the bot!',
    execute(client, message, args, Discord, package) {
        const creditEmbed = new Discord.MessageEmbed()

        .setColor('#7f1f1f')
            .setTitle('CREDITS')
            .setFooter('From the Cooler BB', 'https://media.discordapp.net/attachments/714776304498507849/761839160486395944/unknown.png?width=300&height=300')
            .setDescription('BB, version ' + package.version)
            .setImage('https://cdn.discordapp.com/attachments/714785854656086106/761979397288493086/Thank_You.png')
            .addFields({ name: 'Babby#7419', value: 'Created the bot\nand coded it.', inline: true }, { name: 'This POS#3368', value: 'Helped with coding', inline: true }, /*{ name: 'Sova#3681', value: 'Made BB\'s PFP.', inline: true },*/ )
            .setTimestamp()

        message.channel.send(creditEmbed);
    },
};