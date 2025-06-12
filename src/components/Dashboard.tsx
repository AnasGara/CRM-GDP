import React from 'react';
import { Users, Target, CheckSquare, TrendingUp, DollarSign, Clock, ArrowUpRight, Sparkles, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Contacts',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Active Opportunities',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: Target,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50',
    },
    {
      title: 'Pending Tasks',
      value: '23',
      change: '-5%',
      changeType: 'negative',
      icon: CheckSquare,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
    },
    {
      title: 'Revenue Pipeline',
      value: '$1.2M',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'contact',
      title: 'New contact added',
      description: 'Sarah Johnson from TechCorp',
      time: '2 hours ago',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      type: 'opportunity',
      title: 'Deal moved to negotiation',
      description: 'Enterprise Software License - $50k',
      time: '4 hours ago',
      icon: Target,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 3,
      type: 'task',
      title: 'Follow-up call completed',
      description: 'Called ProSoft Ltd regarding proposal',
      time: '1 day ago',
      icon: CheckSquare,
      color: 'from-orange-500 to-amber-500',
    },
    {
      id: 4,
      type: 'opportunity',
      title: 'New opportunity created',
      description: 'Cloud Migration Services - $120k',
      time: '2 days ago',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const pipelineStages = [
    { stage: 'Prospecting', count: 45, amount: '$230k', color: 'from-slate-400 to-slate-500', progress: 20 },
    { stage: 'Qualification', count: 32, amount: '$180k', color: 'from-blue-400 to-blue-500', progress: 35 },
    { stage: 'Proposal', count: 18, amount: '$290k', color: 'from-yellow-400 to-orange-500', progress: 60 },
    { stage: 'Negotiation', count: 12, amount: '$340k', color: 'from-emerald-400 to-emerald-500', progress: 80 },
    { stage: 'Closed Won', count: 8, amount: '$160k', color: 'from-green-400 to-green-500', progress: 100 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden glass-effect rounded-3xl p-8 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Welcome back, GDP Admin! 👋</h1>
            <p className="text-slate-600 text-lg">Here's what's happening with your business today</p>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center animate-float">
                <Zap size={40} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 animate-pulse">
                <Sparkles size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="metric-card group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`text-sm font-bold ${
                    stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                  <ArrowUpRight size={16} className={stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-500 rotate-90'} />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-2">vs last month</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pipeline Overview */}
        <div className="glass-effect rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Sales Pipeline</h3>
              <p className="text-slate-600">Track your deals through each stage</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="space-y-6">
            {pipelineStages.map((stage, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${stage.color}`}></div>
                    <span className="font-semibold text-slate-900">{stage.stage}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">{stage.amount}</div>
                    <div className="text-sm text-slate-500">{stage.count} deals</div>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stage.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${stage.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="glass-effect rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Recent Activities</h3>
              <p className="text-slate-600">Stay updated with latest actions</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
              <Clock size={24} className="text-emerald-600" />
            </div>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50/50 transition-colors group">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${activity.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{activity.title}</p>
                    <p className="text-slate-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-slate-500 mt-2 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-effect rounded-2xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary flex items-center justify-center space-x-3 py-4">
            <Users size={20} />
            <span>Add New Contact</span>
          </button>
          <button className="btn-primary flex items-center justify-center space-x-3 py-4">
            <Target size={20} />
            <span>Create Opportunity</span>
          </button>
          <button className="btn-primary flex items-center justify-center space-x-3 py-4">
            <CheckSquare size={20} />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;