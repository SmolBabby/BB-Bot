/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-03 11:48:57
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 15:27:47
 */

import { ActivityType } from "discord.js";
import statusList from "../misc/status.json";

import { colourify } from "../tools/colourify";

/**
 * Choisi un status au hasard du fichier "status.json" et l'applique
 * @param client Le client du bot
 */
export const statusHandler = async (client) => {

    // Donne un index aléatoire
    let i : number = Math.floor(Math.random() * statusList.length);

    await client.user.presence.set(statusList[i]);

    console.log(colourify('text', "* "), colourify('success', "Status set!"))
    return;
}