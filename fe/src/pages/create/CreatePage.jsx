import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import StepIndicator from "../../components/common/StepIndicator/StepIndicator";
import { api } from "../../lib/api";
import "./CreatePage.css";

const createSteps = [
  { key: "upload", label: "파일 업로드" },
  { key: "details", label: "상세 정보 추가" },
  { key: "mint", label: "NFT 발행" },
  { key: "listing", label: "판매 등록" },
];

export default function CreatePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "IMAGE",
    price: "1.0",
    licenseScope: "COMMERCIAL",
    tags: "",
    termsAgreed: true,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!file) {
      setError("업로드할 파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", file);

    setIsSubmitting(true);
    try {
      const created = await api.post("/api/artworks", formData);
      setMessage("작품이 등록되었습니다. 상세 페이지로 이동합니다.");
      navigate(`/artworks/${created.id}`);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-page">
      <Header activeMenu="create" />

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
            <form className="create-upload-card" onSubmit={handleSubmit}>
              <h2 className="create-upload-card__title">디지털 작품 업로드</h2>

              <label className="create-upload-card__dropzone">
                <input
                  type="file"
                  className="create-upload-card__input"
                  accept=".jpg,.jpeg,.png,.gif,.svg,.mp4,.webm,.mp3,.wav,.glb,.gltf"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
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

              <input
                className="auth-form__input"
                type="text"
                placeholder="작품 제목"
                value={form.title}
                onChange={handleChange("title")}
              />
              <textarea
                className="auth-form__input"
                placeholder="작품 설명"
                value={form.description}
                onChange={handleChange("description")}
              />
              <select
                className="auth-form__input"
                value={form.category}
                onChange={handleChange("category")}
              >
                <option value="IMAGE">AI 이미지</option>
                <option value="ASSET">3D 에셋</option>
                <option value="MUSIC">음악</option>
                <option value="PROMPT">프롬프트</option>
              </select>
              <input
                className="auth-form__input"
                type="number"
                min="0"
                step="0.1"
                placeholder="가격"
                value={form.price}
                onChange={handleChange("price")}
              />
              <input
                className="auth-form__input"
                type="text"
                placeholder="태그 (쉼표 구분)"
                value={form.tags}
                onChange={handleChange("tags")}
              />
              <select
                className="auth-form__input"
                value={form.licenseScope}
                onChange={handleChange("licenseScope")}
              >
                <option value="COMMERCIAL">상업적 이용</option>
                <option value="PERSONAL">개인 이용</option>
              </select>
              <label className="auth-form__check">
                <input
                  type="checkbox"
                  checked={form.termsAgreed}
                  onChange={handleChange("termsAgreed")}
                />
                <span>업로드 작품에 대한 책임에 동의합니다.</span>
              </label>
              {error ? <p className="auth-form__error">{error}</p> : null}
              {message ? <p>{message}</p> : null}
              <button type="submit" className="auth-form__submit">
                {isSubmitting ? "등록 중..." : "작품 등록"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer showCta={false} />
    </div>
  );
}
