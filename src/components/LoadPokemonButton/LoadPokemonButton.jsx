export default function LoadPokemonButton({ loading, onClick }) {
  return (
    <button className="load-button" onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : "Load Random Pokémon"}
    </button>
  );
}
