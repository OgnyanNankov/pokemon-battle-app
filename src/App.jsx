import { useState } from "react";
import { getRandomPokemon } from "./services/pokemonService";
import { BATTLE_MESSAGES } from "./constants/battleMessages";
import "./App.css";

function App() {
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [battleResult, setBattleResult] = useState(
    BATTLE_MESSAGES.NO_BATTLE_YET,
  );

  const handleLoadPokemon = async () => {
    setLoading(true);
    setError("");

    try {
      const pokemon = await getRandomPokemon();
      console.log("Loaded Pokémon:", pokemon);

      setPreviousPokemon(currentPokemon);
      setCurrentPokemon(pokemon);
      setBattleResult(BATTLE_MESSAGES.NO_BATTLE_YET);
    } catch (err) {
      console.error("Failed to load Pokémon:", err);
      setError("Failed to load Pokémon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container">
      <h1>Pokémon Battle App</h1>

      <button onClick={handleLoadPokemon} disabled={loading}>
        {loading ? "Loading..." : "Load Random Pokémon"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>{battleResult}</p>

      <section className="pokemon-container">
        <div>
          <h2>Previous Pokémon</h2>

          {previousPokemon ? (
            <>
              <h2>{previousPokemon.name}</h2>

              <img
                src={previousPokemon.image}
                alt={previousPokemon.name}
                width="150"
              />

              <p>Height: {previousPokemon.height}</p>
              <p>Weight: {previousPokemon.weight}</p>
              <p>Types: {previousPokemon.types.join(", ")}</p>
              <p>Primary Type: {previousPokemon.primaryType}</p>
            </>
          ) : (
            <p>No Previous Pokémon</p>
          )}
        </div>

        <div>
          <h2>Current Pokémon</h2>

          {currentPokemon && (
            <>
              <h2>{currentPokemon.name}</h2>

              <img
                src={currentPokemon.image}
                alt={currentPokemon.name}
                width="150"
              />

              <p>Height: {currentPokemon.height}</p>
              <p>Weight: {currentPokemon.weight}</p>
              <p>Types: {currentPokemon.types.join(", ")}</p>
              <p>Primary Type: {currentPokemon.primaryType}</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
