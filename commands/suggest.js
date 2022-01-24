module.exports = {
    name: 'suggest',
    description: 'DM a suggestion to the creator. *<Suggestion>*',
    category: 'Utility',
    command: true,
    execute(client, message, args) {
        const suggestionmsg = args.join(' ');
        if (!args.length) {
            return message.channel.send(`You didn't provide any suggestion, ${message.author}!`);
        } else {
            client.users.cache.get('474666235192410132').send(message.author.tag + ' suggests: ' + suggestionmsg);

            message.channel.send('Thanks for your suggestion! I shall inform my creator right away!').catch(e => {
                message.channel.send('An error as occured');
                console.log(e)
            });
            console.error();


        }
    },
};