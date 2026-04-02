import "./ProfileHero.css";

export default function ProfileHero({
  name,
  description,
  walletAddress,
  onCopyAddress,
  onEditProfile,
}) {
  return (
    <section className="profile-hero">
      <div className="profile-hero__avatar">◉</div>

      <div className="profile-hero__content">
        <div className="profile-hero__top">
          <h1 className="profile-hero__name">{name}</h1>

          <button
            type="button"
            className="profile-hero__edit-btn"
            onClick={onEditProfile}
          >
            수정
          </button>
        </div>

        <p className="profile-hero__description">{description}</p>

        <div className="profile-hero__wallet-row">
          <div className="profile-hero__wallet-chip">지갑 {walletAddress || "미연결"}</div>
          <button
            type="button"
            className="profile-hero__copy-btn"
            onClick={onCopyAddress}
          >
            주소 복사
          </button>
        </div>
      </div>
    </section>
  );
}
