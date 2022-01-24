module.exports = {
    name: 'ud',
    description: 'Send an Urban Dictionary definition! *<Something>*',
    category: 'Fun',
    command: true,
    execute(client, message, args, ud, Discord) {
        ud.define(args.join(' ')).then((results) => {
            console.log('define (promise)')
            
            var result = Object.entries(results[0]);
            console.log(result);
            var definition = result[0];
            var word = result[5];
            var examples = results[9];

            word.shift();
            definition.shift();
            examples = examples.example
            

            const udEmbed = new Discord.MessageEmbed()
                    .setColor('#ff9900')
                    .setTitle(`Definition of: ${word}`)
                    .setAuthor('From Urban Dictionary', 'https://play-lh.googleusercontent.com/unQjigibyJQvru9rcCOX7UCqyByuf5-h_tLpA-9fYH93uqrRAnZ0J2IummiejMMhi5Ch', 'https://www.urbandictionary.com/')
                    .addFields(
                        { name: 'Definition', value: definition, inline: false }, { name: 'Examples', value: examples, inline: false },
                    )
                    .setTimestamp()
                    .setFooter('From BB-bot', client.user.avatarURL());

                message.channel.send(udEmbed);
        });

    },
};