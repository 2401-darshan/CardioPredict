// Static summary statistics standing in for the real Kaggle cardiovascular
// cohort (70,000 records). Replace with a fetch to your backend / notebook
// export once you have real evaluation numbers.

export const datasetSummary = {
  records: "70,000",
  features: "11 Attributes",
  target: "CVD (0 / 1)",
  classifier: "LogReg",
};

export const targetDistribution = [
  { name: "Absence (Target 0)", value: 35021 },
  { name: "Presence (Target 1)", value: 34979 },
];

export const ageBracketPrevalence = [
  { bracket: "30-39", rate: 26 },
  { bracket: "40-49", rate: 38 },
  { bracket: "50-59", rate: 48 },
  { bracket: "60-69", rate: 58 },
  { bracket: "70+", rate: 69 },
];

export const cholesterolImpact = [
  { level: "Level 1: Normal (< 200 mg/dL)", rate: 44.0 },
  { level: "Level 2: Above Normal (200 - 239 mg/dL)", rate: 60.1 },
  { level: "Level 3: Well Above Normal (≥ 240 mg/dL)", rate: 76.5 },
];

export const bpBoxPlot = [
  { label: "Target 0 (No CVD)", median: "120 / 80", note: "Median mmHg [115-130 IQR]" },
  { label: "Target 1 (CVD Present)", median: "135 / 90", note: "Median mmHg [125-150 IQR]" },
];

// Placeholders until you run a proper holdout evaluation on your trained model.
export const evaluationMetrics = [
  { key: "Accuracy", value: "--", note: "awaiting test set" },
  { key: "Precision", value: "--", note: "macro avg" },
  { key: "Recall (Sens)", value: "--", note: "triage priority" },
  { key: "F1 Score", value: "--", note: "harmonic mean" },
  { key: "5-Fold CV", value: "--", note: "stratified k-fold" },
];
