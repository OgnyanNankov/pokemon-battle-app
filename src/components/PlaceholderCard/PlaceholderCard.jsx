export default function PlaceholderCard({ title, message }) {
  return (
    <div className="placeholder-card">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
