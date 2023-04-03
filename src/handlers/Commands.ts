/**
 * @Author: MericcaN41
 * @Date:   2023-04-02 20:16:28
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 12:51:49
 */

// Packages
import { Client, Routes, SlashCommandBuilder, ActivityType } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import { Command, SlashCommand } from 'src/types/Commands';



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
    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith(".ts")) return;
        let command : SlashCommand = require(`${slashCommandsDir}/${file}`).default;
        console.log(`* Loading Slash command from ${file}`)
        slashCommands.push(command.data);

        client.slashCommands.set(command.data.name, command);
    });

    // Chargement des commandes Message
    readdirSync(commandsDir).forEach(file => {
        if (!file.endsWith(".ts")) return;
        let command : Command = require(`${commandsDir}/${file}`).default;
        console.log(`* Loading message command from ${file}`)
        commands.push(command);
        
        client.commands.set(command.name, command);
    });

    
    // Envoie des commandes à Discord
    const rest = new REST({version: "10"}).setToken(Token);

    // Routes.applicationCommands(clientID)
    console.log("* Sending commands to discord...")
    await rest.put(Routes.applicationGuildCommands(ClientID, GuildID), {
        body: slashCommands.map(command => command.toJSON())
    })
    .then((data : any) => {
        console.log(`* Successfully loaded ${data.length} slash command(s)`);
        console.log(`* Successfully loaded ${commands.length} command(s)`);
    }).catch(e => {
        console.log(e);
    })

    console.log("* Commands sent!")
    return;
}
