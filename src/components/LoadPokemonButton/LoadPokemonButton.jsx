export default function LoadPokemonButton({ loading, onClick }) {
  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : "Load Random Pokémon"}
    </button>
  );
}
