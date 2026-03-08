import { getRandomPokemonId } from "../utils/random";
import mapPokemondata from "../utils/pokemonUtils";

const POKEMON_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const TYPE_BASE_URL = "https://pokeapi.co/api/v2/type";

export async function getRandomPokemon() {
    const id = getRandomPokemonId();

    const response = await fetch(`${POKEMON_BASE_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch Pokémon");
    }
    const data = await response.json()
    const mappedPokemon = mapPokemondata(data)

    return mappedPokemon;
}

export async function getTypeByName(typeName) {
    const response = await fetch(`${TYPE_BASE_URL}/${typeName}`);

    if (!response.ok) {
        throw new Error("Failed to fetch type data");
    }

    const data = await response.json()
    return data;
}