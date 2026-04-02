import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import "./SignupPage.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "CREATOR",
    walletAddress: "",
    termsAgreed: false,
    privacyAgreed: false,
  });
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

    if (form.password !== form.passwordConfirm) {
      setError("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!form.termsAgreed || !form.privacyAgreed) {
      setError("필수 약관에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/api/auth/signup", {
        name: form.name,
        nickname: form.nickname,
        email: form.email,
        password: form.password,
        role: form.role,
        walletAddress: form.walletAddress || null,
      });
      navigate("/login");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card auth-card--wide">
        <Link to="/" className="auth-card__brand">
          <span className="auth-card__logo">N</span>
          <span className="auth-card__brand-text">NexusArt</span>
        </Link>

        <h1 className="auth-card__title">회원가입</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-form__input"
            type="text"
            placeholder="이름"
            value={form.name}
            onChange={handleChange("name")}
          />
          <input
            className="auth-form__input"
            type="text"
            placeholder="닉네임"
            value={form.nickname}
            onChange={handleChange("nickname")}
          />
          <input
            className="auth-form__input"
            type="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange("email")}
          />
          <input
            className="auth-form__input"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange("password")}
          />
          <input
            className="auth-form__input"
            type="password"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={handleChange("passwordConfirm")}
          />

          <select
            className="auth-form__input"
            value={form.role}
            onChange={handleChange("role")}
          >
            <option value="CREATOR">크리에이터</option>
            <option value="USER">일반 사용자</option>
          </select>

          <input
            className="auth-form__input"
            type="text"
            placeholder="지갑 주소 (선택)"
            value={form.walletAddress}
            onChange={handleChange("walletAddress")}
          />

          <label className="auth-form__check">
            <input
              type="checkbox"
              checked={form.termsAgreed}
              onChange={handleChange("termsAgreed")}
            />
            <span>이용약관에 동의합니다.</span>
          </label>

          <label className="auth-form__check">
            <input
              type="checkbox"
              checked={form.privacyAgreed}
              onChange={handleChange("privacyAgreed")}
            />
            <span>개인정보 처리방침에 동의합니다.</span>
          </label>

          {error ? <p className="auth-form__error">{error}</p> : null}

          <button type="submit" className="auth-form__submit">
            {isSubmitting ? "가입 중..." : "회원가입"}
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
