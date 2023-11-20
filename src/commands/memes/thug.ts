import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
    .setName("thug")
    .setDescription("You already know..."),
    execute: interaction => {
        interaction.reply("https://i.makeagif.com/media/2-10-2023/6KDnqu.gif");
    }
};
