/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-02 23:19:41
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-02 23:20:14
 */

import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types/Commands";

const command : SlashCommand = {
    data: new SlashCommandBuilder()
    .setName("thug")
    .setDescription("You already know..."),
    execute: interaction => {
        interaction.reply("https://i.makeagif.com/media/2-10-2023/6KDnqu.gif");
    }
}

export default command;