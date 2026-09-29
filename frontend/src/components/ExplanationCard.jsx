function ExplanationCard({ result }) {
  if (!result || !result.top_features) {
    return null;
  }

  return (
    <div className="explanation-card">

      <h2>Why did the model make this prediction?</h2>

      <p className="explanation-description">
        These are the features with the largest SHAP contributions
        for this transaction.
      </p>


      <div className="feature-list">

        {result.top_features.map((item) => {

          const isPositive = item.shap_value > 0;

          return (
            <div
              className="feature-item"
              key={item.feature}
            >

              <div className="feature-info">

                <strong>
                  {item.feature}
                </strong>

                <span>
                  SHAP: {item.shap_value.toFixed(4)}
                </span>

              </div>


              <div
                className={
                  isPositive
                    ? "impact positive"
                    : "impact negative"
                }
              >
                {isPositive
                  ? "Increased fraud risk"
                  : "Decreased fraud risk"}
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default ExplanationCard;