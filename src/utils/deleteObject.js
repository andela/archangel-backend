/**
 * This function deletes object properties that
 * aren't neede when a get request is made
 * @param {object} obj - Represents the object to be deleted from 
 * @param {array} prop - A stringed property or a stringed comma separated list of properties ['a', 'b']
 */

export function deleteProps(obj, prop) {
    for (const p of prop) {
        (p in obj) && (delete obj[p]);
    }
}