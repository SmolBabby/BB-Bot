/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-11 09:40:32
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-11 09:41:28
 */

import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types/Commands";

const command : SlashCommand = {
    data: new SlashCommandBuilder()
    .setName("reddit")
    .setDescription("Sends posts from a provided subreddit."),
    execute: interaction => {
        interaction.reply("https://i.makeagif.com/media/2-10-2023/6KDnqu.gif");
    }
}

export default command;