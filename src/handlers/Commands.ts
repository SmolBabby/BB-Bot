/**
 * @Author: MericcaN41
 * @Date:   2023-04-02 20:16:28
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-02 23:25:54
 */

import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { Command, SlashCommand } from 'src/types/Commands';

import { Token, clientID, guildID } from "../misc/config.json";

module.exports = async (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = [];
    const commands : Command[] = [];

    let slashCommandsDir = join(__dirname,"../slashCommands");
    let commandsDir = join(__dirname,"../commands");

    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".ts")) return;
        let command : SlashCommand = require(`${slashCommandsDir}/${file}`).default;
        slashCommands.push(command.data);

        client.slashCommands.set(command.data.name, command);
    });

    
    readdirSync(commandsDir).forEach(file => {
        if (!file.endsWith(".ts")) return;
        let command : Command = require(`${commandsDir}/${file}`).default;
        commands.push(command);
        client.commands.set(command.name, command);
    });

    
    const rest = new REST({version: "10"}).setToken(Token);

    // Routes.applicationCommands(clientID)
    rest.put(Routes.applicationGuildCommands(clientID, guildID), {
        body: slashCommands.map(command => command.toJSON())
    })
    .then((data : any) => {
        console.log(`🔥 Successfully loaded ${data.length} slash command(s)`);
        console.log(`🔥 Successfully loaded ${commands.length} command(s)`);
    }).catch(e => {
        console.log(e);
    })
}
