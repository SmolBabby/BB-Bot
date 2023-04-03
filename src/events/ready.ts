/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-02 19:58:12
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 11:58:08
 */

import { Client, Events, ActivityType } from "discord.js";

const mainHandler = require("../handlers/mainHandler");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {

		await mainHandler(client);
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
