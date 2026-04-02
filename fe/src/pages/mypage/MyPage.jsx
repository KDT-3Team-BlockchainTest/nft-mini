import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import NftCard from "../../components/common/NftCard/NftCard";
import StatsCard from "../../components/common/StatsCard/StatsCard";
import ProfileHero from "../../components/common/ProfileHero/ProfileHero";
import TabMenu from "../../components/common/TabMenu/TabMenu";
import ActivityListItem from "../../components/common/ActivityListItem/ActivityListItem";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";
import "./MyPage.css";

const tabItems = [
  { key: "owned", label: "보유 NFT" },
  { key: "created", label: "생성한 NFT" },
  { key: "listed", label: "판매 등록" },
  { key: "sold", label: "판매 완료" },
  { key: "purchases", label: "구매 내역" },
  { key: "royalty", label: "로열티" },
];

export default function MyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("owned");
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/users/me/dashboard")
      .then((data) => {
        setDashboard(data);
        setError("");
      })
      .catch((loadError) => {
        setError(loadError.message);
        if (loadError.message.includes("로그인")) {
          navigate("/login");
        }
      });
  }, [navigate]);

  const sectionTitle = useMemo(() => {
    if (activeTab === "owned") return "NFT 컬렉션";
    if (activeTab === "created") return "생성한 NFT";
    if (activeTab === "listed") return "판매 등록 목록";
    if (activeTab === "sold") return "판매 내역";
    if (activeTab === "purchases") return "구매 내역";
    if (activeTab === "royalty") return "로열티 내역";
    return "NFT 컬렉션";
  }, [activeTab]);

  const currentNfts =
    activeTab === "created"
      ? dashboard?.created
      : activeTab === "listed"
        ? dashboard?.listed
        : dashboard?.owned;

  return (
    <div className="mypage">
      <Header activeMenu="mypage" />

      <main className="mypage__main">
        <div className="mypage__container">
          {!dashboard && !error ? <LoadingState /> : null}
          {error ? <ErrorState message={error} /> : null}
          {dashboard ? (
            <>
              <ProfileHero
                name={dashboard.profile.name}
                description={dashboard.profile.description}
                walletAddress={dashboard.profile.walletAddress}
                onCopyAddress={() =>
                  navigator.clipboard.writeText(dashboard.profile.walletAddress ?? "")
                }
                onEditProfile={() => window.alert("Stage 1에서는 조회만 지원합니다.")}
              />

              <section className="mypage__stats-grid">
                <StatsCard
                  icon="◫"
                  value={dashboard.stats.assetCount}
                  label="보유 자산"
                  iconClassName="is-purple"
                />
                <StatsCard
                  icon="↗"
                  value={dashboard.stats.createdCount}
                  label="생성한 NFT"
                  iconClassName="is-blue"
                />
                <StatsCard
                  icon="$"
                  value={dashboard.stats.totalSales}
                  label="총 판매액"
                  iconClassName="is-green"
                />
                <StatsCard
                  icon="◧"
                  value={dashboard.stats.royaltyIncome}
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
                        {currentNfts?.map((item) => (
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
                        {dashboard.sold.map((item) => (
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
                        {dashboard.purchases.map((item) => (
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

                        <strong className="mypage-panel__royalty-value">
                          {dashboard.stats.royaltyIncome}
                        </strong>
                      </div>

                      <h2 className="mypage-panel__title">{sectionTitle}</h2>

                      <div className="mypage-panel__activity-list">
                        {dashboard.royalty.map((item) => (
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
            </>
          ) : null}
        </div>
      </main>

      <Footer showCta={false} />
    </div>
  );
}
