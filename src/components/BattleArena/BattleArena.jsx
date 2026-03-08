import PokemonCard from "../PokemonCard/PokemonCard";
import PlaceholderCard from "../PlaceholderCard/PlaceholderCard";

export function BattleArena({ previousPokemon, currentPokemon }) {
  return (
    <section className="pokemon-container">
      <div>
        {previousPokemon ? (
          <PokemonCard
            title="Previous Pokémon"
            pokemon={previousPokemon}
          />
        ) : (
          <PlaceholderCard
            title="Previous Pokémon"
            message="No previous Pokémon"
          />
        )}
      </div>

      <div>
        {currentPokemon ? (
          <PokemonCard
            title="Current Pokémon"
            pokemon={currentPokemon}
          />
        ) : (
          <PlaceholderCard
            title="Current Pokémon"
            message="No current Pokémon"
          />
        )}
      </div>
    </section>
  );
}