/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-03 11:17:25
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 15:40:59
 */

import { colourify } from "../tools/colourify";

// Packages
const { Client, Routes, SlashCommandBuilder, ActivityType } = require ("discord.js");
const { REST } = require ("@discordjs/rest");
const { readdirSync } = require ("fs");
const { join } = require ("path");
const { Command, SlashCommand } = require ('../types/Commands');


// Handlers module
const { commandHandler } = require("./commandsHandler");
const { statusHandler } = require("./statusHandler");

// Constantes
const { Token_1, Token_2, ClientID, GuildID } = require ("../misc/config.json");
const Token = Token_1 + Token_2;



module.exports = async (client) => {
    
    console.log(colourify('text', "* "), `Booting up ${colourify('variable', "commandsHandler.ts")}`)
    await commandHandler(client);

    console.log(colourify('text', "* "), `Booting up ${colourify('variable', "statusHandler.ts")}`)
    await statusHandler(client);
}