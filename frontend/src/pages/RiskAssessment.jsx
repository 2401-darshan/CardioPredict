import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Target,
  RefreshCw,
  Ruler,
  Cigarette,
  Wine,
  Move,
  AlertCircle,
  ShieldAlert,
  HeartPulse,
  Cpu,
  Activity,
} from "lucide-react";
import { predictRisk } from "../services/predictService";
import ScaleIn from "../components/ScaleIn";

const STEPS = ["Personal", "Biomarkers", "Lifestyle", "Results"];

const initialState = {
  personal: {
    age_years: "50",
    gender: "1", // 1 = Female, 2 = Male
    height: "165",
    weight: "70",
  },
  biomarkers: {
    ap_hi: "120",
    ap_lo: "80",
    cholesterol: "1", // 1 = Normal, 2 = Above Normal, 3 = Well Above Normal
    gluc: "1",        // 1 = Normal, 2 = Above Normal, 3 = Well Above Normal
  },
  lifestyle: {
    smoke: "0",  // 0 = No, 1 = Yes
    alco: "0",   // 0 = No, 1 = Yes
    active: "1", // 0 = No, 1 = Yes
  },
};

export default function RiskAssessment() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const bmi =
    form.personal.height && form.personal.weight && Number(form.personal.height) > 0
      ? (
          Number(form.personal.weight) /
          ((Number(form.personal.height) / 100) ** 2)
        ).toFixed(1)
      : "--";

  const validateStep0 = () => {
    const { age_years, gender, height, weight } = form.personal;
    if (!age_years || !gender || !height || !weight) {
      setError("Please fill in all personal demographic fields.");
      return false;
    }
    if (Number(age_years) < 1 || Number(age_years) > 120) {
      setError("Age must be between 1 and 120 years.");
      return false;
    }
    if (Number(height) < 40 || Number(height) > 250) {
      setError("Height must be a valid value in cm (40 - 250).");
      return false;
    }
    if (Number(weight) < 10 || Number(weight) > 300) {
      setError("Weight must be a valid value in kg (10 - 300).");
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep1 = () => {
    const { ap_hi, ap_lo, cholesterol, gluc } = form.biomarkers;
    if (!ap_hi || !ap_lo || !cholesterol || !gluc) {
      setError("Please fill in all biomarker fields.");
      return false;
    }
    if (Number(ap_hi) < 40 || Number(ap_hi) > 260) {
      setError("Systolic BP (ap_hi) must be between 40 and 260 mmHg.");
      return false;
    }
    if (Number(ap_lo) < 30 || Number(ap_lo) > 200) {
      setError("Diastolic BP (ap_lo) must be between 30 and 200 mmHg.");
      return false;
    }
    setError(null);
    return true;
  };

  const goNext = () => {
    if (step === 0 && !validateStep0()) return;
    if (step === 1 && !validateStep1()) return;
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const runAssessment = async () => {
    if (!validateStep0() || !validateStep1()) return;
    setError(null);
    setLoading(true);
    try {
      // Minimum 1.5s delay to show the smooth loading animation
      const [res] = await Promise.all([
        predictRisk(form),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
      setResult(res);
      setStep(3);
    } catch (err) {
      setError(err.message || "An unexpected error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm(initialState);
    setResult(null);
    setError(null);
    setStep(0);
  };

  return (
    <div className="mx-auto max-w-4xl px-5 lg:px-8 py-12 animate-scale-in">
      <ScaleIn>
        <div className="text-center">
          <span className="eyebrow">CardioPredict Model Inference</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
            Cardiovascular Risk Stratification
          </h1>
          <p className="mt-2 text-muted-light dark:text-muted-dark">
            Enter patient clinical indicators to receive predictions from the trained Logistic Regression model (`cardio_model.pkl`).
          </p>
        </div>
      </ScaleIn>

      <ScaleIn delay={100}>
        <StepIndicator steps={STEPS} current={loading ? 2 : step} />
      </ScaleIn>

      {error && (
        <div className="mt-6 panel p-4 bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 flex items-start gap-3 rounded-lg">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-sm">Assessment Error</p>
            <p className="text-xs mt-0.5">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-xs underline hover:no-underline font-mono"
          >
            Dismiss
          </button>
        </div>
      )}

      <ScaleIn delay={180}>
        <div className="panel p-6 sm:p-8 mt-6">
          {loading ? (
            <StepLoading />
          ) : (
            <>
              {step === 0 && (
                <StepPersonal
                  data={form.personal}
                  bmi={bmi}
                  onChange={(personal) => setForm((f) => ({ ...f, personal }))}
                  onNext={goNext}
                />
              )}
              {step === 1 && (
                <StepParameters
                  data={form.biomarkers}
                  onChange={(biomarkers) => setForm((f) => ({ ...f, biomarkers }))}
                  onNext={goNext}
                  onBack={goBack}
                />
              )}
              {step === 2 && (
                <StepLifestyle
                  data={form.lifestyle}
                  onChange={(lifestyle) => setForm((f) => ({ ...f, lifestyle }))}
                  onBack={goBack}
                  onSubmit={runAssessment}
                  loading={loading}
                />
              )}
              {step === 3 && result && (
                <StepResults result={result} form={form} bmi={bmi} onReset={reset} />
              )}
            </>
          )}
        </div>
      </ScaleIn>
    </div>
  );
}

function StepLoading() {
  const [phase, setPhase] = useState(0);
  const phases = [
    "Formatting 11 feature parameters...",
    "Sending request to FastAPI /predict...",
    "Applying StandardScaler normalization...",
    "Computing Logistic Regression sigmoid prediction...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % phases.length);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      <div className="relative grid place-items-center mb-6">
        {/* Animated pulse rings */}
        <div className="absolute w-24 h-24 rounded-full bg-brand-500/20 animate-ping" />
        <div className="absolute w-16 h-16 rounded-full bg-brand-500/30 animate-pulse" />
        <div className="relative w-14 h-14 rounded-full bg-brand-500 text-white grid place-items-center shadow-lg shadow-brand-500/30">
          <HeartPulse size={28} className="animate-bounce" />
        </div>
      </div>

      <h3 className="text-xl font-bold tracking-tight">Analyzing Cardiovascular Parameters</h3>
      <p className="text-sm font-mono text-brand-600 dark:text-brand-400 mt-2 h-6 flex items-center justify-center gap-2">
        <Cpu size={16} className="animate-spin" /> {phases[phase]}
      </p>

      {/* Progress Line */}
      <div className="w-64 h-1.5 rounded-full bg-line-light dark:bg-line-dark mt-6 overflow-hidden relative">
        <div className="h-full bg-brand-500 rounded-full animate-[loadingProgress_1.5s_ease-in-out_infinite]" />
      </div>

      <p className="text-xs text-muted-light dark:text-muted-dark mt-4">
        Model: <code>cardio_model.pkl</code> via FastAPI REST Service
      </p>
    </div>
  );
}

function StepIndicator({ steps, current }) {
  return (
    <div className="panel px-6 py-5 mt-8 flex items-center">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 rounded-full grid place-items-center font-mono text-sm font-semibold transition-colors ${
                i <= current
                  ? "bg-brand-500 text-white"
                  : "bg-canvas-light dark:bg-canvas-dark border border-line-light dark:border-line-dark text-muted-light dark:text-muted-dark"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-xs font-mono ${
                i <= current
                  ? "text-ink-light dark:text-ink-dark font-medium"
                  : "text-muted-light dark:text-muted-dark"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-px flex-1 mx-3 ${
                i < current ? "bg-brand-500" : "bg-line-light dark:bg-line-dark"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function bmiTag(bmi) {
  const n = Number(bmi);
  if (isNaN(n)) return { text: "Pending", cls: "text-muted-light" };
  if (n < 18.5) return { text: "Underweight (<18.5)", cls: "text-clinicalAmber" };
  if (n < 25) return { text: "Normal (18.5 - 24.9)", cls: "text-brand-500" };
  if (n < 30) return { text: "Overweight (25.0 - 29.9)", cls: "text-clinicalAmber" };
  return { text: "Obese (≥ 30.0)", cls: "text-clinicalRed" };
}

function StepPersonal({ data, bmi, onChange, onNext }) {
  const tag = bmiTag(bmi);
  return (
    <div>
      <h2 className="text-xl font-bold">Demographics &amp; Anthropometrics</h2>
      <p className="text-sm text-muted-light dark:text-muted-dark mt-1">
        Primary anatomical inputs required for the 11-feature model.
      </p>
      <div className="h-px bg-line-light dark:bg-line-dark my-6" />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Age in Years (age_years)" hint="Range: 1-120" unit="years">
          <input
            type="number"
            className="input-field"
            value={data.age_years}
            min={1}
            max={120}
            onChange={(e) => onChange({ ...data, age_years: e.target.value })}
          />
        </Field>
        <Field label="Gender (gender)">
          <select
            className="input-field"
            value={data.gender}
            onChange={(e) => onChange({ ...data, gender: e.target.value })}
          >
            <option value="1">Female</option>
            <option value="2">Male</option>
          </select>
        </Field>
        <Field label="Height (height)" unit="cm">
          <input
            type="number"
            className="input-field"
            value={data.height}
            onChange={(e) => onChange({ ...data, height: e.target.value })}
          />
        </Field>
        <Field label="Weight (weight)" unit="kg">
          <input
            type="number"
            className="input-field"
            value={data.weight}
            onChange={(e) => onChange({ ...data, weight: e.target.value })}
          />
        </Field>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg border border-line-light dark:border-line-dark px-4 py-3">
        <div className="flex items-center gap-3">
          <Ruler size={18} className="text-brand-500" />
          <div>
            <p className="font-mono text-[11px] text-muted-light dark:text-muted-dark">
              Computed Body Mass Index (BMI)
            </p>
            <p className="font-bold text-lg">{bmi} kg/m²</p>
          </div>
        </div>
        <span className={`font-mono text-xs px-2.5 py-1 rounded-full border border-current/30 ${tag.cls}`}>
          {tag.text}
        </span>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={onNext} className="btn-primary">
          Next: Biomarkers <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function StepParameters({ data, onChange, onNext, onBack }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Hemodynamic &amp; Metabolic Biomarkers</h2>
      <p className="text-sm text-muted-light dark:text-muted-dark mt-1">
        Blood pressure, cholesterol, and glucose clinical tiers.
      </p>
      <div className="h-px bg-line-light dark:bg-line-dark my-6" />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Systolic Blood Pressure (ap_hi)" hint="e.g. 120" unit="mmHg">
          <input
            type="number"
            className="input-field"
            value={data.ap_hi}
            onChange={(e) => onChange({ ...data, ap_hi: e.target.value })}
          />
        </Field>
        <Field label="Diastolic Blood Pressure (ap_lo)" hint="e.g. 80" unit="mmHg">
          <input
            type="number"
            className="input-field"
            value={data.ap_lo}
            onChange={(e) => onChange({ ...data, ap_lo: e.target.value })}
          />
        </Field>
        <Field label="Cholesterol Level (cholesterol)">
          <select
            className="input-field"
            value={data.cholesterol}
            onChange={(e) => onChange({ ...data, cholesterol: e.target.value })}
          >
            <option value="1">Normal</option>
            <option value="2">Above Normal</option>
            <option value="3">Well Above Normal</option>
          </select>
        </Field>
        <Field label="Glucose Level (gluc)">
          <select
            className="input-field"
            value={data.gluc}
            onChange={(e) => onChange({ ...data, gluc: e.target.value })}
          >
            <option value="1">Normal</option>
            <option value="2">Above Normal</option>
            <option value="3">Well Above Normal</option>
          </select>
        </Field>
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          <ChevronLeft size={18} /> Back
        </button>
        <button onClick={onNext} className="btn-primary">
          Next: Lifestyle <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function StepLifestyle({ data, onChange, onBack, onSubmit, loading }) {
  const options = [
    {
      key: "smoke",
      icon: Cigarette,
      title: "Smoking Habit (smoke)",
      body: "Does the patient currently smoke tobacco?",
    },
    {
      key: "alco",
      icon: Wine,
      title: "Alcohol Intake (alco)",
      body: "Does the patient regularly consume alcohol?",
    },
    {
      key: "active",
      icon: Move,
      title: "Physical Activity (active)",
      body: "Is the patient regularly physically active?",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold">Behavioral &amp; Lifestyle Factors</h2>
      <p className="text-sm text-muted-light dark:text-muted-dark mt-1">
        Select Yes or No for each lifestyle indicator required by the ML model.
      </p>
      <div className="h-px bg-line-light dark:bg-line-dark my-6" />

      <div className="flex flex-col gap-4">
        {options.map(({ key, icon: Icon, title, body }) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-line-light dark:border-line-dark p-4"
          >
            <div className="flex items-start gap-3">
              <Icon size={20} className="text-muted-light dark:text-muted-dark shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-muted-light dark:text-muted-dark">{body}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => onChange({ ...data, [key]: "0" })}
                className={`px-4 py-1.5 text-xs font-mono rounded-md border transition-colors ${
                  data[key] === "0"
                    ? "bg-brand-500 text-white border-brand-500 font-bold"
                    : "border-line-light dark:border-line-dark text-muted-light dark:text-muted-dark hover:text-ink-light dark:hover:text-ink-dark"
                }`}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...data, [key]: "1" })}
                className={`px-4 py-1.5 text-xs font-mono rounded-md border transition-colors ${
                  data[key] === "1"
                    ? "bg-brand-500 text-white border-brand-500 font-bold"
                    : "border-line-light dark:border-line-dark text-muted-light dark:text-muted-dark hover:text-ink-light dark:hover:text-ink-dark"
                }`}
              >
                Yes
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          <ChevronLeft size={18} /> Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="btn-primary bg-brand-600 dark:bg-brand-500"
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Target size={18} /> Assess Risk
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function StepResults({ result, form, bmi, onReset }) {
  const isHighRisk = result.prediction === 1;
  const diseaseProb = result.probability_disease;
  const noDiseaseProb = result.probability_no_disease;
  const pctDisease = Math.round(diseaseProb * 100);

  const circumference = 2 * Math.PI * 54;
  const dash = (diseaseProb) * circumference;

  const statusTitle = isHighRisk ? "Higher predicted risk" : "Lower predicted risk";
  const badgeCls = isHighRisk
    ? "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30"
    : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
  const strokeCls = isHighRisk ? "stroke-red-500" : "stroke-emerald-500";
  const textCls = isHighRisk ? "text-red-500" : "text-emerald-500";

  const genderLabel = form.personal.gender === "1" ? "Female" : "Male";
  const cholesterolLabel =
    form.biomarkers.cholesterol === "1"
      ? "Normal"
      : form.biomarkers.cholesterol === "2"
      ? "Above Normal"
      : "Well Above Normal";
  const glucLabel =
    form.biomarkers.gluc === "1"
      ? "Normal"
      : form.biomarkers.gluc === "2"
      ? "Above Normal"
      : "Well Above Normal";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] rounded bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 px-2.5 py-1">
            REAL ML INFERENCE · FASTAPI
          </span>
          <span className="font-mono text-[11px] rounded border border-line-light dark:border-line-dark px-2.5 py-1">
            cardio_model.pkl
          </span>
        </div>
        <button onClick={onReset} className="btn-secondary text-sm !px-3 !py-2">
          <RefreshCw size={15} /> New Assessment
        </button>
      </div>

      {/* Main Result Hero Card */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="panel p-6 flex flex-col items-center justify-center text-center">
          <p className="font-mono text-[11px] text-muted-light dark:text-muted-dark mb-3">
            Predicted CVD Probability
          </p>
          <div className="relative w-44 h-44">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                strokeWidth="10"
                className="stroke-line-light dark:stroke-line-dark"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                className={strokeCls}
                stroke="currentColor"
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center flex-col">
              <div className="text-center">
                <p className="text-3xl font-extrabold">{pctDisease}%</p>
                <p className={`font-mono text-xs mt-0.5 font-bold ${textCls}`}>
                  Prediction: {result.prediction}
                </p>
              </div>
            </div>
          </div>

          <div className={`mt-4 px-4 py-1.5 rounded-full border text-xs font-bold font-mono ${badgeCls}`}>
            {statusTitle}
          </div>

          <div className="mt-4 text-xs text-muted-light dark:text-muted-dark space-y-1 font-mono">
            <p>Probability (Disease): <strong>{(diseaseProb * 100).toFixed(1)}%</strong> ({diseaseProb})</p>
            <p>Probability (No Disease): <strong>{(noDiseaseProb * 100).toFixed(1)}%</strong> ({noDiseaseProb})</p>
          </div>
        </div>

        {/* Input Vector Summary */}
        <div className="panel p-6">
          <h3 className="font-semibold text-sm mb-3">Submitted Model Features (11 attributes)</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <FeatureBadge label="age_years" value={`${form.personal.age_years} yrs`} />
            <FeatureBadge label="gender" value={genderLabel} />
            <FeatureBadge label="height" value={`${form.personal.height} cm`} />
            <FeatureBadge label="weight" value={`${form.personal.weight} kg`} />
            <FeatureBadge label="ap_hi" value={`${form.biomarkers.ap_hi} mmHg`} />
            <FeatureBadge label="ap_lo" value={`${form.biomarkers.ap_lo} mmHg`} />
            <FeatureBadge label="cholesterol" value={cholesterolLabel} />
            <FeatureBadge label="gluc" value={glucLabel} />
            <FeatureBadge label="smoke" value={form.lifestyle.smoke === "1" ? "Yes (1)" : "No (0)"} />
            <FeatureBadge label="alco" value={form.lifestyle.alco === "1" ? "Yes (1)" : "No (0)"} />
            <FeatureBadge label="active" value={form.lifestyle.active === "1" ? "Yes (1)" : "No (0)"} />
            <FeatureBadge label="BMI (derived)" value={`${bmi} kg/m²`} />
          </div>
        </div>
      </div>

      {/* Required Disclaimer */}
      <div className="mt-6 panel p-4 bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 flex items-start gap-3 rounded-lg text-xs">
        <ShieldAlert size={20} className="shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm">Academic ML Prediction Disclaimer</p>
          <p className="mt-1">
            This prediction is generated directly by your pre-trained Scikit-learn Logistic Regression model (<code>cardio_model.pkl</code>) via FastAPI. This output is strictly an <strong>academic ML prediction and NOT a medical diagnosis</strong>. Always consult a certified medical professional for healthcare guidance.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureBadge({ label, value }) {
  return (
    <div className="rounded border border-line-light dark:border-line-dark p-2 bg-canvas-light/50 dark:bg-canvas-dark/50">
      <p className="font-mono text-[10px] text-muted-light dark:text-muted-dark uppercase">{label}</p>
      <p className="font-semibold text-ink-light dark:text-ink-dark truncate">{value}</p>
    </div>
  );
}

function Field({ label, hint, unit, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="label-sm">{label}</label>
        {hint && <span className="text-xs text-muted-light dark:text-muted-dark">{hint}</span>}
      </div>
      <div className="relative">
        {children}
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-light dark:text-muted-dark pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
