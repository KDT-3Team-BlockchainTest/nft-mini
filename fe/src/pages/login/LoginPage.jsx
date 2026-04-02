import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-card__brand">
          <span className="auth-card__logo">N</span>
          <span className="auth-card__brand-text">NexusArt</span>
        </Link>

        <h1 className="auth-card__title">로그인</h1>

        <form className="auth-form">
          <input
            className="auth-form__input"
            type="email"
            placeholder="이메일"
          />
          <input
            className="auth-form__input"
            type="password"
            placeholder="비밀번호"
          />

          <div className="auth-form__options">
            <label className="auth-form__check">
              <input type="checkbox" />
              <span>로그인 상태 유지</span>
            </label>

            <button type="button" className="auth-form__text-btn">
              비밀번호 찾기
            </button>
          </div>

          <button type="submit" className="auth-form__submit">
            로그인
          </button>

          <button type="button" className="auth-form__sub-btn">
            MetaMask로 로그인
          </button>
        </form>

        <div className="auth-card__footer">
          <span>아직 계정이 없으신가요?</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </section>
    </main>
  );
}