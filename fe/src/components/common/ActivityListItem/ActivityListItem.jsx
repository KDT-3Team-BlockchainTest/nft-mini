import "./ActivityListItem.css";

export default function ActivityListItem({
  title,
  subtitle,
  amount,
  date,
  amountClassName = "",
}) {
  return (
    <article className="activity-item">
      <div className="activity-item__left">
        <h4 className="activity-item__title">{title}</h4>
        <p className="activity-item__subtitle">{subtitle}</p>
      </div>

      <div className="activity-item__right">
        <strong className={`activity-item__amount ${amountClassName}`}>{amount}</strong>
        <span className="activity-item__date">{date}</span>
      </div>
    </article>
  );
}
