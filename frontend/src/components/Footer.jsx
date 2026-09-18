import { HeartPulse } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line-light dark:border-line-dark mt-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-2">
          <span className="grid place-items-center w-7 h-7 rounded-md bg-clinicalRed/90 text-white shrink-0">
            <HeartPulse size={14} strokeWidth={2.5} />
          </span>
          <div>
            <p className="font-semibold">CardioPredict</p>
            <p className="text-sm text-muted-light dark:text-muted-dark max-w-md">
              © {new Date().getFullYear()} CardioPredict AI Research Lab. Deterministic clinical
              risk stratification tool for investigational use only.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-light dark:text-muted-dark">
          <a href="#" className="hover:text-brand-500">Model Documentation</a>
          <a href="#" className="hover:text-brand-500">Clinical Disclaimer</a>
          <a href="#" className="hover:text-brand-500">Algorithmic Governance</a>
          <a href="#" className="hover:text-brand-500">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
