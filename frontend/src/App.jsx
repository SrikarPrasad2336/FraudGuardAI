import { useEffect, useState } from "react";
import axios from "axios";

import TransactionForm from "./components/TransactionForm";
import PredictionCard from "./components/PredictionCard";
import ExplanationCard from "./components/ExplanationCard";
import PredictionHistory from "./components/PredictionHistory";
import DashboardStats from "./components/DashboardStats";
import ModelInfo from "./components/ModelInfo";

import "./App.css";


// Deployed FastAPI backend
const API_URL = "https://fraudguard-ai-backend-h2k8.onrender.com";


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


  // Save prediction history to localStorage
  useEffect(() => {
    localStorage.setItem(
      "fraudguard_history",
      JSON.stringify(history)
    );
  }, [history]);


  // Clear prediction history
  const clearHistory = () => {
    setHistory([]);
  };


  // Load legitimate sample transaction
  const loadSampleTransaction = async () => {

    try {

      setError("");

      const response = await axios.get(
        `${API_URL}/sample-transaction`
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


  // Load fraud sample transaction
  const loadFraudSample = async () => {

    try {

      setError("");

      const response = await axios.get(
        `${API_URL}/sample-fraud-transaction`
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


  // Analyze transaction
  const analyzeTransaction = async (transaction) => {

    setLoading(true);
    setError("");
    setResult(null);

    try {

      const response = await axios.post(
        `${API_URL}/predict`,
        transaction
      );

      const predictionResult = response.data;

      setResult(predictionResult);


      // Add prediction to history
      const historyItem = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        prediction: predictionResult.prediction,
        label: predictionResult.label,
        fraud_probability:
          predictionResult.fraud_probability,
        risk_level:
          predictionResult.risk_level
      };


      setHistory((previousHistory) => [
        historyItem,
        ...previousHistory
      ]);

    } catch (err) {

      console.error(err);

      setError(
        "Unable to analyze the transaction. Please check the backend connection."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="app">


      {/* Header */}

      <header className="header">

        <div className="header-content">

          <div className="brand">

            <div className="brand-icon">
              F
            </div>

            <div>

              <h1>
                FraudGuard AI
              </h1>

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


        {/* Introduction */}

        <section className="intro-card">

          <div>

            <span className="eyebrow">
              MACHINE LEARNING FRAUD ANALYSIS
            </span>

            <h2>
              Analyze a Credit Card Transaction
            </h2>

            <p>
              FraudGuard AI uses a trained Random Forest
              model to estimate fraud probability and SHAP
              explainability to show which features influenced
              the prediction.
            </p>

          </div>

        </section>


        {/* Dashboard Statistics */}

        <DashboardStats
          history={history}
          currentResult={result}
        />


        {/* Transaction Form */}

        <TransactionForm
          onAnalyze={analyzeTransaction}
          onLoadSample={loadSampleTransaction}
          onLoadFraudSample={loadFraudSample}
          loading={loading}
        />


        {/* Error */}

        {error && (

          <div className="error-message">
            {error}
          </div>

        )}


        {/* Prediction */}

        <PredictionCard
          result={result}
        />


        {/* SHAP Explanation */}

        <ExplanationCard
          result={result}
        />


        {/* Model Information */}

        <ModelInfo />


        {/* Prediction History */}

        <PredictionHistory
          history={history}
          onClear={clearHistory}
        />


      </main>

    </div>

  );
}


export default App;