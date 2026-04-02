import "./GradientButton.css";

export default function GradientButton({ children, type = "button" }) {
  return (
    <button type={type} className="gradient-button">
      {children}
    </button>
  );
}
