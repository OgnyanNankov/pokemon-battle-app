export function getRandomPokemonId(max = 1025) {
    return Math.floor(Math.random() * max) + 1;
}