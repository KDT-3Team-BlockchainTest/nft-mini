import "./Footer.css";

export default function Footer({ showCta = true }) {
  return (
    <footer className="footer">
      {showCta && (
        <div className="footer__cta">
          <div className="footer__cta-inner">
            <h2 className="footer__cta-title">지금 바로 시작할 준비가 되셨나요?</h2>
            <p className="footer__cta-desc">
              수천 명의 크리에이터들과 함께 AI 생성 콘텐츠로 수익을 창출하세요
            </p>
            <button type="button" className="footer__cta-btn">
              ⤴ 첫 NFT 업로드하기
            </button>
          </div>
        </div>
      )}

      <div className="footer__main">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <div className="footer__logo">N</div>
              <span className="footer__brand-name">NexusArt</span>
            </div>
            <p className="footer__brand-desc">
              AI 생성 NFT를 위한 프리미엄 마켓플레이스
            </p>
          </div>

          <div>
            <h4 className="footer__heading">플랫폼</h4>
            <a href="/">마켓플레이스</a>
            <a href="/">생성</a>
            <a href="/">마이페이지</a>
          </div>

          <div>
            <h4 className="footer__heading">리소스</h4>
            <a href="/">소개</a>
            <a href="/">FAQ</a>
            <a href="/">문의하기</a>
          </div>

          <div>
            <h4 className="footer__heading">법적 고지</h4>
            <a href="/">이용약관</a>
            <a href="/">개인정보처리방침</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 NexusArt. All rights reserved.</span>
          <div className="footer__socials">
            <a href="/">Twitter</a>
            <a href="/">Discord</a>
            <a href="/">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}