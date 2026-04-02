import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import SectionTitle from "../../components/common/SectionTitle/SectionTitle";
import NftCard from "../../components/common/NftCard/NftCard";
import InfoCard from "../../components/common/InfoCard/InfoCard";
import GradientButton from "../../components/common/GradientButton/GradientButton";
import "./HomePage.css";

const featuredNfts = [
  {
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=900&q=80",
    badge: "트렌딩",
    title: "네온 드림",
    creator: "PixelMaster",
    price: "2.5 ETH",
  },
  {
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=900&q=80",
    badge: "새로운",
    title: "추상 차원",
    creator: "CyberArt",
    price: "1.8 ETH",
  },
  {
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80",
    badge: "판매중",
    title: "사이버 리얼리티",
    creator: "FutureGen",
    price: "3.2 ETH",
  },
  {
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=900&q=80",
    badge: "",
    title: "기하학적 흐름",
    creator: "VectorAI",
    price: "1.5 ETH",
  },
];

const categories = [
  { icon: "🎨", title: "AI 이미지", meta: "2.4k 아이템" },
  { icon: "🎭", title: "3D 에셋", meta: "1.8k 아이템" },
  { icon: "🎵", title: "음악", meta: "956 아이템" },
  { icon: "✨", title: "프롬프트", meta: "1.2k 아이템" },
];

const steps = [
  {
    number: "1",
    icon: "✦",
    title: "콘텐츠 생성",
    description: "좋아하는 도구로 AI 아트, 음악 또는 3D 에셋을 생성하세요",
  },
  {
    number: "2",
    icon: "⇪",
    title: "업로드 & 발행",
    description: "디지털 작품을 업로드하고 블록체인에 NFT로 발행하세요",
  },
  {
    number: "3",
    icon: "◎",
    title: "등록 & 판매",
    description: "가격을 설정하고 마켓플레이스에 NFT를 등록하세요",
  },
  {
    number: "4",
    icon: "↗",
    title: "로열티 수익",
    description: "모든 2차 판매에서 자동으로 로열티를 받으세요",
  },
];

const benefits = [
  {
    icon: "◎",
    title: "직접 수익화",
    description: "AI 생성 콘텐츠를 컬렉터에게 직접 판매하세요",
  },
  {
    icon: "🛡",
    title: "진정한 소유권",
    description: "블록체인으로 검증된 소유권과 출처",
  },
  {
    icon: "↗",
    title: "2차 재판매",
    description: "구매자가 NFT를 재판매하여 활발한 마켓플레이스 형성",
  },
  {
    icon: "✦",
    title: "크리에이터 로열티",
    description: "모든 재판매에서 수동 소득 창출",
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <Header
        activeMenu="home"
        onMenuClick={(menu) => console.log(menu)}
        onWalletClick={() => console.log("wallet connect")}
      />

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
              <GradientButton>마켓플레이스 탐색 →</GradientButton>
              <button type="button" className="home-hero__secondary-btn">
                시작하기
              </button>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="home-container">
            <div className="home-section__head">
              <SectionTitle
                title="추천 NFT"
                description="트렌딩 디지털 아트워크를 발견하세요"
              />
              <button type="button" className="home-outline-btn">
                전체 보기 →
              </button>
            </div>

            <div className="home-card-grid home-card-grid--nft">
              {featuredNfts.map((item) => (
                <NftCard key={item.title} {...item} />
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
              {categories.map((item) => (
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
              {steps.map((item) => (
                <InfoCard
                  key={item.title}
                  number={item.number}
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
              {benefits.map((item) => (
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
      </main>

      <Footer />
    </div>
  );
}
