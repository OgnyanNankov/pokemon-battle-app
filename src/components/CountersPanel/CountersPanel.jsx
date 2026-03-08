export default function CountersPanel({ counters }) {
  return (
    <div className="counters">
      <h3>Battle Stats</h3>
      <p>Type Matches: {counters.typeMatches}</p>
      <p>New Pokémon Wins: {counters.newWins}</p>
      <p>Previous Pokémon Wins: {counters.previousWins}</p>
    </div>
  );
}
