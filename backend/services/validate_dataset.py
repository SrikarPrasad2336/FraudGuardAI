import pandas as pd
from pathlib import Path

DATA_PATH = Path(__file__).parent.parent / "data" / "creditcard.csv"

print("=" * 60)
print("FraudGuard AI - Dataset Validation")
print("=" * 60)

print("\nLoading dataset...")

df = pd.read_csv(DATA_PATH)

print("\nDataset loaded successfully!")

print("\nShape:")
print(df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 rows:")
print(df.head())

print("\nData types:")
print(df.dtypes)

print("\nMissing values:")
print(df.isnull().sum().sum())

print("\nClass distribution:")
print(df["Class"].value_counts())

print("\nClass percentage:")
print(df["Class"].value_counts(normalize=True) * 100)

print("\nDuplicate rows:")
print(df.duplicated().sum())

print("\nDataset validation completed!")

print("=" * 60)