export function mapPokemonData(data) {
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        types: data.types
            .sort((a, b) => a.slot - b.slot)
            .map((item) => item.type.name),
        primaryType:
            data.types.find((item) => item.slot === 1)?.type.name ?? "unknown",
        baseStatTotal: data.stats.reduce(
            (sum, stat) => sum + stat.base_stat,
            0,
        ),
    };
}

export function getPrimaryType(pokemon) {
    return pokemon?.primaryType ?? "unknown";
}