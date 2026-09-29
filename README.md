# FraudGuard AI

## Explainable Credit Card Fraud Detection System

FraudGuard AI is a machine learning based fraud detection application that analyzes credit card transactions and predicts whether a transaction is potentially fraudulent.

The system combines a Random Forest classifier with SHAP explainability to provide both a prediction and an explanation of the features that influenced the prediction.

## Features

- Credit card fraud detection
- Random Forest classification
- SMOTE for imbalanced training data
- Fraud probability prediction
- Configurable fraud decision threshold
- SHAP based explainability
- Individual transaction explanations
- FastAPI REST API
- React dashboard
- Sample legitimate and fraud transactions
- Prediction history
- Risk classification

## Architecture

```text
React Frontend
       |
       | HTTP / Axios
       v
FastAPI Backend
       |
       v
Preprocessing
       |
       v
Random Forest Model
       |
       +---------> Fraud Probability
       |
       +---------> SHAP Explanation
       |
       v
Prediction + Risk + Explanation