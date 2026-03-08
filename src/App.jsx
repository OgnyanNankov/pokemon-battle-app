import { useState } from "react";
import { getRandomPokemon } from "./services/pokemonService";
import { BATTLE_MESSAGES } from "./constants/battleMessages";

function App() {
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
    <main>
      <h1>Pokémon Battle App</h1>

      <button onClick={handleLoadPokemon} disabled={loading}>
        {loading ? "Loading..." : "Load Random Pokémon"}
      </button>

      {error && <p>{error}</p>}

      <p>{battleResult}</p>

      {currentPokemon && (
        <section>
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
        </section>
      )}
    </main>
  );
}

export default App;
