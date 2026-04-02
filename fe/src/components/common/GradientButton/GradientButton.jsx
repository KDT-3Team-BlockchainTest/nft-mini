import "./GradientButton.css";

export default function GradientButton({
  children,
  type = "button",
  onClick,
}) {
  return (
    <button type={type} className="gradient-button" onClick={onClick}>
      {children}
    </button>
  );
}
