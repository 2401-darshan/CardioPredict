"""
CardioPredict - FastAPI Backend

Loads trained cardio_model.pkl and provides POST /predict for cardiovascular risk prediction.
"""

import os
import joblib
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# ============================================================
# CREATE FASTAPI APP
# ============================================================

app = FastAPI(title="CardioPredict Inference API")


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# LOAD TRAINED MODEL AT STARTUP
# ============================================================

MODEL_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "cardio_model.pkl"
)

try:
    model = joblib.load(MODEL_PATH)
    print(f"Cardio model loaded successfully from {MODEL_PATH}")
except Exception as e:
    model = None
    print(f"ERROR: Could not load cardio_model.pkl: {e}")


# ============================================================
# INPUT DATA MODEL (PYDANTIC)
# ============================================================

class PatientFeatures(BaseModel):
    age_years: float = Field(
        ...,
        ge=1,
        le=120,
        description="Age of patient in years"
    )
    gender: int = Field(
        ...,
        description="1 = Female, 2 = Male"
    )
    height: float = Field(
        ...,
        gt=0,
        description="Height in cm"
    )
    weight: float = Field(
        ...,
        gt=0,
        description="Weight in kg"
    )
    ap_hi: int = Field(
        ...,
        description="Systolic blood pressure (mmHg)"
    )
    ap_lo: int = Field(
        ...,
        description="Diastolic blood pressure (mmHg)"
    )
    cholesterol: int = Field(
        ...,
        ge=1,
        le=3,
        description="1 = Normal, 2 = Above Normal, 3 = Well Above Normal"
    )
    gluc: int = Field(
        ...,
        ge=1,
        le=3,
        description="1 = Normal, 2 = Above Normal, 3 = Well Above Normal"
    )
    smoke: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = No, 1 = Yes"
    )
    alco: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = No, 1 = Yes"
    )
    active: int = Field(
        ...,
        ge=0,
        le=1,
        description="0 = No, 1 = Yes"
    )


# ============================================================
# HEALTH CHECK ENDPOINT
# ============================================================

@app.get("/")
def health_check():
    return {
        "status": "ok",
        "service": "CardioPredict Inference API",
        "model_loaded": model is not None
    }


# ============================================================
# PREDICTION ENDPOINT
# ============================================================

@app.post("/predict")
def predict(features: PatientFeatures):
    if model is None:
        raise HTTPException(
            status_code=500,
            detail="cardio_model.pkl is missing or failed to load on backend startup."
        )

    # DataFrame with exact 11 feature names and exact order
    feature_dict = {
        "age_years": features.age_years,
        "gender": features.gender,
        "height": features.height,
        "weight": features.weight,
        "ap_hi": features.ap_hi,
        "ap_lo": features.ap_lo,
        "cholesterol": features.cholesterol,
        "gluc": features.gluc,
        "smoke": features.smoke,
        "alco": features.alco,
        "active": features.active,
    }

    df = pd.DataFrame([feature_dict])

    try:
        prediction_val = int(model.predict(df)[0])
        
        if hasattr(model, "predict_proba"):
            probabilities = model.predict_proba(df)[0]
            prob_no_disease = round(float(probabilities[0]), 4)
            prob_disease = round(float(probabilities[1]), 4)
        else:
            prob_disease = float(prediction_val)
            prob_no_disease = 1.0 - prob_disease

        return {
            "prediction": prediction_val,
            "probability_no_disease": prob_no_disease,
            "probability_disease": prob_disease
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error executing model prediction: {str(e)}"
        )