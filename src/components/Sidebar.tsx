import React from 'react';
import { LayoutDashboard, Users, Target, CheckSquare, Calendar, Mail, BarChart3, Settings, Zap, Link, Sparkles } from 'lucide-react';
import type { View } from '../App';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'contacts' as View, label: 'Contacts', icon: Users },
    { id: 'opportunities' as View, label: 'Opportunities', icon: Target },
    { id: 'tasks' as View, label: 'Tasks', icon: CheckSquare },
    { id: 'calendar' as View, label: 'Calendar', icon: Calendar },
    { id: 'email' as View, label: 'Email Campaigns', icon: Mail },
    { id: 'analytics' as View, label: 'Analytics', icon: BarChart3 },
    { id: 'integrations' as View, label: 'Integrations', icon: Link },
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
      
      {/* Logo */}
      <div className="relative p-8 border-b border-slate-700/50">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-3 shadow-2xl">
              <Zap size={28} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-1">
              <Sparkles size={12} className="text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient">GDPilia</h1>
            <p className="text-sm text-slate-400 font-medium">AI-Powered CRM</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`sidebar-item ${
                isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'
              }`}
            >
              <div className="relative">
                <Icon size={22} className={`transition-all duration-300 ${isActive ? 'drop-shadow-lg' : ''}`} />
                {isActive && (
                  <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl"></div>
                )}
              </div>
              <span className="font-semibold text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Settings & User */}
      <div className="relative p-6 border-t border-slate-700/50 space-y-4">
        <button className="sidebar-item sidebar-item-inactive">
          <Settings size={22} />
          <span className="font-semibold text-sm">Settings</span>
        </button>
        
        {/* User Profile */}
        <div className="glass-effect rounded-xl p-4 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl p-2">
              <span className="text-white font-bold text-sm">GA</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">GDP Admin</p>
              <p className="text-slate-400 text-xs">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
    </div>
  );
};

export default Sidebar;