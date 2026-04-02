import "./TabMenu.css";

export default function TabMenu({ items = [], activeKey, onChange }) {
  return (
    <div className="tab-menu">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`tab-menu__item ${activeKey === item.key ? "is-active" : ""}`}
          onClick={() => onChange?.(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
