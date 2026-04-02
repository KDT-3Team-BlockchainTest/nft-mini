import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";

export default function ArtworkDetailPage() {
  const { artworkId } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/api/artworks/${artworkId}`)
      .then(setArtwork)
      .catch((loadError) => setError(loadError.message));
  }, [artworkId]);

  return (
    <div>
      <Header activeMenu="marketplace" />
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px" }}>
        {!artwork && !error ? <LoadingState /> : null}
        {error ? <ErrorState message={error} onRetry={() => navigate("/marketplace")} /> : null}
        {artwork ? (
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(280px, 1fr) minmax(320px, 420px)",
              gap: 32,
              alignItems: "start",
            }}
          >
            <div>
              <img
                src={artwork.previewImageUrl}
                alt={artwork.title}
                style={{ width: "100%", borderRadius: 24, display: "block" }}
              />
            </div>
            <div>
              <p style={{ margin: "0 0 12px", opacity: 0.7 }}>{artwork.status}</p>
              <h1 style={{ margin: "0 0 16px" }}>{artwork.title}</h1>
              <p style={{ margin: "0 0 16px" }}>{artwork.description}</p>
              <p style={{ margin: "0 0 8px" }}>크리에이터: {artwork.creator}</p>
              <p style={{ margin: "0 0 8px" }}>카테고리: {artwork.category}</p>
              <p style={{ margin: "0 0 8px" }}>블록체인: {artwork.blockchain}</p>
              <p style={{ margin: "0 0 8px" }}>라이선스: {artwork.licenseScope}</p>
              <p style={{ margin: "0 0 24px" }}>가격: {artwork.price} ETH</p>
              <button type="button" className="auth-form__submit" onClick={() => navigate("/marketplace")}>
                목록으로 돌아가기
              </button>
            </div>
          </section>
        ) : null}
      </main>
      <Footer showCta={false} />
    </div>
  );
}
