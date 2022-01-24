module.exports = {
    name: 'pet',
    description: 'Pet someone! <@mention>',
    category: 'Fun',
    command: true,
    async execute(client, message, args, pfp) {

        const patpic = require('petpicjs');

        const taggedUser = message.mentions.users.first() || message.author;



        await patpic(taggedUser.avatarURL({ format: "png" }))
        message.channel.send('*pat pat pat*', { files: ['./patpat.gif'] })

    },


};