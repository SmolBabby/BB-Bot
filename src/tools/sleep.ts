/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-03 23:12:44
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 23:21:55
 */


const SickLoader : boolean = true;

/**
 * Atttend un moment donné en paramètre.
 * @param ms Le temps d'attente (En ms)
 */
export function sleep(ms) {
    
    if (!SickLoader) { return }
    return new Promise(resolve => setTimeout(resolve, ms));
}