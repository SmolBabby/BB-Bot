import { Command } from "../../structures/Command";

export default new Command({
    name: "ping",
    description: "replies with pong",
    cooldown: 0,
    run: async ({ interaction }) => {
        interaction.followUp("Pong!");
    }
});