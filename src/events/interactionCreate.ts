import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { EventType } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Commands";

export default new EventType("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return interaction.followUp("You have used a non-existent command.");

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        });
    }
});