import "./CategoryTabs.css";

export default function CategoryTabs({
  items = [],
  activeKey,
  onChange,
}) {
  return (
    <div className="category-tabs">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`category-tabs__item ${
            activeKey === item.key ? "is-active" : ""
          }`}
          onClick={() => onChange?.(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
