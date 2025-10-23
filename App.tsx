import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import StudentDashboard from './components/StudentDashboard';
import Header from './components/Header';
import AiMentorChatbot from './components/AiMentorChatbot';
import './index.css';

type View = 'home' | 'dashboard';

function App() {
  const [view, setView] = useState<View>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleGetStarted = () => {
    // Simulate login
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('home');
  };
  
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onLogout={handleLogout} showLogout={view==='dashboard'} />
      <main className="container mx-auto px-4 py-8">
        {view === 'home' && <HomePage onGetStarted={handleGetStarted} />}
        {view === 'dashboard' && <StudentDashboard />}
      </main>
      {view === 'dashboard' && <AiMentorChatbot />}
    </div>
  );
}

export default App;