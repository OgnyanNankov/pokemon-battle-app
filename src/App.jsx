import { useState, useCallback, useMemo } from "react";
import "./App.css";
import { getRandomPokemon, getTypeByName } from "./services/pokemonService";
import { BATTLE_MESSAGES } from "./constants/battleMessages";
import { determineBattleResult, updateCounters } from "./utils/battleUtils";
import LoadPokemonButton from "./components/LoadPokemonButton/LoadPokemonButton";
import BattleResult from "./components/BattleResult/BattleResult";
import CountersPanel from "./components/CountersPanel/CountersPanel";
import { BattleArena } from "./components/BattleArena/BattleArena";

function App() {
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [battleResult, setBattleResult] = useState(
    BATTLE_MESSAGES.NO_BATTLE_YET,
  );
  const [counters, setCounters] = useState({
    typeMatches: 0,
    newWins: 0,
    previousWins: 0,
  });

  const battleStatsSummary = useMemo(() => {
    const totalBattles =
      counters.typeMatches + counters.newWins + counters.previousWins;

    let leader = "No leader yet";

    if (counters.newWins > counters.previousWins) {
      leader = "New Pokémon is leading";
    } else if (counters.previousWins > counters.newWins) {
      leader = "Previous Pokémon is leading";
    } else if (counters.newWins > 0 || counters.previousWins > 0) {
      leader = "The battle is tied";
    }

    return {
      totalBattles,
      leader,
    };
  }, [counters]);

  const handleLoadPokemon = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const newPokemon = await getRandomPokemon();
      // console.log("Loaded Pokémon:", newPokemon);   - Added for testing purposes

      if (!currentPokemon) {
        setCurrentPokemon(newPokemon);
        setBattleResult(BATTLE_MESSAGES.NO_BATTLE_YET);
        return;
      }

      const newPreviousPokemon = currentPokemon;
      const newCurrentPokemon = newPokemon;

      const [previousTypeData, currentTypeData] = await Promise.all([
        getTypeByName(newPreviousPokemon.primaryType),
        getTypeByName(newCurrentPokemon.primaryType),
      ]);

      // console.log("Previous type data:", previousTypeData);   - Added for testing purposes
      // console.log("Current type data:", currentTypeData);

      const result = determineBattleResult(
        newPreviousPokemon,
        newCurrentPokemon,
        previousTypeData,
        currentTypeData,
      );

      setCounters((prevCounters) => updateCounters(prevCounters, result));

      setPreviousPokemon(newPreviousPokemon);
      setCurrentPokemon(newCurrentPokemon);
      setBattleResult(result);
    } catch (err) {
      console.error("Failed to load Pokémon:", err);
      setError("Failed to load Pokémon. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPokemon]);

  return (
    <main className="app-container">
      <h1>Pokémon Battle App</h1>

      <LoadPokemonButton loading={loading} onClick={handleLoadPokemon} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <BattleResult result={battleResult} />

      <CountersPanel counters={counters} />

      <div>
        <p>Total counted battles: {battleStatsSummary.totalBattles}</p>
        <p>{battleStatsSummary.leader}</p>
      </div>

      <BattleArena
        previousPokemon={previousPokemon}
        currentPokemon={currentPokemon}
      />
    </main>
  );
}

export default App;
