import joblib
import shap
import pandas as pd
import numpy as np
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()


FRAUD_THRESHOLD = float(
    os.getenv("FRAUD_THRESHOLD", "0.70")
)

# --------------------------------------------------
# Paths
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_DIR = BASE_DIR / "models"
PROCESSED_DIR = BASE_DIR / "data" / "processed"


# --------------------------------------------------
# Load model and scaler
# --------------------------------------------------

model = joblib.load(
    MODEL_DIR / "random_forest_smote.joblib"
)

scaler = joblib.load(
    PROCESSED_DIR / "scaler.joblib"
)


# --------------------------------------------------
# SHAP explainer
# --------------------------------------------------

explainer = shap.TreeExplainer(model)


# --------------------------------------------------
# Feature names
# --------------------------------------------------

FEATURE_NAMES = [
    "Time",
    "V1",
    "V2",
    "V3",
    "V4",
    "V5",
    "V6",
    "V7",
    "V8",
    "V9",
    "V10",
    "V11",
    "V12",
    "V13",
    "V14",
    "V15",
    "V16",
    "V17",
    "V18",
    "V19",
    "V20",
    "V21",
    "V22",
    "V23",
    "V24",
    "V25",
    "V26",
    "V27",
    "V28",
    "Amount"
]


# --------------------------------------------------
# Fraud threshold
# --------------------------------------------------

FRAUD_THRESHOLD = 0.70


# --------------------------------------------------
# Prepare transaction
# --------------------------------------------------

def prepare_transaction(transaction: dict) -> pd.DataFrame:

    df = pd.DataFrame(
        [[transaction[feature] for feature in FEATURE_NAMES]],
        columns=FEATURE_NAMES
    )

    # Scale only Time and Amount
    df[["Time", "Amount"]] = scaler.transform(
        df[["Time", "Amount"]]
    )

    return df


# --------------------------------------------------
# Extract fraud SHAP values
# --------------------------------------------------

def get_fraud_shap_values(processed_data):

    shap_values = explainer.shap_values(processed_data)

    # SHAP newer versions can return:
    # (samples, features, classes)

    if isinstance(shap_values, np.ndarray):

        if shap_values.ndim == 3:
            return shap_values[0, :, 1]

        elif shap_values.ndim == 2:
            return shap_values[0]

    # Older SHAP versions return a list
    if isinstance(shap_values, list):
        return shap_values[1][0]

    raise ValueError("Unexpected SHAP output format")


# --------------------------------------------------
# Generate prediction
# --------------------------------------------------

def predict_transaction(transaction: dict) -> dict:

    processed_data = prepare_transaction(transaction)

    # ----------------------------------------------
    # Prediction probability
    # ----------------------------------------------

    probability = model.predict_proba(
        processed_data
    )[0][1]

    probability = float(probability)

    prediction = int(
        probability >= FRAUD_THRESHOLD
    )

    if prediction == 1:
        label = "FRAUD"
    else:
        label = "LEGITIMATE"


    # ----------------------------------------------
    # SHAP explanation
    # ----------------------------------------------

    shap_values = get_fraud_shap_values(
        processed_data
    )


    # ----------------------------------------------
    # Get top 5 features
    # ----------------------------------------------

    top_indices = np.argsort(
        np.abs(shap_values)
    )[::-1][:5]


    explanations = []

    for index in top_indices:

        feature = FEATURE_NAMES[index]

        original_value = float(
        transaction[feature]
        )

        model_value = float(
        processed_data.iloc[0][feature]
    )

        contribution = float(
            shap_values[index]
        )

        if contribution > 0:
            direction = "increased"
        else:
            direction = "decreased"


        explanations.append({
    "feature": feature,
    "original_value": round(original_value, 6),
    "model_value": round(model_value, 6),
    "shap_value": round(contribution, 6),
    "impact": direction
    })


    # ----------------------------------------------
    # Risk level
    # ----------------------------------------------

    if probability >= 0.70:
        risk_level = "HIGH"

    elif probability >= 0.30:
        risk_level = "MEDIUM"

    else:
        risk_level = "LOW"


    # ----------------------------------------------
    # Final response
    # ----------------------------------------------

    return {
        "prediction": prediction,
        "label": label,
        "fraud_probability": round(probability, 6),
        "threshold": FRAUD_THRESHOLD,
        "risk_level": risk_level,
        "top_features": explanations
    }