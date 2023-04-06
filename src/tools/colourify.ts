/**
 * @Author: MericcaN41
 * @Date:   2023-04-03 15:04:14
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-06 15:29:46
 */

import chalk from "chalk";

type colourType = "text" | "success" | "variable" | "number" | "error" | "special"

const themeColours = {
    text: "#ff8e4d",
    success: "00FF00",
    variable: "FFDF00",
    number: "#00FFFF",
    error: "#FF0000",
    special: "#FFC0CB"
}

/**
 * Permet de colorer le texte afficher dans la console
 * @param colour La couleur à appliquer
 * @param message Le message à colorier
 * @returns La chaîne de caractère colorée
 */
export const colourify = (colour: colourType, message: any) => {
    return chalk.hex(themeColours[colour])(message)
}