function PredictionCard({ result }) {

  if (!result) {
    return null;
  }

  const isFraud = result.prediction === 1;

  const probability =
    result.fraud_probability * 100;

  return (
    <div
      className={
        `prediction-card ${
          isFraud ? "fraud" : "legitimate"
        }`
      }
    >

      <div className="prediction-header">

        <div>

          <span className="prediction-label">
            Model Prediction
          </span>

          <h2>
            {isFraud
              ? "FRAUD DETECTED"
              : "LEGITIMATE TRANSACTION"}
          </h2>

        </div>


        <div
          className={
            `risk-badge ${
              result.risk_level.toLowerCase()
            }`
          }
        >
          {result.risk_level} RISK
        </div>

      </div>


      <div className="probability-section">

        <div>
          <span>
            Fraud Probability
          </span>

          <strong>
            {probability.toFixed(2)}%
          </strong>
        </div>


        <div className="probability-bar">

          <div
            className={
              `probability-fill ${
                isFraud ? "fraud-fill" : "safe-fill"
              }`
            }
            style={{
              width: `${Math.min(probability, 100)}%`
            }}
          />

        </div>

      </div>


      <div className="threshold-info">

        Decision threshold:
        {" "}
        {(result.threshold * 100).toFixed(0)}%

      </div>

    </div>
  );
}

export default PredictionCard;