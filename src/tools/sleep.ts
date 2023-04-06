/*
 * @Author: Loïc Boiteux
 * @Date:   2023-04-03 23:12:44
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-06 15:54:00
 */

// Variable de debug : Est-ce que sleep est actif ou non
const SickLoader : boolean = true;

/**
 * Atttend un moment donné en paramètre avant de poursuivre l'exécution
 * @param delayMS Le temps d'attente (En ms)
 */
export function sleep(delayMS: number, forceWait?: boolean) {
    if (!forceWait && !SickLoader) { return }
    return new Promise(resolve => setTimeout(resolve, delayMS));
}