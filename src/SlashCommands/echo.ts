/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-11 09:59:39
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-11 10:00:10
 */

import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types/Commands";

const command : SlashCommand = {
    data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Sends back the same message provided.")
    .addStringOption(option =>
		option.setName('message')
			.setDescription('The message to send.')
			.setRequired(true)),
    execute: interaction => {
        const message = <string>interaction.options.get("message")?.value;
        interaction.reply(message);
    }
}

export default command;