module.exports = {
    name: 'leaderboard',
    description: 'Shows the leaderboard for this server',
    category: 'Money',
    command: true,
    async execute(client, message, args, user, Discord, db, economy) {


        const allUsers = economy.all();
        var userList = '';
        let i = 0
        let inGuild = false;

        await allUsers.sort(function(a, b) {
            var x = a.data.user.balance;
            var y = b.data.user.balance;
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });


        await allUsers.forEach(entry => {

            inGuild = false;
            if (typeof entry.data.user == 'undefined') {
                return
            }
            entry.data.user.guilds.forEach(guild => {
                if (guild == message.guild.id) {
                    inGuild = true;
                    return
                }
            });


            if (!inGuild) {
                return
            }
            if (i == 10) {
                return
            }

            i++;
            userList = userList + `**${i},** ${entry.data.user.username} • ${entry.data.user.balance} 🔰\n`;

        });


        message.channel.send(new Discord.MessageEmbed()
            .setTitle('LEADERBOARD')
            .setDescription(userList)
            .setColor('#7f1f1f')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter('From BB', client.user.avatarURL)
            .setTimestamp());



    },
};