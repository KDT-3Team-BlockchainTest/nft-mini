import "./SearchBar.css";

export default function SearchBar({
  placeholder = "검색어를 입력하세요",
  value = "",
  onChange,
  onSubmit,
  onFilterClick,
}) {
  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.();
      }}
    >
      <div className="search-bar__input-wrap">
        <span className="search-bar__icon">⌕</span>
        <input
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
        />
      </div>

      <button
        type="button"
        className="search-bar__filter-btn"
        onClick={onFilterClick}
      >
        필터
      </button>
    </form>
  );
}
