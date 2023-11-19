import { GuildMember, ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, PermissionOverwrites, PermissionResolvable } from "discord.js";
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
export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions 
{
    client: ExtendedClient,
    interaction: CommandInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[],
    cooldown: number,
    run: RunFunction
} & ChatInputApplicationCommandData;