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

      {/* Total Transactions */}
      <div className="stat-card">
        <div className="stat-icon">↗</div>

        <span className="stat-label">
          Transactions Analyzed
        </span>

        <strong className="stat-value">
          {totalTransactions}
        </strong>

        <span className="stat-description">
          Total transactions processed
        </span>
      </div>


      {/* Fraud Alerts */}
      <div className="stat-card fraud-stat">
        <div className="stat-icon">!</div>

        <span className="stat-label">
          Fraud Alerts
        </span>

        <strong className="stat-value">
          {fraudCount}
        </strong>

        <span className="stat-description">
          Transactions classified as fraud
        </span>
      </div>


      {/* Legitimate */}
      <div className="stat-card legitimate-stat">
        <div className="stat-icon">✓</div>

        <span className="stat-label">
          Legitimate
        </span>

        <strong className="stat-value">
          {legitimateCount}
        </strong>

        <span className="stat-description">
          Transactions classified as safe
        </span>
      </div>


      {/* Current Risk */}
      <div className="stat-card risk-stat">
        <div className="stat-icon">◈</div>

        <span className="stat-label">
          Current Risk
        </span>

        <strong className="stat-value">
          {currentRisk}
        </strong>

        <span className="stat-description">
          Latest transaction risk level
        </span>
      </div>

    </div>
  );
}

export default DashboardStats;