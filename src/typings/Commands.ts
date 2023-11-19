import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, PermissionOverwrites, PermissionResolvable } from "discord.js";
import { ExtendedClient } from "../structures/Client";



/**
 * {
 *  name: "commandname",
 *  description: "any description",
 *  run: async({ interaction }) => 
 *  {
 * 
 *  }
 * }
 */


interface RunOptions 
{
    client: ExtendedClient,
    InteractionCollector: CommandInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[],
    cooldown: number,
    run: RunFunction
} & ChatInputApplicationCommandData;