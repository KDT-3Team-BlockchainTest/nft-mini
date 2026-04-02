import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import StepIndicator from "../../components/common/StepIndicator/StepIndicator";
import "./CreatePage.css";

const createSteps = [
  { key: "upload", label: "파일 업로드" },
  { key: "details", label: "상세 정보 추가" },
  { key: "mint", label: "NFT 발행" },
  { key: "listing", label: "판매 등록" },
];

export default function CreatePage() {
  return (
    <div className="create-page">
      <Header
        activeMenu="create"
        onWalletClick={() => console.log("wallet connect")}
      />

      <main className="create">
        <section className="create__hero">
          <div className="create__container">
            <h1 className="create__title">새 NFT 생성</h1>
            <p className="create__desc">
              AI 생성 콘텐츠를 업로드하고 NFT로 발행하세요
            </p>
            <div className="create__step-wrap">
              <StepIndicator steps={createSteps} currentStep={1} />
            </div>
          </div>
        </section>

        <section className="create__content">
          <div className="create__container">
            <div className="create-upload-card">
              <h2 className="create-upload-card__title">디지털 작품 업로드</h2>

              <label className="create-upload-card__dropzone">
                <input
                  type="file"
                  className="create-upload-card__input"
                  accept=".jpg,.jpeg,.png,.gif,.svg,.mp4,.webm,.mp3,.wav,.glb,.gltf"
                />

                <div className="create-upload-card__icon">⇪</div>

                <p className="create-upload-card__main-text">
                  파일을 여기에 드래그하거나 클릭하여 업로드
                </p>

                <p className="create-upload-card__sub-text">
                  지원 형식: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, GLB, GLTF
                </p>

                <p className="create-upload-card__limit-text">
                  최대 파일 크기: 100MB
                </p>
              </label>
            </div>
          </div>
        </section>
      </main>

      <Footer showCta={false} />
    </div>
  );
}
