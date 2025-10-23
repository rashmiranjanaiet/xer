
import React, { useState, useEffect } from 'react';

interface CareerReadinessScoreProps {
  score: number;
}

const CareerReadinessScore: React.FC<CareerReadinessScoreProps> = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setAnimatedScore(score));
    return () => cancelAnimationFrame(animation);
  }, [score]);

  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  let colorClass = 'text-red-500';
  if (score >= 75) {
    colorClass = 'text-green-500';
  } else if (score >= 50) {
    colorClass = 'text-yellow-500';
  } else if (score >= 25) {
    colorClass = 'text-orange-500';
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90"
      >
        <circle
          className="text-slate-200 dark:text-slate-700"
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-4xl font-extrabold ${colorClass}`}>
          {Math.round(animatedScore)}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">/ 100</span>
      </div>
    </div>
  );
};

export default CareerReadinessScore;
