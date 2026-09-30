function ModelInfo() {

  const models = [
    {
      name: "Logistic Regression",
      type: "SMOTE",
      precision: "4.92%",
      recall: "88.73%",
      f1: "9.33%",
      auc: "97.35%"
    },
    {
      name: "Random Forest",
      type: "SMOTE",
      precision: "94.55%",
      recall: "73.24%",
      f1: "82.54%",
      auc: "97.25%",
      selected: true
    },
    {
      name: "XGBoost",
      type: "SMOTE",
      precision: "88.52%",
      recall: "76.06%",
      f1: "81.82%",
      auc: "97.26%"
    },
    {
      name: "Isolation Forest",
      type: "Anomaly Detection",
      precision: "3.50%",
      recall: "78.87%",
      f1: "6.69%",
      auc: "N/A"
    }
  ];

  return (
    <div className="model-info-card">

      {/* Header */}

      <div className="model-info-header">

        <div>
          <h2>Model Information</h2>

          <p className="model-subtitle">
            Fraud detection model configuration and evaluation
          </p>
        </div>

        <span className="model-status">
          ● Active
        </span>

      </div>


      {/* Current Model */}

      <div className="current-model-banner">

        <div>
          <span className="current-model-label">
            DEPLOYED MODEL
          </span>

          <strong>
            Random Forest
          </strong>
        </div>

        <div className="current-model-metrics">

          <div>
            <span>F1 Score</span>
            <strong>82.54%</strong>
          </div>

          <div>
            <span>Precision</span>
            <strong>94.55%</strong>
          </div>

          <div>
            <span>Recall</span>
            <strong>73.24%</strong>
          </div>

          <div>
            <span>ROC-AUC</span>
            <strong>97.25%</strong>
          </div>

        </div>

      </div>


      {/* Configuration */}

      <div className="model-info-grid">

        <div>
          <span>Algorithm</span>
          <strong>Random Forest</strong>
        </div>

        <div>
          <span>Explainability</span>
          <strong>SHAP</strong>
        </div>

        <div>
          <span>Features</span>
          <strong>30</strong>
        </div>

        <div>
          <span>Decision Threshold</span>
          <strong>70%</strong>
        </div>

      </div>


      {/* Model Comparison */}

      <div className="performance-section">

        <div className="performance-heading">

          <div>
            <h3>Model Evaluation</h3>

            <p>
              Validation and test performance of trained models
            </p>
          </div>

          <span className="metric-note">
            Test metrics
          </span>

        </div>


        <div className="model-comparison-grid">

          {models.map((model) => (

            <div
              key={model.name}
              className={`model-comparison-card ${
                model.selected ? "selected-model" : ""
              }`}
            >

              <div className="comparison-header">

                <div>
                  <h4>{model.name}</h4>

                  <span>
                    {model.type}
                  </span>
                </div>

                {model.selected && (
                  <span className="selected-badge">
                    DEPLOYED
                  </span>
                )}

              </div>


              <div className="metric-row">

                <div>
                  <span>Precision</span>
                  <strong>{model.precision}</strong>
                </div>

                <div>
                  <span>Recall</span>
                  <strong>{model.recall}</strong>
                </div>

              </div>


              <div className="metric-row">

                <div>
                  <span>F1 Score</span>
                  <strong>{model.f1}</strong>
                </div>

                <div>
                  <span>ROC-AUC</span>
                  <strong>{model.auc}</strong>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default ModelInfo;