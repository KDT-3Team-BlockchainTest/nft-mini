import "./StepIndicator.css";

export default function StepIndicator({ steps = [], currentStep = 1 }) {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.key} className="step-indicator__item">
            <div className="step-indicator__top">
              <div
                className={`step-indicator__circle ${
                  isActive ? "is-active" : ""
                }`}
              >
                {stepNumber}
              </div>

              {!isLast ? <div className="step-indicator__line" /> : null}
            </div>

            <div className="step-indicator__label">{step.label}</div>
          </div>
        );
      })}
    </div>
  );
}
