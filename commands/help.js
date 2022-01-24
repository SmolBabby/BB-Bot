module.exports = {
    name: 'help',
    description: 'Send the Help Menu',
    category: 'Utility',
    command: true,
    execute(client, message, args, package) {

        const Discord = require('discord.js');

        var helpList = client.commands.array();
        var Utility = '';
        var Fun = '';
        var Game = '';
        var Money = '';
        var Other = '';

        for (i in helpList) {
            if (i == 0) {
                continue;
            }
            if (helpList[i].command == false) {
                continue
            }
            if (helpList[i].category == 'Fun') {
                Fun = Fun + '\n`' + helpList[i].name + ':` ' + helpList[i].description;
            } else if (helpList[i].category == 'Game') {
                Game = Game + '\n`' + helpList[i].name + ':` ' + helpList[i].description;
            } else if (helpList[i].category == 'Utility') {
                Utility = Utility + '\n`' + helpList[i].name + ':` ' + helpList[i].description;
            } else if (helpList[i].category == 'Money') {
                Money = Money + '\n`' + helpList[i].name + ':` ' + helpList[i].description;
            } else if (helpList[i].category == 'Other') {
                Other = Other + '\n`' + helpList[i].name + ':` ' + helpList[i].description;
            }
        }

        if (!Fun) {
            Fun = 'No commands :|';
        }
        if (!Utility) {
            Utility = 'No commands :|';
        }
        if (!Money) {
            Money = 'No commands :|';
        }
        if (!Other) {
            Other = 'No commands :|';
        }

        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#7f1f1f')
            .setTitle('Help Menu')
            .setDescription('BB version ' + package.version + '\n\n<argument>: obligatory\n[argument]: optional.\n')
            .addFields({ name: '**FUN**', value: Fun, inline: false }, { name: '**GAME**', value: Game, inline: false }, { name: '**MONEY**', value: Money, inline: false }, { name: '**UTILITY**', value: Utility, inline: false }, { name: '**OTHER**', value: Other, inline: false }, { name: '\u200B', value: '`credits:` Shows the credits.', inline: true })
            .setTimestamp()
            .setFooter('From BB', `${client.user.avatarURL()}`);

        message.channel.send(helpEmbed);
    },
};