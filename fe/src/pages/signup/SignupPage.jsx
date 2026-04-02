import { Link } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {
  return (
    <main className="auth-page">
      <section className="auth-card auth-card--wide">
        <Link to="/" className="auth-card__brand">
          <span className="auth-card__logo">N</span>
          <span className="auth-card__brand-text">NexusArt</span>
        </Link>

        <h1 className="auth-card__title">회원가입</h1>

        <form className="auth-form">
          <input className="auth-form__input" type="text" placeholder="이름" />
          <input className="auth-form__input" type="text" placeholder="닉네임" />
          <input className="auth-form__input" type="email" placeholder="이메일" />
          <input className="auth-form__input" type="password" placeholder="비밀번호" />
          <input className="auth-form__input" type="password" placeholder="비밀번호 확인" />

          <select className="auth-form__input">
            <option>크리에이터</option>
            <option>일반 사용자</option>
          </select>

          <input
            className="auth-form__input"
            type="text"
            placeholder="지갑 주소 (선택)"
          />

          <label className="auth-form__check">
            <input type="checkbox" />
            <span>이용약관에 동의합니다.</span>
          </label>

          <label className="auth-form__check">
            <input type="checkbox" />
            <span>개인정보 처리방침에 동의합니다.</span>
          </label>

          <button type="submit" className="auth-form__submit">
            회원가입
          </button>
        </form>

        <div className="auth-card__footer">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login">로그인</Link>
        </div>
      </section>
    </main>
  );
}