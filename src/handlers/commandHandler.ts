import { Client, Collection, REST, Routes } from 'discord.js';
import { profile } from 'node:console';
import fs from 'node:fs';
import path from 'node:path';

module.exports = 
{
    loadCommandsFromFiles: async (commands: Collection<string, any>) => 
    {

        const foldersPath = path.join(__dirname, '../commands');
        const commandFolders = fs.readdirSync(foldersPath);

        console.info(`Loading commands...`);
        for (const folder of commandFolders) {
	        const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
            console.info(`[*] Reading commands in folder "${folder}"`);
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                // console.info(`[*] Reading ${filePath}`);

                const command = require(filePath);
                // Set a new item in the Collection with the key as the command name and the value as the exported module
                if ('data' in command && 'execute' in command) {
                    console.info(`[+] Loading command ${command.data.name}.ts`);
                    commands.set(command.data.name, command);
                }
            }
        }
    },

    registerCommands: async () =>
    {
        const commands = [];
        // Grab all the command folders from the commands directory you created earlier
        const foldersPath = path.join(__dirname, '../commands');
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) {
            // Grab all the command files from the commands directory you created earlier
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
            // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    commands.push(command.data.toJSON());
                }
            }
        }

        // Construct and prepare an instance of the REST module
        const rest = new REST().setToken(process.env.botToken);

        // and deploy your commands!
        (async () => {
            try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);

                // The put method is used to fully refresh all commands in the guild with the current set
                const data: any = await rest.put(
                    Routes.applicationCommands(process.env.clientId),
                    { body: commands },
                );
                

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                // And of course, make sure you catch and log any errors!
                console.error(error);
            }
        })();
    }
}

