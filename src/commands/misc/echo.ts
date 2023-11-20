import { SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Sends back the same message provided.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to send.')
                .setRequired(true)),
	async execute(interaction) {
        const message = <string>interaction.options.get("message")?.value;
        interaction.reply(message);
	},
};

