/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-02 19:58:12
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-02 22:39:19
 */

import { Events } from "discord.js";

const handler = require("../handlers/Commands");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		console.log("LOADING COMMANDS")
		await handler(client);

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
