import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import Opportunities from './components/Opportunities';
import Tasks from './components/Tasks';
import Calendar from './components/Calendar';
import Email from './components/Email';
import Analytics from './components/Analytics';
import Integrations from './components/Integrations';

export type View = 'dashboard' | 'contacts' | 'opportunities' | 'tasks' | 'calendar' | 'email' | 'analytics' | 'integrations';

function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'contacts':
        return <Contacts searchTerm={searchTerm} />;
      case 'opportunities':
        return <Opportunities searchTerm={searchTerm} />;
      case 'tasks':
        return <Tasks searchTerm={searchTerm} />;
      case 'calendar':
        return <Calendar searchTerm={searchTerm} />;
      case 'email':
        return <Email searchTerm={searchTerm} />;
      case 'analytics':
        return <Analytics />;
      case 'integrations':
        return <Integrations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          activeView={activeView}
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;