
import React from 'react';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="text-center py-24">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 via-sky-500 to-indigo-500 text-transparent bg-clip-text mb-4">
        AI-Powered Career & Internship Platform
      </h1>
      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
        Unlock your potential. BPUT SkillSphere analyzes your profile to create a personalized roadmap to your dream career.
      </p>
      <button
        onClick={onGetStarted}
        className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-lg hover:bg-primary-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-500/50"
      >
        Get Started
      </button>
      <div className="mt-16 max-w-4xl mx-auto">
        <img src="https://picsum.photos/seed/tech/1024/400" alt="Dashboard Preview" className="rounded-xl shadow-2xl ring-1 ring-slate-900/10" />
      </div>
    </div>
  );
};

export default HomePage;
