import ScaleIn from "../components/ScaleIn";

const stages = [
  {
    n: "Stage 1: Input Gathering",
    title: "User Biometric Input",
    body: "User supplies clinical variables (ap_hi, ap_lo, cholesterol, glucose, smoking status, BMI) via the interactive multi-step assessment wizard.",
  },
  {
    n: "Stage 2: Client Validation",
    title: "Frontend Validation & Sanitation",
    body: "Values verified against physiological bounds (e.g. ap_hi between 70-240 mmHg) and formatted to match the model's training schema.",
  },
  {
    n: "Stage 3: REST Dispatch",
    title: "REST Transmission",
    body: "Dispatches an asynchronous HTTP POST to the /predict endpoint, serialized via a strict-validation payload.",
  },
  {
    n: "Stage 4: Inference Execution",
    title: "Preprocessing & Model Inference",
    body: "Backend process applies the trained scaler transform followed by predict_proba() to evaluate the binary risk sigmoid output.",
  },
  {
    n: "Stage 5: Response Visualization",
    title: "Confidence Envelope & Risk Score Returned",
    body: "Calculated probability bracket and factor impact breakdowns render dynamically on the interactive gauge card.",
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 lg:px-8 py-12 animate-scale-in">
      <ScaleIn>
        <span className="eyebrow">Project System Architecture</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
          CardioPredict Machine Learning Capstone
        </h1>
        <p className="mt-3 text-muted-light dark:text-muted-dark max-w-2xl">
          An academic and engineering demonstration uniting a trained classical ML model with a
          modern React client interface and a REST prediction backend.
        </p>
      </ScaleIn>

      <ScaleIn delay={100}>
        <div className="panel p-7 sm:p-9 mt-8">
          <h2 className="font-semibold text-lg mb-6">End-to-End System Execution Sequence</h2>
          <ol className="relative border-l border-line-light dark:border-line-dark pl-6 space-y-8">
            {stages.map((s, idx) => (
              <li key={s.n} className="relative">
                <span className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-brand-500" />
                <p className="eyebrow">{s.n}</p>
                <h3 className="font-semibold mt-1">{s.title}</h3>
                <p className="text-sm text-muted-light dark:text-muted-dark mt-1 max-w-2xl">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </ScaleIn>

      <ScaleIn delay={180}>
        <div className="panel p-7 sm:p-9 mt-6">
          <h2 className="font-semibold text-lg mb-3">Model Selection Rationale</h2>
          <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
            While non-linear ensemble models like XGBoost and Random Forests are popular in
            benchmark contests, clinical decision-support systems frequently prioritize{" "}
            <strong className="text-ink-light dark:text-ink-dark">
              interpretability, calibrated probabilities, and deterministic accountability
            </strong>
            . A linear model's coefficients represent log-odds multipliers that can be inspected,
            audited, and reconciled with established epidemiological findings — which is why this
            scaffold defaults to a simple, explainable baseline that you can swap for your own
            trained model without changing the frontend contract.
          </p>
        </div>
      </ScaleIn>

      <ScaleIn delay={260}>
        <div className="panel p-7 sm:p-9 mt-6">
          <h2 className="font-semibold text-lg mb-3">Bring your own model</h2>
          <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
            The frontend never imports your model directly — it talks to a single REST contract at{" "}
            <code className="px-1.5 py-0.5 rounded bg-canvas-light dark:bg-canvas-dark border border-line-light dark:border-line-dark font-mono text-xs">
              POST /predict
            </code>
            . Everything you need to connect a Scikit-learn, XGBoost, or PyTorch model lives in{" "}
            <code className="px-1.5 py-0.5 rounded bg-canvas-light dark:bg-canvas-dark border border-line-light dark:border-line-dark font-mono text-xs">
              src/services/predictService.js
            </code>{" "}
            and the example FastAPI server included in the project's <code className="px-1.5 py-0.5 rounded bg-canvas-light dark:bg-canvas-dark border border-line-light dark:border-line-dark font-mono text-xs">backend/</code> folder.
          </p>
        </div>
      </ScaleIn>
    </div>
  );
}
