import "./FilterCard.css";

export default function FilterCard({ title, children }) {
  return (
    <section className="filter-card">
      <h3 className="filter-card__title">{title}</h3>
      <div className="filter-card__body">{children}</div>
    </section>
  );
}
