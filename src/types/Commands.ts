/**
 * @Author: MericcaN41
 * @Date:   2023-04-02 21:14:40
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-02 22:28:19
 */

import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction } from "discord.js";

/**
 * Interface pour les commandes "Slash"
 */
export interface SlashCommand {
    data: SlashCommandBuilder | any,
    execute: (interaction : CommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    cooldown?: number // in seconds
}

/**
 * Interface pour les commandes de base
 */
export interface Command {
    name: string,
    execute: (message: Message, args: Array<string>) => void,
    permissions: Array<PermissionResolvable>,
    aliases: Array<string>,
    cooldown?: number,
}

// Exension de l'interface client afin de stocker les commandes
declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        commands: Collection<string, Command>,
        cooldowns: Collection<string, number>
    }
}