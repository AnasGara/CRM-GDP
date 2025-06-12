import React, { useState } from 'react';
import { Plus, Calendar, Clock, User, AlertCircle, CheckCircle2, Circle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignee: string;
  relatedTo: string;
  type: 'call' | 'email' | 'meeting' | 'follow-up' | 'other';
}

interface TasksProps {
  searchTerm: string;
}

const Tasks: React.FC<TasksProps> = ({ searchTerm }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Follow-up call with Sarah Johnson',
      description: 'Discuss the enterprise software license renewal terms',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-16',
      assignee: 'John Doe',
      relatedTo: 'TechCorp Solutions',
      type: 'call',
    },
    {
      id: 2,
      title: 'Send proposal to Innovate.io',
      description: 'Cloud migration services proposal with detailed timeline',
      priority: 'urgent',
      status: 'in-progress',
      dueDate: '2024-01-17',
      assignee: 'Jane Smith',
      relatedTo: 'Innovate.io',
      type: 'email',
    },
    {
      id: 3,
      title: 'Schedule demo meeting',
      description: 'Product demonstration for Digital Future Inc',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-01-15',
      assignee: 'Mike Johnson',
      relatedTo: 'Digital Future Inc',
      type: 'meeting',
    },
    {
      id: 4,
      title: 'Contract review reminder',
      description: 'Review and update contract terms for StartupX deal',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-01-18',
      assignee: 'Sarah Wilson',
      relatedTo: 'StartupX',
      type: 'other',
    },
    {
      id: 5,
      title: 'Quarterly business review prep',
      description: 'Prepare presentation materials for QBR with key accounts',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-01-22',
      assignee: 'John Doe',
      relatedTo: 'Multiple Accounts',
      type: 'other',
    },
  ]);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.relatedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={20} className="text-green-600" />;
      case 'in-progress':
        return <Clock size={20} className="text-blue-600" />;
      case 'pending':
        return <Circle size={20} className="text-gray-400" />;
      default:
        return <Circle size={20} className="text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return '📞';
      case 'email':
        return '📧';
      case 'meeting':
        return '👥';
      case 'follow-up':
        return '🔄';
      default:
        return '📋';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const pendingTasks = filteredTasks.filter(task => task.status !== 'completed');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Tasks & Reminders</h3>
          <p className="text-sm text-gray-600">Manage your tasks and stay on top of important activities</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{filteredTasks.length}</p>
            </div>
            <Circle size={24} className="text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-blue-600">{pendingTasks.length}</p>
            </div>
            <Clock size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
            </div>
            <CheckCircle2 size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">
                {filteredTasks.filter(task => isOverdue(task.dueDate) && task.status !== 'completed').length}
              </p>
            </div>
            <AlertCircle size={24} className="text-red-600" />
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className={`bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow ${
            isOverdue(task.dueDate) && task.status !== 'completed' ? 'border-l-4 border-l-red-500' : 'border-gray-200'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="mt-1">
                  {getStatusIcon(task.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg">{getTypeIcon(task.type)}</span>
                    <h4 className="font-semibold text-gray-900">{task.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span className={isOverdue(task.dueDate) && task.status !== 'completed' ? 'text-red-600 font-medium' : ''}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Related to: {task.relatedTo}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {task.status === 'pending' && (
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Start
                  </button>
                )}
                {task.status === 'in-progress' && (
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Complete
                  </button>
                )}
                <button className="text-gray-400 hover:text-gray-600 text-sm">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle2 size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600">Try adjusting your search terms or add a new task.</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;