const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: { reply: (arg0: string) => any; }) {

        // Code de la commande

		await interaction.reply('Pong!');


	},
};
