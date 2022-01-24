module.exports = {
    name: "embed",
    description: 'Send the Help Menu',
    category: 'Utility',
    command: false,
    async execute(client, message, args, Discord) {
       
        const embed = new Discord.MessageEmbed()
            .setColor('7f1f1f')
            .setTitle('Rules')
            .setFooter('From BB', client.user.avatarURL())
            .setDescription('Here are the rules for this server. \n**MORE RULES MAY BE ADDED IN THE FUTURE**')
            .setTimestamp()
            .addFields(
                { name: '\u200b', value: `**1: Respect Discord's TOS\n2: No discrination in __ANY SHAPE OR FORM__\n3: Be respectful to one another. This server is made to be a safe place for everyone.\n4: Stay SFW\n5: The staff's decisions are FINAL.\n6: Use channels correctly. (Bot commands goes in #bot, no memes in general, etc)**`},
            );
        
            message.channel.send(embed);
        
    },
};