import { Link } from "react-router-dom";
import {
  ArrowRight,
  LineChart,
  ShieldCheck,
  BrainCircuit,
  BarChart3,
  Lock,
  Info,
  Activity,
} from "lucide-react";
import EcgWave from "../components/EcgWave";
import ScaleIn from "../components/ScaleIn";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Prediction",
    body: "Machine learning analyzes multiple health parameters to generate a risk prediction based on validated clinical indicators and lifestyle factors.",
    tag: "Standardized weights · Logistic Function",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    body: "Explore health metrics and dataset insights through clear visualizations, benchmarking personal telemetry against population-level cohort trends.",
    tag: "Kaggle Cohort Analysis · Interactive Plots",
  },
  {
    icon: Lock,
    title: "Privacy First",
    body: "Designed with privacy-conscious handling of assessment information. Biometric inputs are processed client-side or within transient API calls without tracking.",
    tag: "Zero Persistent Storage · Stateless Inference",
  },
];

const steps = [
  {
    n: "01",
    title: "Enter Health Details",
    body: "Provide standard biometrics including blood pressure, cholesterol, BMI, and lifestyle routines.",
  },
  {
    n: "02",
    title: "ML Analysis",
    body: "Biometrics pass through StandardScaler normalization and trained Logistic Regression coefficients.",
  },
  {
    n: "03",
    title: "View Prediction",
    body: "Receive an instant risk probability bracket with confidence intervals and factor-level contributions.",
  },
  {
    n: "04",
    title: "Explore Insights",
    body: "Cross-examine findings against 70k Kaggle cardiovascular records to understand relative population risk.",
  },
];

export default function Home() {
  return (
    <div className="animate-scale-in">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-14 pb-16 grid lg:grid-cols-2 gap-12 items-start">
        <ScaleIn delay={100}>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line-light dark:border-line-dark px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-mono text-xs text-muted-light dark:text-muted-dark">
                Machine Learning · Cardiovascular Health
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.05] font-extrabold tracking-tight">
              Understand Your Cardiovascular Risk
            </h1>

            <p className="mt-6 text-lg text-muted-light dark:text-muted-dark max-w-lg">
              CardioPredict uses machine learning to analyze health and lifestyle parameters
              and provide a cardiovascular disease risk prediction.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/assessment" className="btn-primary">
                Start Risk Assessment <ArrowRight size={18} />
              </Link>
              <Link to="/dashboard" className="btn-secondary">
                <LineChart size={18} /> Explore Dashboard
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-light dark:text-muted-dark">
              <ShieldCheck size={16} className="text-brand-500 shrink-0" />
              Trained on 70,000 real-world observational patient records via Scikit-Learn
            </div>
          </div>
        </ScaleIn>

        {/* Live feed card */}
        <ScaleIn delay={250}>
          <div className="panel shadow-panel p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-light dark:text-muted-dark">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                SYNTHETIC CLINICAL FEED
              </div>
              <span className="font-mono text-xs text-brand-600 dark:text-brand-300">
                LIVE STREAM
              </span>
            </div>

            <div className="mt-4 rounded-lg border border-line-light dark:border-line-dark bg-canvas-light dark:bg-[#0b111c] p-3 h-36 relative overflow-hidden">
              <div className="absolute top-2 right-3 font-mono text-[10px] text-muted-light dark:text-muted-dark">
                LEAD II · CAL 10mm/mV
              </div>
              <div className="text-brand-500 h-full flex items-center">
                <EcgWave />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <StatBlock label="HEART RATE" value="72" unit="BPM" note="Optimal sinus" />
              <StatBlock label="HRV METRIC" value="64" unit="ms" note="Nominal var" />
              <StatBlock label="CONFIDENCE" value="94.8" unit="%" note="CI [92–96%]" accent />
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg border border-line-light dark:border-line-dark px-3 py-2">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-light dark:text-muted-dark">
                <Activity size={14} /> Inference: StandardScaler + LogReg
              </div>
              <span className="font-mono text-[10px] rounded bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 px-2 py-0.5">
                Ready
              </span>
            </div>
          </div>
        </ScaleIn>
      </section>

      {/* Architecture / features */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-20">
        <ScaleIn>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Clinical-Grade Machine Learning Architecture
          </h2>
          <p className="mt-2 text-muted-light dark:text-muted-dark max-w-2xl">
            Engineered for academic transparency, clinical calibration, and low-latency prediction.
          </p>
        </ScaleIn>

        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, body, tag }, i) => (
            <ScaleIn key={title} delay={i * 120}>
              <div className="panel p-6 flex flex-col h-full">
                <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-900/40 grid place-items-center text-brand-600 dark:text-brand-300 mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-light dark:text-muted-dark flex-1">{body}</p>
                <p className="mt-4 pt-4 border-t border-line-light dark:border-line-dark font-mono text-[11px] text-muted-light dark:text-muted-dark">
                  {tag}
                </p>
              </div>
            </ScaleIn>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-16">
        <ScaleIn>
          <div className="panel p-7 sm:p-9">
            <span className="eyebrow">Protocol Workflow</span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1">
              Deterministic Assessment Process
            </h2>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s, idx) => (
                <ScaleIn key={s.n} delay={idx * 100}>
                  <div className="border border-line-light dark:border-line-dark rounded-lg p-5 h-full">
                    <span className="font-mono text-brand-500 text-sm">{s.n}</span>
                    <h3 className="font-semibold mt-2">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-light dark:text-muted-dark">{s.body}</p>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </ScaleIn>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-10">
        <ScaleIn>
          <div className="rounded-xl bg-ink-light dark:bg-[#0e1a2b] text-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Ready to quantify your cardiovascular profile?</h3>
              <p className="mt-2 text-white/70 max-w-lg">
                Complete the structured three-stage assessment. Takes less than 2 minutes with
                standard health metrics.
              </p>
            </div>
            <Link
              to="/assessment"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-brand-400 text-ink-light font-semibold px-5 py-3 hover:bg-brand-300 transition-colors"
            >
              Begin Free Stratification
            </Link>
          </div>
        </ScaleIn>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-16">
        <ScaleIn>
          <div className="panel p-5 flex gap-3 text-sm text-muted-light dark:text-muted-dark">
            <Info size={18} className="shrink-0 mt-0.5 text-brand-500" />
            <p>
              <span className="font-semibold text-ink-light dark:text-ink-dark">
                Academic &amp; Clinical Disclaimer:
              </span>{" "}
              CardioPredict is an investigational decision-support demo created for machine
              learning educational presentation and research demonstrations. Predictions are
              statistical estimates derived from Kaggle cardiovascular observational datasets and
              do not constitute professional diagnosis or clinical care advice.
            </p>
          </div>
        </ScaleIn>
      </section>
    </div>
  );
}

function StatBlock({ label, value, unit, note, accent }) {
  return (
    <div className="rounded-lg border border-line-light dark:border-line-dark p-3">
      <p className="font-mono text-[10px] text-muted-light dark:text-muted-dark">{label}</p>
      <p className={`mt-1 font-bold text-lg ${accent ? "text-brand-600 dark:text-brand-300" : ""}`}>
        {value}
        <span className="text-xs font-normal text-muted-light dark:text-muted-dark ml-0.5">
          {unit}
        </span>
      </p>
      <p className="text-[11px] text-muted-light dark:text-muted-dark">{note}</p>
    </div>
  );
}
