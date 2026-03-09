export default function PokemonCard({ title, pokemon }) {
  return (
    <div className="pokemon-card">
      <h2>{title}</h2>
      <h3>{pokemon.name}</h3>

      <img src={pokemon.image} alt={pokemon.name} width="150" />

      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.join(", ")}</p>
      <p>Primary Type: {pokemon.primaryType}</p>
    </div>
  );
}

