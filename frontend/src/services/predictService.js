/**
 * predictService.js
 * ------------------------------------------------------------------
 * Single integration point between React frontend and FastAPI backend.
 * Calls POST /predict on the FastAPI backend using cardio_model.pkl.
 * ------------------------------------------------------------------
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const PREDICT_ENDPOINT = `${API_BASE_URL}/predict`;

/**
 * Shapes the wizard's form state into the exact 11 feature parameters
 * expected by cardio_model.pkl in FastAPI backend.
 */
export function buildPredictionPayload(formState) {
  const { personal, biomarkers, lifestyle } = formState;

  return {
    age_years: Number(personal.age_years),
    gender: Number(personal.gender), // 1 = Female, 2 = Male
    height: Number(personal.height),
    weight: Number(personal.weight),
    ap_hi: Number(biomarkers.ap_hi),
    ap_lo: Number(biomarkers.ap_lo),
    cholesterol: Number(biomarkers.cholesterol), // 1 = Normal, 2 = Above Normal, 3 = Well Above Normal
    gluc: Number(biomarkers.gluc), // 1 = Normal, 2 = Above Normal, 3 = Well Above Normal
    smoke: Number(lifestyle.smoke), // 0 = No, 1 = Yes
    alco: Number(lifestyle.alco), // 0 = No, 1 = Yes
    active: Number(lifestyle.active), // 0 = No, 1 = Yes
  };
}

/**
 * Calls the live FastAPI /predict model endpoint.
 * Throws a clean error if backend is unreachable or returns an error status.
 */
export async function predictRisk(formState) {
  const payload = buildPredictionPayload(formState);

  let response;
  try {
    response = await fetch(PREDICT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (netErr) {
    throw new Error(
      `FastAPI backend service is unavailable at ${PREDICT_ENDPOINT}. Please make sure your backend server is running.`
    );
  }

  if (!response.ok) {
    let errorDetail = `Backend error ${response.status}`;
    try {
      const errData = await response.json();
      if (errData.detail) {
        if (Array.isArray(errData.detail)) {
          errorDetail = errData.detail.map((d) => d.msg || JSON.stringify(d)).join("; ");
        } else {
          errorDetail = String(errData.detail);
        }
      }
    } catch (_) {}
    throw new Error(errorDetail);
  }

  const data = await response.json();

  // Validate response format
  if (typeof data.prediction === "undefined" || typeof data.probability_disease === "undefined") {
    throw new Error("Invalid response format received from backend model service.");
  }

  return data;
}
