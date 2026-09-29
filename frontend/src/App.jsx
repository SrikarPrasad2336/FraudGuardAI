import { useEffect, useState } from "react";
import axios from "axios";

import TransactionForm from "./components/TransactionForm";
import PredictionCard from "./components/PredictionCard";
import ExplanationCard from "./components/ExplanationCard";
import PredictionHistory from "./components/PredictionHistory";
import DashboardStats from "./components/DashboardStats";
import ModelInfo from "./components/ModelInfo";

import "./App.css";


function App() {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [history, setHistory] = useState(() => {
  const savedHistory = localStorage.getItem(
    "fraudguard_history"
  );

  return savedHistory
    ? JSON.parse(savedHistory)
    : [];
});

useEffect(() => {
  localStorage.setItem(
    "fraudguard_history",
    JSON.stringify(history)
  );
}, [history]);

const clearHistory = () => {
  setHistory([]);
};

  const loadFraudSample = async () => {
  try {
    setError("");

    const response = await axios.get(
      "http://127.0.0.1:8000/sample-fraud-transaction"
    );

    return response.data;

  } catch (err) {
    console.error(err);

    setError(
      "Unable to load fraud sample transaction."
    );

    return null;
  }
};

  const loadSampleTransaction = async () => {
  try {
    setError("");

    const response = await axios.get(
      "http://127.0.0.1:8000/sample-transaction"
    );

    return response.data;

  } catch (err) {
    console.error(err);

    setError(
      "Unable to load sample transaction."
    );

    return null;
  }
};

const analyzeTransaction = async (transaction) => {

  setLoading(true);
  setError("");
  setResult(null);

  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      transaction
    );

    const predictionResult = response.data;

    setResult(predictionResult);

    const historyItem = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      prediction: predictionResult.prediction,
      label: predictionResult.label,
      fraud_probability:
        predictionResult.fraud_probability,
      risk_level: predictionResult.risk_level
    };

    setHistory((previousHistory) => [
      historyItem,
      ...previousHistory
    ]);

  } catch (err) {

    console.error(err);

    setError(
      "Unable to analyze the transaction. Please check that the backend is running."
    );

  } finally {

    setLoading(false);

  }
};


  return (

    <div className="app">

      <header className="header">

  <div className="header-content">

    <div className="brand">

      <div className="brand-icon">
        F
      </div>

      <div>
        <h1>FraudGuard AI</h1>

        <p>
          Explainable Credit Card Fraud Detection
        </p>
      </div>

    </div>

    <div className="system-status">
      <span className="status-dot"></span>
      System Online
    </div>

  </div>

</header>

      <main className="main-container">

        <section className="intro-card">

  <div>

    <span className="eyebrow">
      MACHINE LEARNING FRAUD ANALYSIS
    </span>

    <h2>
      Analyze a Credit Card Transaction
    </h2>

    <p>
      FraudGuard AI uses a trained Random Forest model
      to estimate fraud probability and SHAP explainability
      to show which features influenced the prediction.
    </p>

  </div>

</section>

        <DashboardStats
  history={history}
  currentResult={result}
/>

        <TransactionForm
          onAnalyze={analyzeTransaction}
          onLoadSample={loadSampleTransaction}
          onLoadFraudSample={loadFraudSample}
          loading={loading}
        />


        {error && (

          <div className="error-message">
            {error}
          </div>

        )}


        <PredictionCard result={result} />


        <ExplanationCard result={result} />

        <ModelInfo />

<PredictionHistory
  history={history}
  onClear={clearHistory}
/>

        <PredictionHistory
  history={history}
  onClear={clearHistory}
/>

      </main>

    </div>

  );
}


export default App;