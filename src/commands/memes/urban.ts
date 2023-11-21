import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder, ColorResolvable, Client } from "discord.js"
const ud = require('urban-dictionary')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("urban")
        .setDescription("Look up a word in the Urban Dictionary.")
        .addStringOption(option =>
            option.setName('term')
                .setDescription('The message to send.')
                .setRequired(true)),
    execute: interaction => {


        const TERM = interaction.options.getString('term');

        ud.define(TERM, (error, results) => {
            if (error) {
              console.error(`define (callback) error - ${error.message}`)
              return
            }
          
            var result = Object.entries(results[0]);
            var definition = result[0];
            var word = result[5];
            var examples = results[9];

            word.shift();
            definition.shift();
            examples = examples.example

            // Embed du menu d'aide
            const udEmbed = new EmbedBuilder()
            .setColor('#990000')
                    .setTitle(`Definition of: "${TERM}"`)
                    .setAuthor({ name: "From Urban Dictionary", iconURL: 'https://play-lh.googleusercontent.com/unQjigibyJQvru9rcCOX7UCqyByuf5-h_tLpA-9fYH93uqrRAnZ0J2IummiejMMhi5Ch', url: 'https://www.urbandictionary.com/' })
                    .addFields({ name: 'Definitions', value: definition[0] }, { name: 'Examples', value: examples })
                    .setTimestamp()
                    .setFooter({text: "From BB-Bot", iconURL: interaction.client.user.displayAvatarURL()});

            interaction.reply({ embeds: [udEmbed], ephemeral: false });

          })

        
    }
}
