import { useEffect, useState } from "react";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import NftCard from "../../components/common/NftCard/NftCard";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import CategoryTabs from "../../components/common/CategoryTabs/CategoryTabs";
import FilterCard from "../../components/common/FilterCard/FilterCard";
import Pagination from "../../components/common/Pagination/Pagination";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";
import "./MarketplacePage.css";

const categoryItems = [
  { key: "all", label: "전체" },
  { key: "image", label: "AI 이미지" },
  { key: "asset", label: "3D 에셋" },
  { key: "music", label: "음악" },
  { key: "prompt", label: "프롬프트" },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("10");
  const [sort, setSort] = useState("trending");
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams({
      category: activeCategory,
      sort,
      page: String(currentPage - 1),
      size: "8",
      minPrice,
      maxPrice,
    });

    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    }

    api
      .get(`/api/marketplace/nfts?${params.toString()}`)
      .then((data) => {
        setMarketData(data);
        setError("");
      })
      .catch((loadError) => setError(loadError.message));
  }, [activeCategory, currentPage, keyword, maxPrice, minPrice, sort]);

  return (
    <div className="marketplace-page">
      <Header activeMenu="marketplace" />

      <main className="marketplace">
        <section className="marketplace__hero">
          <div className="marketplace__container">
            <h1 className="marketplace__title">마켓플레이스 탐색</h1>
            <p className="marketplace__desc">
              재능있는 크리에이터들의 독특한 AI 생성 NFT를 발견하세요
            </p>

            <SearchBar
              placeholder="NFT, 크리에이터, 컬렉션 검색..."
              value={keyword}
              onChange={setKeyword}
              onSubmit={() => setCurrentPage(1)}
              onFilterClick={() => setCurrentPage(1)}
            />

            <CategoryTabs
              items={categoryItems}
              activeKey={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </section>

        <section className="marketplace__content">
          <div className="marketplace__container marketplace__layout">
            <aside className="marketplace__sidebar">
              <FilterCard title="가격 범위">
                <div className="marketplace__price-range">
                  <input
                    className="marketplace__price-input"
                    type="text"
                    value={minPrice}
                    onChange={(event) => setMinPrice(event.target.value)}
                  />
                  <span className="marketplace__price-separator">-</span>
                  <input
                    className="marketplace__price-input"
                    type="text"
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(event.target.value)}
                  />
                </div>
                <span className="marketplace__price-unit">ETH</span>
              </FilterCard>

              <FilterCard title="판매 유형">
                <label className="marketplace__check">
                  <input type="checkbox" />
                  <span>즉시 구매</span>
                </label>
                <label className="marketplace__check">
                  <input type="checkbox" />
                  <span>경매 중</span>
                </label>
                <label className="marketplace__check">
                  <input type="checkbox" />
                  <span>신규</span>
                </label>
                <label className="marketplace__check">
                  <input type="checkbox" />
                  <span>제안 있음</span>
                </label>
              </FilterCard>

              <FilterCard title="블록체인">
                <label className="marketplace__check">
                  <input type="checkbox" defaultChecked />
                  <span>Ethereum</span>
                </label>
                <label className="marketplace__check">
                  <input type="checkbox" />
                  <span>Polygon</span>
                </label>
                <label className="marketplace__check">
                  <input type="checkbox" />
                  <span>Solana</span>
                </label>
                <label className="marketplace__check">
                  <input type="checkbox" />
                  <span>Base</span>
                </label>
              </FilterCard>
            </aside>

            <div className="marketplace__main">
              <div className="marketplace__toolbar">
                <p className="marketplace__count">
                  <strong>{marketData?.totalCount ?? 0}개</strong> 아이템 발견
                </p>

                <select
                  className="marketplace__sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="trending">트렌딩</option>
                  <option value="latest">최신순</option>
                  <option value="priceLow">낮은 가격순</option>
                  <option value="priceHigh">높은 가격순</option>
                </select>
              </div>

              {!marketData && !error ? <LoadingState /> : null}
              {error ? <ErrorState message={error} /> : null}
              <div className="marketplace__grid">
                {marketData?.items?.map((item) => (
                  <NftCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          </div>
          <div className="marketplace__pagination-wrap">
            <Pagination
              current={currentPage}
              total={Math.max(1, Math.ceil((marketData?.totalCount ?? 0) / 8))}
              onChange={setCurrentPage}
            />
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </div>
  );
}
