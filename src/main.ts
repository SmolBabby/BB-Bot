/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-02 18:33:42
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-02 19:46:09
 */
import { Client, Events, ClientOptions } from "discord.js";

import ready from "./events/ready";
const CONFIG = require("../misc/config.json");

console.log("Bot is starting...");
 
const CLIENT = new Client({
    intents: []
});


ready(CLIENT);

// Log in to Discord with your client's token
CLIENT.login(CONFIG.token);


console.log(CLIENT);