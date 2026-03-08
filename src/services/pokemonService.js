import { getRandomPokemonId } from "../utils/random";
import mapPokemondata from "../utils/pokemonUtils";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function getRandomPokemon() {
    const id = getRandomPokemonId();

    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch Pokémon");
    }
    const data = await response.json()
    const mappedPokemon = mapPokemondata(data)

    return mappedPokemon;
}
