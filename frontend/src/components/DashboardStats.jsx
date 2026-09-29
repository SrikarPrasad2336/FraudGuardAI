function DashboardStats({ history, currentResult }) {

  const totalTransactions = history.length;

  const fraudCount = history.filter(
    (item) => item.prediction === 1
  ).length;

  const legitimateCount = history.filter(
    (item) => item.prediction === 0
  ).length;

  const currentRisk = currentResult
    ? currentResult.risk_level
    : "N/A";

  return (
    <div className="stats-grid">

      <div className="stat-card">
        <span className="stat-label">
          Transactions Analyzed
        </span>

        <strong className="stat-value">
          {totalTransactions}
        </strong>
      </div>


      <div className="stat-card fraud-stat">
        <span className="stat-label">
          Fraud Alerts
        </span>

        <strong className="stat-value">
          {fraudCount}
        </strong>
      </div>


      <div className="stat-card legitimate-stat">
        <span className="stat-label">
          Legitimate
        </span>

        <strong className="stat-value">
          {legitimateCount}
        </strong>
      </div>


      <div className="stat-card risk-stat">
        <span className="stat-label">
          Current Risk
        </span>

        <strong className="stat-value">
          {currentRisk}
        </strong>
      </div>

    </div>
  );
}

export default DashboardStats;