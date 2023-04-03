/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-02 19:58:12
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-02 22:32:21
 */


import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types/Commands";

const command : SlashCommand = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong!"),
    execute: interaction => {
        interaction.reply("Pong!");
    }
}

export default command;