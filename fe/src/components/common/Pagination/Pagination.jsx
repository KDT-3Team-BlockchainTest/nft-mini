import "./Pagination.css";

export default function Pagination({
  current = 1,
  total = 5,
  onChange,
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button type="button" className="pagination__btn">
        ?댁쟾
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

      <button type="button" className="pagination__btn">
        ?ㅼ쓬
      </button>
    </div>
  );
}
