/**
 * @Author: Loïc Boiteux
 * @Date:   2023-04-03 14:03:57
 * @Last Modified by:   Loïc Boiteux
 * @Last Modified time: 2023-04-03 14:05:14
 */

/**
 * Retourne le string en paramètre avec le premier caractère en majuscule.
 * @param word Le mot à ajouter une majuscule.
 */
export function letterCapitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
}
  