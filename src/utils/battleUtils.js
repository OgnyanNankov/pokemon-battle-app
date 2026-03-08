import { BATTLE_MESSAGES } from "../constants/battleMessages";

// Аdded a guard clause in the type advantage function to prevent runtime errors in case the API response is incomplete or undefined. This ensures the application fails gracefully instead of crashing.
export function hasTypeAdvantage(typeData, targetType) {
    if (!typeData || !typeData.damage_relations) {
        return false;
    }

    return typeData.damage_relations.double_damage_to.some(
        (item) => item.name === targetType
    );
}

export function determineBattleResult(
    previousPokemon,
    currentPokemon,
    previousTypeData,
    currentTypeData,
) {
    if (!previousPokemon || !currentPokemon) {
        return BATTLE_MESSAGES.NO_BATTLE_YET;
    }

    if (previousPokemon.primaryType === currentPokemon.primaryType) {
        return BATTLE_MESSAGES.TYPE_MATCH
    }

    if (hasTypeAdvantage(currentTypeData, previousPokemon.primaryType)) {
        return BATTLE_MESSAGES.NEW_WINS;
    }

    if (hasTypeAdvantage(previousTypeData, currentPokemon.primaryType)) {
        return BATTLE_MESSAGES.PREVIOUS_WINS;
    }

    return BATTLE_MESSAGES.NO_ADVANTAGE

}

export function updateCounters(counters, battleResult) {
    switch (battleResult) {
        case BATTLE_MESSAGES.TYPE_MATCH:
            return {
                ...counters,
                typeMatches: counters.typeMatches + 1,
            };

        case BATTLE_MESSAGES.NEW_WINS:
            return {
                ...counters,
                newWins: counters.newWins + 1,
            };

        case BATTLE_MESSAGES.PREVIOUS_WINS:
            return {
                ...counters,
                previousWins: counters.previousWins + 1,
            };

        default:
            return counters;


    }
}