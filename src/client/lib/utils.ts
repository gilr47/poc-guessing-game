/**
 * this function gets a random whole number between min and max
 * @param {number} min whole number
 * @param {number} max whole number
 * @returns a whole random number
 */

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}
