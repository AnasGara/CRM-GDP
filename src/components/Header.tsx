import React from 'react';
import { Search, Bell, User, Sparkles, Zap } from 'lucide-react';
import type { View } from '../App';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeView: View;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, activeView }) => {
  const getTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Dashboard';
      case 'contacts':
        return 'Contacts';
      case 'opportunities':
        return 'Opportunities';
      case 'tasks':
        return 'Tasks & Reminders';
      case 'calendar':
        return 'Calendar & Appointments';
      case 'email':
        return 'Email Campaigns';
      case 'analytics':
        return 'Analytics & Reports';
      case 'integrations':
        return 'Integrations';
      default:
        return 'Dashboard';
    }
  };

  const getDescription = () => {
    switch (activeView) {
      case 'dashboard':
        return 'Welcome back to your AI-powered workspace';
      case 'contacts':
        return 'Manage your business relationships with intelligence';
      case 'opportunities':
        return 'Track and optimize your sales pipeline';
      case 'tasks':
        return 'Stay organized with smart task management';
      case 'calendar':
        return 'Schedule and manage appointments seamlessly';
      case 'email':
        return 'Create powerful email campaigns with AI insights';
      case 'analytics':
        return 'Discover insights that drive growth';
      case 'integrations':
        return 'Connect your favorite tools and workflows';
      default:
        return 'Welcome back to your AI-powered workspace';
    }
  };

  return (
    <header className="glass-effect border-b border-white/20 px-8 py-6 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap size={24} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-1 animate-pulse">
              <Sparkles size={10} className="text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gradient">{getTitle()}</h2>
            <p className="text-slate-600 mt-1 font-medium">
              {getDescription()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Search */}
          {['contacts', 'opportunities', 'tasks', 'calendar', 'email'].includes(activeView) && (
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search with AI..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="input-modern pl-12 pr-6 py-3 w-80 shadow-lg focus:shadow-xl"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg px-2 py-1">
                  <Sparkles size={12} className="text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          <button className="relative p-3 glass-effect rounded-xl hover:shadow-lg transition-all duration-300 group">
            <Bell size={20} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
              3
            </span>
          </button>

          {/* Profile */}
          <button className="flex items-center space-x-3 glass-effect rounded-xl px-4 py-3 hover:shadow-lg transition-all duration-300 group">
            <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl p-2 group-hover:scale-110 transition-transform">
              <User size={18} className="text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm font-semibold text-slate-700 block">GDP Admin</span>
              <span className="text-xs text-slate-500">Premium</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;