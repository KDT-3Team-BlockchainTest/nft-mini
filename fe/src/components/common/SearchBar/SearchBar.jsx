import "./SearchBar.css";

export default function SearchBar({
  placeholder = "검색어를 입력하세요",
  onFilterClick,
}) {
  return (
    <div className="search-bar">
      <div className="search-bar__input-wrap">
        <span className="search-bar__icon">⌕</span>
        <input
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
        />
      </div>

      <button
        type="button"
        className="search-bar__filter-btn"
        onClick={onFilterClick}
      >
        필터
      </button>
    </div>
  );
}
