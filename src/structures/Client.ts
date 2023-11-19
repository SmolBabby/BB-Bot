import { Application, ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from "discord.js"
import { CommandType } from "../typings/Commands"
import { glob } from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/client";
import { EventType } from "./Event";


const GLOB_PROMISE = promisify(glob);


export class ExtendedClient extends Client 
{
    commands: Collection<string, CommandType> = new Collection();

    constructor()
    {
        // super() to call the Discord.Client constructor
        // intents 32767 means ALL intents
        super({ intents: 32767});
    }


    /**
     * The main entry to the bot. Loads everything
     */
    async start()
    {
        console.info(`Starting up...`);
        await this.registerModules();
        await this.login(process.env.botToken);
    }


    /**
     * Imports a file and returns it
     * @param filePath The path to the file to import
     * @returns The file passed in
     */
    async importFile(filePath: string)
    {
        return (await import(filePath))?.default;
    }


    /**
     * Sends the commands to discord 
     * @param RegisterCommandsOptions The options of the command to register
     */
    async registerCommands({commands, guildId}: RegisterCommandsOptions) 
    {
        if (guildId)
        {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.info(`[+] Registering commands to ${guildId}`);
        }
        else
        {
            this.application?.commands.set(commands);
            console.info(`[+] Registering global commands`);
        }
    }


    /**
     * Creates an array of commands to publish to Discord
     */
    async registerModules()
    {
        // Registering the commands
        const SLASH_COMMANDS: ApplicationCommandDataResolvable[] = [];
        const COMMAND_FILES: string[] = await glob(`${__dirname}/../commands/*/*{.ts,.js}`);
        console.info(`[*] Looking for commands in ${COMMAND_FILES.length} files`);
        
        COMMAND_FILES.forEach(async filePath => 
            {
                const COMMAND: CommandType = await this.importFile(filePath);
                if (!COMMAND.name)
                {
                    console.warn(`[-] No command found in ${filePath}`);
                    return;
                }
                this.commands.set(COMMAND.name, COMMAND);
                SLASH_COMMANDS.push(COMMAND);
                
                console.info(`[+] Loaded command ${COMMAND.name} from ${filePath}`);
            })
        
        // Event
        const EVENT_FILES: string[] = await glob(`${__dirname}/../events/*{.ts,.js}`);

        EVENT_FILES.forEach(async filePath => 
            {
                const EVENT: EventType<keyof ClientEvents> = await this.importFile(filePath);
                this.on(EVENT.event, EVENT.run);
            })
    }
}