import "./StatsCard.css";

export default function StatsCard({ icon, value, label, iconClassName = "" }) {
  return (
    <article className="stats-card">
      <div className={`stats-card__icon ${iconClassName}`}>{icon}</div>
      <strong className="stats-card__value">{value}</strong>
      <p className="stats-card__label">{label}</p>
    </article>
  );
}
