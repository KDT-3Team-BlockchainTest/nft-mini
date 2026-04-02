import "./SectionTitle.css";

export default function SectionTitle({ badge, title, description, center = false }) {
  return (
    <div className={`section-title ${center ? "section-title--center" : ""}`}>
      {badge ? <div className="section-title__badge">{badge}</div> : null}
      <h2 className="section-title__title">{title}</h2>
      {description ? <p className="section-title__description">{description}</p> : null}
    </div>
  );
}
