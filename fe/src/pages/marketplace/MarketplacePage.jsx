import { useState } from "react";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import NftCard from "../../components/common/NftCard/NftCard";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import CategoryTabs from "../../components/common/CategoryTabs/CategoryTabs";
import FilterCard from "../../components/common/FilterCard/FilterCard";
import Pagination from "../../components/common/Pagination/Pagination";
import "./MarketplacePage.css";

const categoryItems = [
  { key: "all", label: "전체" },
  { key: "image", label: "AI 이미지" },
  { key: "asset", label: "3D 에셋" },
  { key: "music", label: "음악" },
  { key: "prompt", label: "프롬프트" },
];

const nftItems = [
  {
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=80",
    badge: "트렌딩",
    title: "네온 드림",
    creator: "PixelMaster",
    price: "2.5 ETH",
  },
  {
    image:
      "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=900&q=80",
    badge: "새로운",
    title: "추상 차원",
    creator: "CyberArt",
    price: "1.8 ETH",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80",
    badge: "판매중",
    title: "사이버 리얼리티",
    creator: "FutureGen",
    price: "3.2 ETH",
  },
  {
    image:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=900&q=80",
    badge: "",
    title: "기하학적 흐름",
    creator: "VectorAI",
    price: "1.5 ETH",
  },
  {
    image:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80",
    badge: "새로운",
    title: "홀로그래픽 뷰",
    creator: "PrismAI",
    price: "2.1 ETH",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=80",
    badge: "트렌딩",
    title: "네온 시티스케이프",
    creator: "UrbanArt",
    price: "4.5 ETH",
  },
  {
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80",
    badge: "",
    title: "컬러 버스트",
    creator: "ChromaAI",
    price: "1.9 ETH",
  },
  {
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    badge: "판매중",
    title: "디지털 호라이즌",
    creator: "LandscapeGen",
    price: "2.7 ETH",
  },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="marketplace-page">
      <Header
        activeMenu="marketplace"
        onMenuClick={(menu) => console.log(menu)}
        onWalletClick={() => console.log("wallet connect")}
      />

      <main className="marketplace">
        <section className="marketplace__hero">
          <div className="marketplace__container">
            <h1 className="marketplace__title">마켓플레이스 탐색</h1>
            <p className="marketplace__desc">
              재능있는 크리에이터들의 독특한 AI 생성 NFT를 발견하세요
            </p>

            <SearchBar
              placeholder="NFT, 크리에이터, 컬렉션 검색..."
              onFilterClick={() => console.log("filter")}
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
                    defaultValue="0"
                  />
                  <span className="marketplace__price-separator">-</span>
                  <input
                    className="marketplace__price-input"
                    type="text"
                    defaultValue="10"
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
                  <strong>8개</strong> 아이템 발견
                </p>

                <select className="marketplace__sort" defaultValue="trending">
                  <option value="trending">트렌딩</option>
                  <option value="latest">최신순</option>
                  <option value="priceLow">낮은 가격순</option>
                  <option value="priceHigh">높은 가격순</option>
                </select>
              </div>

              <div className="marketplace__grid">
                {nftItems.map((item) => (
                  <NftCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          </div>
          <div className="marketplace__pagination-wrap">
            <Pagination
              current={currentPage}
              total={8}
              onChange={setCurrentPage}
            />
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </div>
  );
}
