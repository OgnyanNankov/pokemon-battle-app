import { BATTLE_MESSAGES } from "../constants/battleMessages";

export function hasTypeAdvantage(typeData, targetType) {
    return typeData.damage.relations.double_damage_to.some(
        (item) => item.name === targetType,
    );
}

export function determineBattleResults(
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
                npreviousWins: counters.previousWins + 1,
            };

        default:
            return counters;


    }
}