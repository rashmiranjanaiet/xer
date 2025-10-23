
import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 ${className}`}>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default DashboardCard;
