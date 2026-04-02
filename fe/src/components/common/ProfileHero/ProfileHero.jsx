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
      <div className="profile-hero__avatar">?뫀</div>

      <div className="profile-hero__content">
        <div className="profile-hero__top">
          <h1 className="profile-hero__name">{name}</h1>

          <button
            type="button"
            className="profile-hero__edit-btn"
            onClick={onEditProfile}
          >
            ??
          </button>
        </div>

        <p className="profile-hero__description">{description}</p>

        <div className="profile-hero__wallet-row">
          <div className="profile-hero__wallet-chip">??{walletAddress}</div>
          <button
            type="button"
            className="profile-hero__copy-btn"
            onClick={onCopyAddress}
          >
            二쇱냼 蹂듭궗
          </button>
        </div>
      </div>
    </section>
  );
}
