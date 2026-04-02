import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";
import "./AdminPage.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      const data = await api.get("/api/admin/dashboard");
      setDashboard(data);
      setError("");
    } catch (loadError) {
      setError(loadError.message);
      if (
        loadError.message.includes("로그인") ||
        loadError.message.includes("관리자")
      ) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [navigate]);

  const handleReview = async (artworkId, action) => {
    try {
      await api.post(`/api/admin/artworks/${artworkId}/${action}`, {});
      await loadDashboard();
    } catch (submitError) {
      window.alert(submitError.message);
    }
  };

  return (
    <div className="admin-page">
      <Header activeMenu="admin" />

      <main className="admin">
        <section className="admin__hero">
          <div className="admin__container">
            <div className="admin__headline">
              <span className="admin__eyebrow">Administration Console</span>
              <h1 className="admin__title">관리자 페이지</h1>
              <p className="admin__desc">
                크리에이터의 NFT 민팅 요청을 검토하고 승인할 수 있으며,
                전체 회원과 작품 상태를 통합 관리할 수 있습니다.
              </p>
            </div>

            <div className="admin__stats">
              <article className="admin-stat">
                <span className="admin-stat__label">전체 사용자</span>
                <strong className="admin-stat__value">
                  {dashboard?.stats.totalUsers ?? 0}
                </strong>
                <span className="admin-stat__meta">이번 주 +32</span>
              </article>

              <article className="admin-stat">
                <span className="admin-stat__label">승인 대기 작품</span>
                <strong className="admin-stat__value">
                  {dashboard?.stats.pendingWorks ?? 0}
                </strong>
                <span className="admin-stat__meta">즉시 검토 필요</span>
              </article>

              <article className="admin-stat">
                <span className="admin-stat__label">오늘 민팅 완료</span>
                <strong className="admin-stat__value">
                  {dashboard?.stats.mintedToday ?? 0}
                </strong>
                <span className="admin-stat__meta">전일 대비 +2</span>
              </article>

              <article className="admin-stat">
                <span className="admin-stat__label">정지 계정</span>
                <strong className="admin-stat__value">
                  {dashboard?.stats.suspendedUsers ?? 0}
                </strong>
                <span className="admin-stat__meta">정책 위반 처리</span>
              </article>
            </div>
          </div>
        </section>

        <section className="admin__section">
          <div className="admin__container admin__grid">
            {!dashboard && !error ? <LoadingState /> : null}
            {error ? <ErrorState message={error} onRetry={loadDashboard} /> : null}
            {dashboard ? (
              <>
                <div className="admin-panel admin-panel--wide">
                  <div className="admin-panel__header">
                    <div>
                      <h2>민팅 승인 대기 목록</h2>
                      <p>크리에이터가 제출한 작품을 검토 후 민팅 허용 여부를 결정합니다.</p>
                    </div>
                    <button className="admin-panel__action">전체 보기</button>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>작품명</th>
                          <th>크리에이터</th>
                          <th>유형</th>
                          <th>상태</th>
                          <th>제출일</th>
                          <th>관리</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboard.pendingWorks.map((work) => (
                          <tr key={work.id}>
                            <td>{work.title}</td>
                            <td>{work.creator}</td>
                            <td>{work.category}</td>
                            <td>
                              <span className="admin-badge">{work.status}</span>
                            </td>
                            <td>{work.submittedAt}</td>
                            <td>
                              <div className="admin-table__actions">
                                <button
                                  className="btn-approve"
                                  onClick={() => handleReview(work.id, "approve")}
                                >
                                  승인
                                </button>
                                <button
                                  className="btn-reject"
                                  onClick={() => handleReview(work.id, "reject")}
                                >
                                  반려
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="admin-panel">
                  <div className="admin-panel__header">
                    <div>
                      <h2>빠른 작업</h2>
                      <p>관리자가 자주 쓰는 작업 모음입니다.</p>
                    </div>
                  </div>

                  <div className="admin-quick-actions">
                    <button>신규 작품 검토</button>
                    <button>정지 계정 확인</button>
                    <button>민팅 로그 조회</button>
                    <button>판매 신고 내역</button>
                  </div>
                </div>

                <div className="admin-panel admin-panel--wide">
                  <div className="admin-panel__header">
                    <div>
                      <h2>사용자 관리</h2>
                      <p>역할, 지갑 주소, 계정 상태를 기준으로 사용자를 관리합니다.</p>
                    </div>
                    <button className="admin-panel__action">사용자 추가</button>
                  </div>

                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>이름</th>
                          <th>이메일</th>
                          <th>권한</th>
                          <th>지갑 주소</th>
                          <th>상태</th>
                          <th>작업</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboard.users.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.walletAddress || "-"}</td>
                            <td>
                              <span className="admin-badge admin-badge--neutral">
                                {user.status}
                              </span>
                            </td>
                            <td>
                              <div className="admin-table__actions">
                                <button className="btn-outline">권한 변경</button>
                                <button className="btn-outline">정지 처리</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="admin-panel">
                  <div className="admin-panel__header">
                    <div>
                      <h2>정책 설정</h2>
                      <p>승인 기준과 민팅 제한을 제어합니다.</p>
                    </div>
                  </div>

                  <form className="admin-settings">
                    <label>
                      <span>1일 최대 민팅 허용 수</span>
                      <input type="number" defaultValue="5" />
                    </label>

                    <label>
                      <span>자동 승인 대상</span>
                      <select defaultValue="none">
                        <option value="none">없음</option>
                        <option value="verified">인증 크리에이터만</option>
                        <option value="all">전체</option>
                      </select>
                    </label>

                    <label>
                      <span>신고 누적 시 자동 정지 기준</span>
                      <input type="number" defaultValue="3" />
                    </label>

                    <button type="button" className="admin-settings__save">
                      설정 저장
                    </button>
                  </form>
                </div>
              </>
            ) : null}
          </div>
        </section>
      </main>

      <Footer showCta={false} />
    </div>
  );
}
