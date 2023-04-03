/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-02 19:58:12
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 12:09:28
 */

import { Client, Events, ActivityType } from "discord.js";

const mainHandler = require("../handlers/mainHandler");

module.exports = {
	name: Events.ClientReady,
	once: true,
	 execute(client) {

		mainHandler(client).then((result) => {
			console.log(`Ready! Logged in as ${client.user.tag}`);
		}).catch((err) => {
			console.log(err);
			
		});
		
	},
};
