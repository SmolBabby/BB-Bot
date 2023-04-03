/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-02 18:33:42
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 11:13:02
 */

import { Client, Events, ClientOptions, GatewayIntentBits, Collection } from "discord.js";
import { Token_1, Token_2, ClientID, GuildID } from "./misc/config.json";
import { SlashCommand, Command } from "./types/Commands";

const Ready = require("./events/ready")
const Token = Token_1 + Token_2;

const CLIENT = new Client({
    intents: [GatewayIntentBits.Guilds]
});
CLIENT.slashCommands = new Collection<string, SlashCommand>()
CLIENT.commands = new Collection<string, Command>()
CLIENT.cooldowns = new Collection<string, number>()

console.log("Bot is starting...");


CLIENT.once(Events.ClientReady, c => {
    Ready.execute(CLIENT);
});


// Receiving command interactions
CLIENT.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.slashCommands.get(interaction.commandName);

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
});

// Log in to Discord with your client's token
CLIENT.login(Token);