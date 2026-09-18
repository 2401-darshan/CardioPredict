import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  datasetSummary,
  targetDistribution,
  ageBracketPrevalence,
  cholesterolImpact,
  bpBoxPlot,
  evaluationMetrics,
} from "../data/cohortStats";
import ScaleIn from "../components/ScaleIn";

const PIE_COLORS = ["#0fbb8c", "#0a4e40"];

export default function Dashboard() {
  const [tab, setTab] = useState("analytics");

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 animate-scale-in">
      <ScaleIn>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="eyebrow">Dataset Telemetry &amp; ML Architecture</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
              Cardiovascular Cohort Dashboard
            </h1>
          </div>
          <div className="flex rounded-lg border border-line-light dark:border-line-dark p-1 font-mono text-xs">
            <TabButton active={tab === "analytics"} onClick={() => setTab("analytics")}>
              Analytics &amp; Charts
            </TabButton>
            <TabButton active={tab === "pipeline"} onClick={() => setTab("pipeline")}>
              ML Pipeline &amp; Tuning
            </TabButton>
          </div>
        </div>
      </ScaleIn>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <ScaleIn delay={50}>
          <SummaryCard label="Dataset Records" value={datasetSummary.records} note="Cardiovascular cohort" />
        </ScaleIn>
        <ScaleIn delay={120}>
          <SummaryCard label="Input Features" value={datasetSummary.features} note="Clinical &amp; Behavioral" />
        </ScaleIn>
        <ScaleIn delay={190}>
          <SummaryCard label="Target Variable" value={datasetSummary.target} note="Balanced binary outcome" />
        </ScaleIn>
        <ScaleIn delay={260}>
          <SummaryCard label="Core Classifier" value={datasetSummary.classifier} note="Standardized pipeline" />
        </ScaleIn>
      </div>

      {tab === "analytics" ? (
        <div className="grid lg:grid-cols-2 gap-5 mt-6">
          <ScaleIn delay={100}>
            <div className="panel p-6 h-full">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Target Distribution (CVD Presence)</h3>
                <span className="font-mono text-[10px] rounded border border-line-light dark:border-line-dark px-2 py-0.5">
                  Donut
                </span>
              </div>
              <p className="text-sm text-muted-light dark:text-muted-dark mt-1">
                Balanced ~50/50 dataset split across 70,000 observations.
              </p>
              <div className="flex items-center gap-6 mt-2">
                <div className="w-40 h-40 shrink-0 relative">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={targetDistribution}
                        dataKey="value"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                      >
                        {targetDistribution.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 grid place-items-center text-center pointer-events-none">
                    <div>
                      <p className="font-bold text-lg">70.0k</p>
                      <p className="text-[10px] text-muted-light dark:text-muted-dark">Total</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-2 text-sm">
                  {targetDistribution.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-sm shrink-0"
                        style={{ background: PIE_COLORS[i] }}
                      />
                      <span className="text-muted-light dark:text-muted-dark">
                        {d.name}: <strong className="text-ink-light dark:text-ink-dark">{d.value.toLocaleString()}</strong>{" "}
                        ({((d.value / 70000) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  ))}
                  <p className="text-xs text-brand-600 dark:text-brand-300 pt-2">
                    Eliminates need for synthetic oversampling (SMOTE) during initial training baseline.
                  </p>
                </div>
              </div>
            </div>
          </ScaleIn>

          <ScaleIn delay={200}>
            <div className="panel p-6 h-full">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Age Bracket CVD Prevalence</h3>
                <span className="font-mono text-[10px] rounded border border-line-light dark:border-line-dark px-2 py-0.5">
                  Bar Plot
                </span>
              </div>
              <p className="text-sm text-muted-light dark:text-muted-dark mt-1">
                Cardiovascular disease positivity rate grouped by decades.
              </p>
              <div className="h-52 mt-3">
                <ResponsiveContainer>
                  <BarChart data={ageBracketPrevalence}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-line-light dark:stroke-line-dark" vertical={false} />
                    <XAxis dataKey="bracket" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide domain={[0, 80]} />
                    <Tooltip
                      formatter={(v) => [`${v}%`, "CVD rate"]}
                      contentStyle={{ fontSize: 12, borderRadius: 8 }}
                    />
                    <Bar dataKey="rate" radius={[4, 4, 0, 0]} fill="#22dba5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </ScaleIn>

          <ScaleIn delay={150}>
            <div className="panel p-6 h-full">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Serum Cholesterol Level Impact</h3>
                <span className="font-mono text-[10px] rounded border border-line-light dark:border-line-dark px-2 py-0.5">
                  Stacked
                </span>
              </div>
              <p className="text-sm text-muted-light dark:text-muted-dark mt-1">
                Disease frequency across Normal, Above, and High categories.
              </p>
              <div className="mt-4 space-y-4">
                {cholesterolImpact.map((c) => (
                  <div key={c.level}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{c.level}</span>
                      <span className="font-mono text-xs">{c.rate}% CVD Rate</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-line-light dark:bg-line-dark overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${c.rate}%`,
                          background:
                            c.rate > 70 ? "#e5484d" : c.rate > 50 ? "#f0a83c" : "#0fbb8c",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScaleIn>

          <ScaleIn delay={250}>
            <div className="panel p-6 h-full">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Hemodynamic (BP) Box Plot Range</h3>
                <span className="font-mono text-[10px] rounded border border-line-light dark:border-line-dark px-2 py-0.5">
                  Box Plot
                </span>
              </div>
              <p className="text-sm text-muted-light dark:text-muted-dark mt-1">
                Interquartile ranges (IQR) comparing non-CVD vs. diagnosed CVD.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {bpBoxPlot.map((b) => (
                  <div key={b.label} className="rounded-lg border border-line-light dark:border-line-dark p-4">
                    <p className="font-mono text-[10px] text-muted-light dark:text-muted-dark uppercase">
                      {b.label}
                    </p>
                    <p className="font-bold text-xl mt-1">{b.median}</p>
                    <p className="text-xs text-muted-light dark:text-muted-dark mt-1">{b.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScaleIn>
        </div>
      ) : (
        <ScaleIn delay={100}>
          <div className="panel p-6 mt-6">
            <h3 className="font-semibold mb-1">Academic Evaluation Metrics</h3>
            <p className="text-sm text-muted-light dark:text-muted-dark mb-5">
              Metrics awaiting finalized holdout test run. Placeholders remain uninflated per clinical
              rigor protocol — wire these up to your model's real evaluation output.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {evaluationMetrics.map((m) => (
                <div key={m.key} className="rounded-lg border border-line-light dark:border-line-dark p-4 text-center">
                  <p className="font-mono text-[10px] text-muted-light dark:text-muted-dark uppercase">
                    {m.key}
                  </p>
                  <p className="text-2xl font-bold mt-1 text-muted-light dark:text-muted-dark">
                    {m.value}
                  </p>
                  <p className="text-[11px] text-muted-light dark:text-muted-dark mt-1">{m.note}</p>
                </div>
              ))}
            </div>
          </div>
        </ScaleIn>
      )}
    </div>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md transition-colors ${
        active
          ? "bg-ink-light text-white dark:bg-brand-400 dark:text-ink-dark"
          : "text-muted-light dark:text-muted-dark hover:text-ink-light dark:hover:text-ink-dark"
      }`}
    >
      {children}
    </button>
  );
}

function SummaryCard({ label, value, note }) {
  return (
    <div className="panel p-5">
      <p className="font-mono text-[11px] text-muted-light dark:text-muted-dark">{label}</p>
      <p className="text-2xl font-extrabold mt-1">{value}</p>
      <p className="text-xs text-brand-600 dark:text-brand-300 mt-1">{note}</p>
    </div>
  );
}
