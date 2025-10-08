import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import AppRoutes from './routes';

/**
 * Root application with Ocean Professional theme applied.
 */
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className="app-shell">
      <Topbar theme={theme} onToggleTheme={toggleTheme} />
      <div className="app-body">
        <Sidebar />
        <main className="app-content">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;
