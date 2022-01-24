module.exports = {
    name: 'sleep',
    description: 'Tell someone to go to sleep. *[@mention]*',
    category: 'Fun',
    command: true,
    execute(client, message, args, Discord) {
        const user = message.mentions.users.first() || message.author;

        var receiver = user.username;

        const sleepEmbed = new Discord.MessageEmbed()
            .setColor('#7f1f1f')
            .setTitle(receiver + '!')
            .setThumbnail(user.displayAvatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter('From BB', client.user.avatarURL)
            .setDescription('It\'s getting kinda late, you know... Go to sleep please :3')
            .setThumbnail(user.displayAvatarURL())
            .setImage('https://media.discordapp.net/attachments/714844709310300192/720992929551876146/image0.png')
            .setTimestamp();

        message.channel.send(sleepEmbed);
    }
};