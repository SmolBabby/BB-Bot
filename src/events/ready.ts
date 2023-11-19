import { EventType } from "../structures/Event";

export default new EventType("ready", () =>
{
    console.log("Bot is online");
});