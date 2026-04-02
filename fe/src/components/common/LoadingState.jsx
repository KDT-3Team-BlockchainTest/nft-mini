export default function LoadingState({ message = "불러오는 중입니다..." }) {
  return <p style={{ textAlign: "center", padding: "24px 0" }}>{message}</p>;
}
