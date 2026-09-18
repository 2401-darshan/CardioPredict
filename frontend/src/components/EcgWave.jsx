export default function EcgWave() {
  const path =
    "M0,60 L40,60 L55,60 L65,20 L75,100 L85,10 L95,60 L110,60 L160,60 L175,60 L185,20 L195,100 L205,10 L215,60 L230,60 L280,60 L295,60 L305,20 L315,100 L325,10 L335,60 L350,60 L400,60";

  return (
    <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ecgFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="15%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke="url(#ecgFade)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand-400 animate-[dash_3.2s_linear_infinite]"
        style={{
          strokeDasharray: 1200,
          strokeDashoffset: 1200,
        }}
      />
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
