from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pandas as pd
from pathlib import Path

from api.model_service import predict_transaction

app = FastAPI(
    title="FraudGuard AI API",
    description="Explainable Credit Card Fraud Detection API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_PATH = BASE_DIR / "data" / "creditcard.csv"

class TransactionRequest(BaseModel):
    Time: float

    V1: float
    V2: float
    V3: float
    V4: float
    V5: float
    V6: float
    V7: float
    V8: float
    V9: float
    V10: float
    V11: float
    V12: float
    V13: float
    V14: float
    V15: float
    V16: float
    V17: float
    V18: float
    V19: float
    V20: float
    V21: float
    V22: float
    V23: float
    V24: float
    V25: float
    V26: float
    V27: float
    V28: float

    Amount: float = Field(ge=0)


@app.get("/")
def root():
    return {
        "message": "FraudGuard AI API is running",
        "status": "success"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

@app.get("/sample-transaction")
def sample_transaction():

    try:
        df = pd.read_csv(DATASET_PATH)

        sample = df.iloc[0]

        transaction = {
            feature: float(sample[feature])
            for feature in [
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
        }

        return transaction

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.get("/sample-fraud-transaction")
def sample_fraud_transaction():

    try:
        df = pd.read_csv(DATASET_PATH)

        fraud_rows = df[df["Class"] == 1]

        if fraud_rows.empty:
            raise HTTPException(
                status_code=404,
                detail="No fraud transactions found"
            )

        sample = fraud_rows.iloc[0]

        features = [
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

        transaction = {
            feature: float(sample[feature])
            for feature in features
        }

        return transaction

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.get("/model-info")
def model_info():
    return {
        "model": "Random Forest",
        "model_file": "random_forest_smote.joblib",
        "fraud_threshold": 0.70,
        "features": 30,
        "explainability": "SHAP",
        "description": "Explainable credit card fraud detection"
    }

@app.post("/predict")
def predict(transaction: TransactionRequest):

    try:
        transaction_data = transaction.model_dump()

        result = predict_transaction(transaction_data)

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )