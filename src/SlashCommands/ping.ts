/**
 * @Author: MericcaN41
 * @Date:   2023-04-02 19:58:12
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 13:59:04
 */


import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types/Commands";

const command : SlashCommand = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
    execute: interaction => {
        interaction.reply("Pong!");
    }
}

export default command;