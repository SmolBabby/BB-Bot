/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-02 19:45:12
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-02 19:45:21
 */

import { Client } from "discord.js";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        console.log(`${client.user.username} is online`);
    });
}; 