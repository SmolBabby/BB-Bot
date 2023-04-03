/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-03 11:17:25
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 12:00:06
 */

const { Client, Routes, SlashCommandBuilder, ActivityType } = require ("discord.js");
const { REST } = require ("@discordjs/rest");
const { readdirSync } = require ("fs");
const { join } = require ("path");
const { Command, SlashCommand } = require ('../types/Commands');

const { Token_1, Token_2, ClientID, GuildID } = require ("../misc/config.json");
const Token = Token_1 + Token_2;

// Handlers module
const { commandHandler } = require("./Commands");
const { statusHandler } = require("./Status");

module.exports = async (client) => {
    await commandHandler(client);
    await statusHandler(client);
}