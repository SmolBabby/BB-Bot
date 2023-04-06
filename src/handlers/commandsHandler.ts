/**
 * @Author: MericcaN41
 * @Date:   2023-04-02 20:16:28
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-06 15:34:23
 */

// Packages
import { Client, Routes, SlashCommandBuilder, ActivityType } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { Command, SlashCommand } from '../types/Commands';

import { colourify } from "../tools/colourify";
import { sleep } from "../tools/sleep";


// Constantes
import { Token_1, Token_2, ClientID, GuildID } from "../misc/config.json";
const Token = Token_1 + Token_2;

/**
 * Charge toutes les commandes du bot
 * @param client Le client du bot
 */
export const commandHandler = async (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = [];
    const commands : Command[] = [];

    let slashCommandsDir = join(__dirname,"../slashCommands");
    let commandsDir = join(__dirname,"../commands");

    // Chargement des commandes Slash
    console.log(colourify('text', "* "), `Loading slash commands from files...`);
    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".ts")) return;
        let command : SlashCommand = require(`${slashCommandsDir}/${file}`).default;
        console.log(colourify('text', "* "), `Loading slash command from ${colourify('variable',file)}`)
        slashCommands.push(command.data);

        client.slashCommands.set(command.data.name, command);
    });

    // Artificial time cos it looks cool af
    await sleep(1000);

    // Chargement des commandes Message
    console.log(colourify('text', "* "), `Loading message commands from files...`);
    readdirSync(commandsDir).forEach(file => {
        if (!file.endsWith(".ts")) return;
        let command : Command = require(`${commandsDir}/${file}`).default;
        console.log(colourify('text', "* "), `Loading message command from ${colourify('variable', file)}`)
        commands.push(command);
        
        client.commands.set(command.name, command);
    });

    // Artificial time cos it looks cool af
    await sleep(1000);
    
    // Envoie des commandes à Discord
    console.log(colourify('text', "* "), "Sending commands to Discord...");
    
    // Artificial time cos it looks cool af
    await sleep(3000, true);

    // Routes.applicationCommands(clientID)
    const rest = new REST({version: "10"}).setToken(Token);
    await rest.put(Routes.applicationGuildCommands(ClientID, GuildID), {
        body: slashCommands.map(command => command.toJSON())
    })
    .then((data : any) => {
        console.log(colourify('text', "* "), `Successfully loaded ${colourify('number', data.length)} slash command(s)`);
        console.log(colourify('text', "* "), `Successfully loaded ${colourify('number', commands.length)} message command(s)`);
    }).catch(e => {
        console.log(e);
    })

    console.log(colourify('text', "* "), colourify('success', "Commands sent!"));
    // Artificial time cos it looks cool af
    await sleep(750);
    return;
}
