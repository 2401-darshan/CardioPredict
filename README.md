# ❤️ CardioPredict

CardioPredict is a machine learning-based web application that predicts the risk of cardiovascular disease using patient health information.

The project uses a trained Logistic Regression model integrated with a FastAPI backend and a React frontend.

## 🚀 Live Demo

👉 **[Open CardioPredict Live](https://cardiopredict-health.vercel.app/)**

---

## 📌 Project Overview

Cardiovascular diseases are one of the major health concerns worldwide. CardioPredict provides a simple web interface where users can enter basic health information and receive a machine learning-based prediction.

The application uses the following patient information:

- Age
- Gender
- Height
- Weight
- Systolic Blood Pressure
- Diastolic Blood Pressure
- Cholesterol
- Glucose
- Smoking
- Alcohol Consumption
- Physical Activity

The trained model returns:

- Probability of no cardiovascular disease
- Probability of cardiovascular disease
- Final prediction

> ⚠️ **Disclaimer:** This project is intended for educational and demonstration purposes and should not be used as a substitute for professional medical advice.

---

## 🤖 Machine Learning

### Dataset

The project uses the **Cardiovascular Disease Dataset** containing approximately 70,000 patient records.

The dataset contains health and lifestyle information along with a target variable indicating the presence or absence of cardiovascular disease.

### Model

The primary machine learning model used in the application is:

**Logistic Regression**

The preprocessing pipeline contains:

1. StandardScaler
2. Logistic Regression

The final trained pipeline is saved as:

```text
cardio_model.pkl
```

### Model Performance

The Logistic Regression model achieved approximately:

| Metric | Score |
|---|---:|
| Accuracy | 72.29% |
| Precision | 74.49% |
| Recall | 67.95% |
| F1 Score | 71.07% |
| 5-Fold CV Average | 71.89% |

These results are based on the project's test and cross-validation evaluation.

---

## 🏗️ System Architecture

```text
User
  │
  ▼
React Frontend
  │
  │ POST /predict
  ▼
FastAPI Backend
  │
  ▼
cardio_model.pkl
  │
  ├── StandardScaler
  │
  └── Logistic Regression
  │
  ▼
Prediction + Probabilities
  │
  ▼
React Result Page
```

---

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

### Machine Learning

- Scikit-learn
- Pandas
- NumPy
- Joblib
- Logistic Regression
- StandardScaler

### Deployment

- Vercel — Frontend
- Render — Backend
- GitHub — Source Code

---

## 📁 Project Structure

```text
CardioPredict/
│
├── backend/
│   ├── main.py
│   ├── cardio_model.pkl
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── data/
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

---

## ⚙️ Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/2401-darshan/CardioPredict.git
```

```bash
cd CardioPredict
```

### 2. Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://localhost:8000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

## 🔌 API

### POST `/predict`

The frontend sends patient information to the FastAPI backend.

### Example Request

```json
{
  "age_years": 50,
  "gender": 1,
  "height": 165,
  "weight": 70,
  "ap_hi": 120,
  "ap_lo": 80,
  "cholesterol": 1,
  "gluc": 1,
  "smoke": 0,
  "alco": 0,
  "active": 1
}
```

### Example Response

```json
{
  "prediction": 0,
  "probability_no_disease": 0.659,
  "probability_disease": 0.341
}
```

---

## 🌐 Deployment

### Frontend

The React frontend is deployed using Vercel.

👉 **[CardioPredict Live Application](https://cardiopredict-health.vercel.app/)**

### Backend

The FastAPI backend is deployed using Render.

```text
https://cardiopredict-backend-g1nj.onrender.com
```

---

## 🔬 Features

- ❤️ Cardiovascular disease risk prediction
- 📊 Probability-based prediction results
- 🧠 Machine learning model integration
- ⚡ FastAPI REST API
- 💻 React-based user interface
- 📱 Responsive design
- 🌐 Live cloud deployment
- 🔄 Frontend and backend integration

---

## 🎯 Project Purpose

This project was developed as a machine learning project to demonstrate how a trained classification model can be integrated into a full-stack web application and deployed to the cloud.

It combines machine learning, REST API development, frontend development, and cloud deployment into a single project.

---

## 👨‍💻 Author

**Darshan**

B.Sc. (Hons.) Computer Science

---

## 📄 License

This project is intended for educational purposes.
```

After pasting, click **Commit changes**.

Your GitHub repository will then have a professional README with the **Live Demo** prominently available to anyone viewing your project.
