# CardioPredict — React + Vite + Tailwind Frontend

A cardiovascular disease risk assessment frontend: landing page, a multi-step
risk assessment wizard, a cohort analytics dashboard, and an about/architecture
page. Includes dark/light mode and a clean integration point for your own
trained ML model.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
  components/       Navbar, Footer, EcgWave (shared UI)
  context/          ThemeContext (dark/light mode)
  pages/            Home, RiskAssessment, Dashboard, About
  services/
    predictService.js   <-- connect your ML model here
  data/
    cohortStats.js       Sample dataset stats shown on the Dashboard
backend/
  main.py           Example FastAPI server matching the /predict contract
  requirements.txt
```

## Connecting Your Own ML Model

1. Train and export your model (e.g. `joblib.dump(model, "model.pkl")`).
2. Open `backend/main.py` and replace the body of `predict_with_model()`
   with your real `model.predict_proba()` call. Drop `model.pkl` /
   `scaler.pkl` next to that file and load them at startup.
3. Run the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
4. Copy `.env.example` to `.env` in the project root (already points to
   `http://localhost:8000` by default).
5. In `src/services/predictService.js`, set `USE_MOCK_FALLBACK = false`
   once your backend is confirmed working. Until then, the UI runs on a
   transparent local heuristic so it's fully demoable without a live model.

The frontend never imports your model directly — it only talks to
`POST /predict`, so you can swap Scikit-learn, XGBoost, or anything else
behind that endpoint without touching any React code.

## Build for production

```bash
npm run build
npm run preview
```

## Tech stack

- React 18 + Vite
- Tailwind CSS (class-based dark mode)
- React Router
- Recharts (dashboard charts)
- lucide-react (icons)
