import { useState } from "react";

const initialValues = {
  Time: 0,
  Amount: 0,
};

for (let i = 1; i <= 28; i++) {
  initialValues[`V${i}`] = 0;
}

function TransactionForm({
  onAnalyze,
  onLoadSample,
  onLoadFraudSample,
  loading,
}) {
  const [formData, setFormData] = useState(initialValues);
  const [showAdvanced, setShowAdvanced] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: Number(value),
    }));
  };

  const handleLoadSample = async () => {
    const sample = await onLoadSample();

    if (sample) {
      setFormData(sample);
    }
  };

  const handleLoadFraudSample = async () => {
    const sample = await onLoadFraudSample();

    if (sample) {
      setFormData(sample);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAnalyze(formData);
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>

      {/* Quick Test Section */}

      <div className="quick-test-section">

        <div>
          <h3>Quick Test</h3>

          <p>
            Load a real transaction from the dataset for testing.
          </p>
        </div>

        <div className="sample-buttons">

          <button
            type="button"
            className="sample-button"
            onClick={handleLoadSample}
          >
            Load Legitimate Sample
          </button>

          <button
            type="button"
            className="fraud-sample-button"
            onClick={handleLoadFraudSample}
          >
            Load Fraud Sample
          </button>

        </div>

      </div>


      {/* Transaction Details */}

      <div className="form-section">

        <div className="section-heading">

          <div>
            <h3>Transaction Details</h3>

            <p>
              Basic transaction information.
            </p>
          </div>

        </div>


        <div className="input-grid basic-inputs">

          <div className="input-group">

            <label htmlFor="Time">
              Transaction Time
            </label>

            <span className="input-description">
              Time elapsed since the first transaction
            </span>

            <input
              id="Time"
              name="Time"
              type="number"
              step="any"
              value={formData.Time}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label htmlFor="Amount">
              Transaction Amount
            </label>

            <span className="input-description">
              Transaction amount
            </span>

            <input
              id="Amount"
              name="Amount"
              type="number"
              min="0"
              step="any"
              value={formData.Amount}
              onChange={handleChange}
              required
            />

          </div>

        </div>

      </div>


      {/* Advanced Features */}

      <div className="form-section">

        <button
          type="button"
          className="advanced-toggle"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <span>
            Advanced Transaction Features
          </span>

          <span>
            {showAdvanced ? "▲" : "▼"}
          </span>
        </button>


        {showAdvanced && (

          <div className="advanced-content">

            <p className="advanced-description">
              V1 to V28 are anonymized PCA-derived features
              from the credit-card fraud dataset.
            </p>


            <div className="input-grid">

              {Array.from(
                { length: 28 },
                (_, index) => {

                  const featureName = `V${index + 1}`;

                  return (
                    <div
                      className="input-group"
                      key={featureName}
                    >

                      <label htmlFor={featureName}>
                        {featureName}
                      </label>

                      <input
                        id={featureName}
                        name={featureName}
                        type="number"
                        step="any"
                        value={formData[featureName]}
                        onChange={handleChange}
                        required
                      />

                    </div>
                  );
                }
              )}

            </div>

          </div>

        )}

      </div>


      {/* Analyze */}

      <button
        className="analyze-button"
        type="submit"
        disabled={loading}
      >

        {loading
          ? "Analyzing Transaction..."
          : "Analyze Transaction"}

      </button>

    </form>
  );
}

export default TransactionForm;