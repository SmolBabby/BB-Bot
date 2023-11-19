import { EventType } from "../structures/Events";

export default new EventType("ready", () =>
{
    console.log("Bot is online");
});