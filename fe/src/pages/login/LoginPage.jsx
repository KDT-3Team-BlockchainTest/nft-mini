import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../lib/api";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const user = await api.post("/api/auth/login", form);
      setUser(user);
      navigate("/");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link to="/" className="auth-card__brand">
          <span className="auth-card__logo">N</span>
          <span className="auth-card__brand-text">NexusArt</span>
        </Link>

        <h1 className="auth-card__title">로그인</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <div className="auth-form__options">
            <label className="auth-form__check">
              <input type="checkbox" />
              <span>로그인 상태 유지</span>
            </label>

            <button type="button" className="auth-form__text-btn">
              비밀번호 찾기
            </button>
          </div>

          {error ? <p className="auth-form__error">{error}</p> : null}

          <button type="submit" className="auth-form__submit">
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>

          <button type="button" className="auth-form__sub-btn" disabled>
            Stage 2: MetaMask 로그인
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
