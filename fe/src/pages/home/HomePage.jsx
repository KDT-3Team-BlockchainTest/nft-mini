import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import SectionTitle from "../../components/common/SectionTitle/SectionTitle";
import NftCard from "../../components/common/NftCard/NftCard";
import InfoCard from "../../components/common/InfoCard/InfoCard";
import GradientButton from "../../components/common/GradientButton/GradientButton";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [homeData, setHomeData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/home")
      .then((data) => {
        setHomeData(data);
        setError("");
      })
      .catch((loadError) => setError(loadError.message));
  }, []);

  return (
    <div className="home-page">
      <Header activeMenu="home" />

      <main className="home">
        <section className="home-hero">
          <div className="home-hero__inner">
            <div className="home-hero__badge">✧ AI 콘텐츠 수익화의 미래</div>

            <h1 className="home-hero__title">
              AI 창작물을
              <br />
              거래 가능한 디지털 자산으로
            </h1>

            <p className="home-hero__desc">
              AI 생성 콘텐츠를 위한 프리미엄 NFT 마켓플레이스. 블록체인으로 검증된
              소유권과 함께 독특한 디지털 아트워크를 생성, 발행, 판매, 수집하세요.
            </p>

            <div className="home-hero__actions">
              <GradientButton onClick={() => navigate("/marketplace")}>
                마켓플레이스 탐색 →
              </GradientButton>
              <button
                type="button"
                className="home-hero__secondary-btn"
                onClick={() => navigate("/create")}
              >
                시작하기
              </button>
            </div>
          </div>
        </section>

        {!homeData && !error ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}

        {homeData ? (
          <>
        <section className="home-section">
          <div className="home-container">
            <div className="home-section__head">
              <SectionTitle
                title="추천 NFT"
                description="트렌딩 디지털 아트워크를 발견하세요"
              />
              <button
                type="button"
                className="home-outline-btn"
                onClick={() => navigate("/marketplace")}
              >
                전체 보기 →
              </button>
            </div>

            <div className="home-card-grid home-card-grid--nft">
              {homeData.featuredNfts.map((item) => (
                <NftCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="home-container">
            <SectionTitle
              center
              title="카테고리별 탐색"
              description="다양한 유형의 AI 생성 콘텐츠를 살펴보세요"
            />

            <div className="home-card-grid home-card-grid--4">
              {homeData.categories.map((item) => (
                <InfoCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  meta={item.meta}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="home-container">
            <SectionTitle
              center
              title="이용 방법"
              description="간단한 4단계로 AI 창작물 수익화를 시작하세요"
            />

            <div className="home-card-grid home-card-grid--4">
              {homeData.steps.map((item, index) => (
                <InfoCard
                  key={item.title}
                  number={String(index + 1)}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="home-container">
            <SectionTitle
              center
              title="NexusArt를 선택하는 이유"
              description="AI 콘텐츠 크리에이터와 컬렉터를 위한 최고의 플랫폼"
            />

            <div className="home-card-grid home-card-grid--4">
              {homeData.benefits.map((item) => (
                <InfoCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </section>
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
