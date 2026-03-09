import { describe, expect, it } from "vitest";
import { getPrimaryType, mapPokemonData } from "../utils/pokemonUtils";

describe("mapPokemonData", () => {
  it("maps the raw API response into a normalized pokemon object", () => {
    const rawPokemon = {
      id: 25,
      name: "pikachu",
      sprites: {
        front_default: "https://example.com/pikachu.png",
      },
      height: 4,
      weight: 60,
      types: [
        {
          slot: 1,
          type: { name: "electric" },
        },
      ],
      stats: [
        { base_stat: 35 },
        { base_stat: 55 },
        { base_stat: 40 },
      ],
    };

    const result = mapPokemonData(rawPokemon);

    expect(result).toEqual({
      id: 25,
      name: "pikachu",
      image: "https://example.com/pikachu.png",
      height: 4,
      weight: 60,
      types: ["electric"],
      primaryType: "electric",
      baseStatTotal: 130,
    });
  });

  it("sorts types by slot before mapping them", () => {
    const rawPokemon = {
      id: 6,
      name: "charizard",
      sprites: {
        front_default: "https://example.com/charizard.png",
      },
      height: 17,
      weight: 905,
      types: [
        {
          slot: 2,
          type: { name: "flying" },
        },
        {
          slot: 1,
          type: { name: "fire" },
        },
      ],
      stats: [
        { base_stat: 78 },
        { base_stat: 84 },
      ],
    };

    const result = mapPokemonData(rawPokemon);

    expect(result.types).toEqual(["fire", "flying"]);
    expect(result.primaryType).toBe("fire");
  });

  it('returns "unknown" as primaryType when slot 1 is missing', () => {
    const rawPokemon = {
      id: 999,
      name: "unknownmon",
      sprites: {
        front_default: "https://example.com/unknownmon.png",
      },
      height: 10,
      weight: 100,
      types: [
        {
          slot: 2,
          type: { name: "ghost" },
        },
      ],
      stats: [
        { base_stat: 50 },
      ],
    };

    const result = mapPokemonData(rawPokemon);

    expect(result.primaryType).toBe("unknown");
  });
});

describe("getPrimaryType", () => {
  it("returns the primary type when pokemon exists", () => {
    const pokemon = {
      primaryType: "water",
    };

    expect(getPrimaryType(pokemon)).toBe("water");
  });

  it('returns "unknown" when pokemon is null', () => {
    expect(getPrimaryType(null)).toBe("unknown");
  });
});