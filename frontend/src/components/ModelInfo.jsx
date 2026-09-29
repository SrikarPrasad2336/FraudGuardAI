function ModelInfo() {
  return (
    <div className="model-info-card">

      <div className="model-info-header">
        <h2>Model Information</h2>

        <span className="model-status">
          Active
        </span>
      </div>

      <div className="model-info-grid">

        <div>
          <span>Model</span>
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

    </div>
  );
}

export default ModelInfo;