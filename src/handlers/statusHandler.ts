/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-03 11:48:57
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 23:24:23
 */

import { ActivityType } from "discord.js";
import statusList from "../misc/status.json";

import { colourify } from "../tools/colourify";
import { sleep } from "../tools/sleep";

/**
 * Choisi un status au hasard du fichier "status.json" et l'applique
 * @param client Le client du bot
 */
export const statusHandler = async (client) => {

    console.log(colourify('text', "* "), `Loading status from ${colourify('variable', "config.json")}...`);
    // Donne un index aléatoire
    let i : number = Math.floor(Math.random() * statusList.length);

    console.log(colourify('text', "* "), `Setting up status...`);

    // Artificial time cos it looks cool af
    await sleep(1500);

    // Set presence
    await client.user.presence.set(statusList[i]);

    // Artificial time cos it looks cool af
    await sleep(1500);

    console.log(colourify('text', "* "), colourify('success', "Status set!"));
    return;
}