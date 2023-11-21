const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const HANDLER = require("./handlers/commandHandler");
import dotenv from 'dotenv'; 

dotenv.config();

const TOKEN = process.env.botToken;
const CLIENT = new Client({ intents: 32767});

CLIENT.commands = new Collection();

(async () => 
{
    console.info("=== BB-BOT ===");

    // Swag points
    await new Promise(r => setTimeout(r, 1000));

    await HANDLER.loadCommandsFromFiles(CLIENT.commands);
    await HANDLER.registerCommands();
    
    // Log in to Discord with your client's token
    CLIENT.login(TOKEN);
})();

// We use 'c' for the event parameter to keep it separate from the already defined 'client'
CLIENT.once(Events.ClientReady, c => {
	console.info(`Ready! Logged in as ${c.user.tag}`);
});

CLIENT.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
    try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


