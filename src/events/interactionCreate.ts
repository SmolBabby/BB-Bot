/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-02 20:06:49
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-02 21:03:18
 */

const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};
