import "./Pagination.css";

export default function Pagination({
  current = 1,
  total = 5,
  onChange,
}) {
  const pages = Array.from({ length: Math.max(total, 1) }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__btn"
        disabled={current <= 1}
        onClick={() => onChange?.(current - 1)}
      >
        이전
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`pagination__page ${current === page ? "is-active" : ""}`}
          onClick={() => onChange?.(page)}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="pagination__btn"
        disabled={current >= total}
        onClick={() => onChange?.(current + 1)}
      >
        다음
      </button>
    </div>
  );
}
