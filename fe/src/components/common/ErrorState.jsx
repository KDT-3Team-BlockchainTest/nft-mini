export default function ErrorState({ message, onRetry }) {
  return (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry}>
          다시 시도
        </button>
      ) : null}
    </div>
  );
}
