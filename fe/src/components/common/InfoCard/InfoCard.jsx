import "./InfoCard.css";

export default function InfoCard({ number, icon, title, description, meta }) {
  return (
    <article className="info-card">
      {number ? <div className="info-card__number">{number}</div> : null}
      <div className="info-card__icon">{icon}</div>
      <h3 className="info-card__title">{title}</h3>
      {description ? <p className="info-card__description">{description}</p> : null}
      {meta ? <p className="info-card__meta">{meta}</p> : null}
    </article>
  );
}
