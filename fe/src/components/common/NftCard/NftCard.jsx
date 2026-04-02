import "./NftCard.css";

export default function NftCard({ image, badge, title, creator, price }) {
  return (
    <article className="nft-card">
      <div className="nft-card__image-wrap">
        <img src={image} alt={title} className="nft-card__image" />
        {badge ? <span className="nft-card__badge">{badge}</span> : null}
        <button type="button" className="nft-card__like">
          ♡
        </button>
      </div>

      <div className="nft-card__body">
        <h3 className="nft-card__title">{title}</h3>
        <p className="nft-card__creator">by {creator}</p>

        <div className="nft-card__bottom">
          <div>
            <span className="nft-card__label">가격</span>
            <strong className="nft-card__price">{price}</strong>
          </div>
          <button type="button" className="nft-card__view-btn">
            보기
          </button>
        </div>
      </div>
    </article>
  );
}
