import React from 'react';

interface CircularScoreMeterProps {
  score: number;
  threatTier?: string;
}

export const CircularScoreMeter: React.FC<CircularScoreMeterProps> = ({ score, threatTier }) => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine color based on score
  let strokeColor = '#ef4444'; // Red
  let textGlow = 'rgba(239, 68, 68, 0.5)';

  if (score >= 80) {
    strokeColor = '#00ff9d'; // Neon Green
    textGlow = 'rgba(0, 255, 157, 0.6)';
  } else if (score >= 60) {
    strokeColor = '#06b6d4'; // Cyan
    textGlow = 'rgba(6, 182, 212, 0.6)';
  } else if (score >= 40) {
    strokeColor = '#f59e0b'; // Amber
    textGlow = 'rgba(245, 158, 11, 0.5)';
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        {/* Outer track */}
        <circle
          stroke="rgba(30, 41, 59, 0.8)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Animated score arc */}
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease-in-out, stroke 0.5s ease' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      
      {/* Center score readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span 
          className="text-4xl font-bold font-orbitron tracking-tight"
          style={{ color: strokeColor, textShadow: `0 0 15px ${textGlow}` }}
        >
          {score}
        </span>
        <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">/ 100 SCORE</span>
      </div>

      {threatTier && (
        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-mono border border-cyan-500/30 bg-cyan-950/40 text-cyan-300">
          <span className="w-1.5 h-1.5 rounded-full mr-2 animate-pulse" style={{ backgroundColor: strokeColor }}></span>
          {threatTier}
        </div>
      )}
    </div>
  );
};
