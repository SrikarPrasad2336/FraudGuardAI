function PredictionHistory({ history, onClear }) {
  if (history.length === 0) {
    return (
      <div className="history-card">
        <h2>Prediction History</h2>

        <p className="empty-history">
          No predictions have been made yet.
        </p>
      </div>
    );
  }

  return (
    <div className="history-card">

      <div className="history-header">
        <div>
          <h2>Prediction History</h2>

          <p>
            Recent transactions analyzed by FraudGuard AI.
          </p>
        </div>

        <button
          className="clear-history-button"
          onClick={onClear}
        >
          Clear History
        </button>
      </div>

      <div className="history-table-wrapper">

        <table className="history-table">

          <thead>
            <tr>
              <th>Time</th>
              <th>Prediction</th>
              <th>Fraud Probability</th>
              <th>Risk</th>
            </tr>
          </thead>

          <tbody>

            {history.map((item) => (

              <tr key={item.id}>

                <td>
                  {item.time}
                </td>

                <td>
                  <span
                    className={
                      item.prediction === 1
                        ? "history-fraud"
                        : "history-legitimate"
                    }
                  >
                    {item.label}
                  </span>
                </td>

                <td>
                  {(item.fraud_probability * 100).toFixed(2)}%
                </td>

                <td>
                  <span className="risk-label">
                    {item.risk_level}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default PredictionHistory;

