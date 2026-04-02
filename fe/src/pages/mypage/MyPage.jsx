import { useMemo, useState } from "react";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import NftCard from "../../components/common/NftCard/NftCard";
import StatsCard from "../../components/common/StatsCard/StatsCard";
import ProfileHero from "../../components/common/ProfileHero/ProfileHero";
import TabMenu from "../../components/common/TabMenu/TabMenu";
import ActivityListItem from "../../components/common/ActivityListItem/ActivityListItem";
import "./MyPage.css";

const tabItems = [
  { key: "owned", label: "보유 NFT" },
  { key: "created", label: "생성한 NFT" },
  { key: "listed", label: "판매 등록" },
  { key: "sold", label: "판매 완료" },
  { key: "purchases", label: "구매 내역" },
  { key: "royalty", label: "로열티" },
];

const nftCollection = [
  {
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=80",
    badge: "",
    title: "네온 드림",
    creator: "PixelMaster",
    price: "2.5 ETH",
  },
  {
    image:
      "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=900&q=80",
    badge: "",
    title: "추상 차원",
    creator: "CyberArt",
    price: "1.8 ETH",
  },
];

const soldItems = [
  {
    title: "네온 드림 #123",
    subtitle: "판매 대상 0x1234...5678",
    amount: "2.5 ETH",
    date: "2026-03-28",
  },
  {
    title: "사이버 리얼리티 #456",
    subtitle: "판매 대상 0x8765...4321",
    amount: "3.2 ETH",
    date: "2026-03-25",
  },
  {
    title: "디지털 호라이즌 #789",
    subtitle: "판매 대상 0xabcd...ef01",
    amount: "1.8 ETH",
    date: "2026-03-20",
  },
];

const purchaseItems = [
  {
    title: "기하학적 흐름 #321",
    subtitle: "구매 대상 VectorAI",
    amount: "1.5 ETH",
    date: "2026-03-22",
  },
  {
    title: "홀로그래픽 뷰 #654",
    subtitle: "구매 대상 PrismAI",
    amount: "2.1 ETH",
    date: "2026-03-19",
  },
];

const royaltyItems = [
  {
    title: "네온 드림 #123",
    subtitle: "2차 판매 로열티",
    amount: "0.25 ETH",
    date: "2026-03-29",
  },
  {
    title: "사이버 리얼리티 #456",
    subtitle: "2차 판매 로열티",
    amount: "0.32 ETH",
    date: "2026-03-27",
  },
  {
    title: "추상 차원 #234",
    subtitle: "2차 판매 로열티",
    amount: "0.18 ETH",
    date: "2026-03-24",
  },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("owned");

  const sectionTitle = useMemo(() => {
    if (activeTab === "owned") return "NFT 컬렉션";
    if (activeTab === "created") return "생성한 NFT";
    if (activeTab === "listed") return "판매 등록 목록";
    if (activeTab === "sold") return "판매 내역";
    if (activeTab === "purchases") return "구매 내역";
    if (activeTab === "royalty") return "로열티 내역";
    return "NFT 컬렉션";
  }, [activeTab]);

  return (
    <div className="mypage">
      <Header
        activeMenu="mypage"
        isLoggedIn
        userRole="USER"
        userName="PixelMaster"
        onWalletClick={() => console.log("wallet connect")}
        onLogout={() => console.log("logout")}
      />

      <main className="mypage__main">
        <div className="mypage__container">
          <ProfileHero
            name="PixelMaster"
            description="AI 기반 마스터피스를 만드는 디지털 아티스트"
            walletAddress="0x1234...5678"
            onCopyAddress={() => console.log("copy address")}
            onEditProfile={() => console.log("edit profile")}
          />

          <section className="mypage__stats-grid">
            <StatsCard
              icon="◫"
              value="12"
              label="보유 자산"
              iconClassName="is-purple"
            />
            <StatsCard
              icon="↗"
              value="8"
              label="생성한 NFT"
              iconClassName="is-blue"
            />
            <StatsCard
              icon="$"
              value="24.5 ETH"
              label="총 판매액"
              iconClassName="is-green"
            />
            <StatsCard
              icon="◧"
              value="3.2 ETH"
              label="로열티 수익"
            />
          </section>

          <section className="mypage-panel">
            <TabMenu
              items={tabItems}
              activeKey={activeTab}
              onChange={setActiveTab}
            />

            <div className="mypage-panel__body">
              {(activeTab === "owned" ||
                activeTab === "created" ||
                activeTab === "listed") && (
                <>
                  <div className="mypage-panel__head">
                    <h2 className="mypage-panel__title">{sectionTitle}</h2>
                    <button type="button" className="mypage-panel__more-btn">
                      더 많이 둘러보기
                    </button>
                  </div>

                  <div className="mypage-panel__nft-grid">
                    {nftCollection.map((item) => (
                      <div key={item.title} className="mypage-panel__nft-card-wrap">
                        <NftCard {...item} />
                        <button type="button" className="mypage-panel__action-btn">
                          {activeTab === "owned" ? "재판매" : "관리"}
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === "sold" && (
                <>
                  <h2 className="mypage-panel__title">{sectionTitle}</h2>
                  <div className="mypage-panel__activity-list">
                    {soldItems.map((item) => (
                      <ActivityListItem
                        key={`${item.title}-${item.date}`}
                        {...item}
                        amountClassName="is-green"
                      />
                    ))}
                  </div>
                </>
              )}

              {activeTab === "purchases" && (
                <>
                  <h2 className="mypage-panel__title">{sectionTitle}</h2>
                  <div className="mypage-panel__activity-list">
                    {purchaseItems.map((item) => (
                      <ActivityListItem
                        key={`${item.title}-${item.date}`}
                        {...item}
                      />
                    ))}
                  </div>
                </>
              )}

              {activeTab === "royalty" && (
                <>
                  <div className="mypage-panel__royalty-summary">
                    <div>
                      <p className="mypage-panel__royalty-label">총 로열티 수익</p>
                      <p className="mypage-panel__royalty-desc">
                        내 창작물의 2차 판매로 발생한 수동 소득
                      </p>
                    </div>

                    <strong className="mypage-panel__royalty-value">3.2 ETH</strong>
                  </div>

                  <h2 className="mypage-panel__title">{sectionTitle}</h2>

                  <div className="mypage-panel__activity-list">
                    {royaltyItems.map((item) => (
                      <ActivityListItem
                        key={`${item.title}-${item.date}`}
                        {...item}
                        amountClassName="is-purple"
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer showCta={false} />
    </div>
  );
}
