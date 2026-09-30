# FraudGuard AI

## Explainable Real-Time Financial Fraud Detection System

FraudGuard AI is a machine learning based credit card fraud detection system that analyzes transaction data, predicts the probability of fraud, assigns a risk level, and explains the prediction using SHAP.

The system combines a React frontend, FastAPI backend, machine learning models, and SHAP explainability into a complete web application.

## Live Demo

Frontend:

https://fraudguardai-en77.onrender.com

Backend API:

https://fraudguard-ai-backend-h2k8.onrender.com

API Documentation:

https://fraudguard-ai-backend-h2k8.onrender.com/docs

---

# Features

- Real-time transaction fraud prediction
- Random Forest based fraud detection
- Fraud probability estimation
- Configurable fraud decision threshold
- Low, Medium, and High risk classification
- SHAP based explainability
- Top contributing features for every prediction
- Legitimate transaction sample
- Fraud transaction sample
- Prediction history using browser local storage
- Model performance dashboard
- Responsive React interface
- FastAPI REST API
- Cloud deployment using Render

---

# System Architecture

```text
                         USER
                           |
                           v
              +-------------------------+
              |     React Frontend      |
              |        Vite             |
              +-----------+-------------+
                          |
                          | HTTPS REST API
                          v
              +-------------------------+
              |     FastAPI Backend     |
              +-----------+-------------+
                          |
              +-----------+-----------+
              |                       |
              v                       v
      +---------------+       +---------------+
      | Random Forest |       |     SHAP      |
      |     Model     |       | Explainability|
      +-------+-------+       +-------+-------+
              |                       |
              +-----------+-----------+
                          |
                          v
                Prediction + Risk
                 + Explanation


              MACHINE LEARNING PIPELINE


              Credit Card Dataset
        |
        v
Data Validation
        |
        v
Duplicate Removal
        |
        v
Train / Validation / Test Split
        |
        v
Feature Scaling
        |
        v
SMOTE on Training Data
        |
        +-------------------+
        |                   |
        v                   v
Logistic Regression    Random Forest
        |                   |
        v                   v
    XGBoost          Isolation Forest
        |                   |
        +---------+---------+
                  |
                  v
          Model Evaluation
                  |
                  v
           Random Forest
                  |
                  v
               SHAP
                  |
                  v
       Explainable Prediction