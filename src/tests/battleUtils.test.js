import { describe, expect, it } from "vitest";
import {
    determineBattleResult,
    updateCounters,
} from "../utils/battleUtils";
import { BATTLE_MESSAGES } from "../constants/battleMessages";

describe("determineBattleResult", () => {
    it("returns TYPE_MATCH when both primary types are the same", () => {
        const previousPokemon = { primaryType: "fire" };
        const currentPokemon = { primaryType: "fire" };

        const previousTypeData = {
            damage_relations: { double_damage_to: [] },
        };

        const currentTypeData = {
            damage_relations: { double_damage_to: [] },
        };

        const result = determineBattleResult(
            previousPokemon,
            currentPokemon,
            previousTypeData,
            currentTypeData,
        );

        expect(result).toBe(BATTLE_MESSAGES.TYPE_MATCH);
    });

    it("returns NEW_WINS when current type has advantage", () => {
        const previousPokemon = { primaryType: "fire" };
        const currentPokemon = { primaryType: "water" };

        const previousTypeData = {
            damage_relations: { double_damage_to: [] },
        };

        const currentTypeData = {
            damage_relations: {
                double_damage_to: [{ name: "fire" }],
            },
        };

        const result = determineBattleResult(
            previousPokemon,
            currentPokemon,
            previousTypeData,
            currentTypeData,
        );

        expect(result).toBe(BATTLE_MESSAGES.NEW_WINS);
    });

    it("returns PREVIOUS_WINS when previous type has advantage", () => {
        const previousPokemon = { primaryType: "electric" };
        const currentPokemon = { primaryType: "water" };

        const previousTypeData = {
            damage_relations: {
                double_damage_to: [{ name: "water" }],
            },
        };

        const currentTypeData = {
            damage_relations: { double_damage_to: [] },
        };

        const result = determineBattleResult(
            previousPokemon,
            currentPokemon,
            previousTypeData,
            currentTypeData,
        );

        expect(result).toBe(BATTLE_MESSAGES.PREVIOUS_WINS);
    });

    it("returns NO_ADVANTAGE when neither type has advantage", () => {
        const previousPokemon = { primaryType: "normal" };
        const currentPokemon = { primaryType: "ghost" };

        const previousTypeData = {
            damage_relations: { double_damage_to: [] },
        };

        const currentTypeData = {
            damage_relations: { double_damage_to: [] },
        };

        const result = determineBattleResult(
            previousPokemon,
            currentPokemon,
            previousTypeData,
            currentTypeData,
        );

        expect(result).toBe(BATTLE_MESSAGES.NO_ADVANTAGE);
    });
});

describe("updateCounters", () => {
    it("increments typeMatches for TYPE_MATCH", () => {
        const counters = {
            typeMatches: 0,
            newWins: 0,
            previousWins: 0,
        };

        const updated = updateCounters(counters, BATTLE_MESSAGES.TYPE_MATCH);

        expect(updated).toEqual({
            typeMatches: 1,
            newWins: 0,
            previousWins: 0,
        });
    });

    it("increments newWins for NEW_WINS", () => {
        const counters = {
            typeMatches: 0,
            newWins: 0,
            previousWins: 0,
        };

        const updated = updateCounters(counters, BATTLE_MESSAGES.NEW_WINS);

        expect(updated).toEqual({
            typeMatches: 0,
            newWins: 1,
            previousWins: 0,
        });
    });

    it("increments previousWins for PREVIOUS_WINS", () => {
        const counters = {
            typeMatches: 0,
            newWins: 0,
            previousWins: 0,
        };

        const updated = updateCounters(counters, BATTLE_MESSAGES.PREVIOUS_WINS);

        expect(updated).toEqual({
            typeMatches: 0,
            newWins: 0,
            previousWins: 1,
        });
    });
});