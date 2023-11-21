
import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder, ColorResolvable } from "discord.js"
import { readdirSync } from "fs";
import { join } from "path";


module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Need some help?"),
    execute: interaction => {


        // Embed du menu d'aide
        const helpEmbed = new EmbedBuilder()
            .setColor(0x990000)
            .setTitle('Help Menu')
            // .setAuthor({ name: interaction., iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            .setDescription('Need a little help?')
            .setTimestamp()
            .setFooter({text: "From BB-Bot", iconURL: interaction.client.user.displayAvatarURL()});

        let slashCommandsDir = join(__dirname, "../../commands");

        // Chargement des commandes Slash
        readdirSync(slashCommandsDir).forEach(folder => 
        {
            readdirSync(join(slashCommandsDir, `./${folder}`)).forEach(file =>
            {
                if (!file.endsWith(".ts")) return;
                let command = require(`${slashCommandsDir}/${folder}/${file}`);
                helpEmbed.addFields({ name: `/${command.data.name}`, value: command.data.description });
            })
        });

        interaction.reply({ embeds: [helpEmbed], ephemeral: false });
    }
}
