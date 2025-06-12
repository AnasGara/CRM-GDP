import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, User, MapPin, Video, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

interface Appointment {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  type: 'meeting' | 'call' | 'video' | 'other';
  attendees: string[];
  location?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  relatedTo: string;
}

interface CalendarProps {
  searchTerm: string;
}

const Calendar: React.FC<CalendarProps> = ({ searchTerm }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      title: 'Product Demo with TechCorp',
      description: 'Demonstrate our enterprise software solution',
      date: '2024-01-16',
      time: '10:00',
      duration: 60,
      type: 'video',
      attendees: ['Sarah Johnson', 'Mike Wilson'],
      location: 'Zoom Meeting',
      status: 'confirmed',
      relatedTo: 'TechCorp Solutions',
    },
    {
      id: 2,
      title: 'Contract Negotiation Call',
      description: 'Discuss terms and pricing for cloud migration project',
      date: '2024-01-17',
      time: '14:30',
      duration: 45,
      type: 'call',
      attendees: ['Michael Chen'],
      status: 'scheduled',
      relatedTo: 'Innovate.io',
    },
    {
      id: 3,
      title: 'Quarterly Business Review',
      description: 'Review performance and discuss future opportunities',
      date: '2024-01-18',
      time: '09:00',
      duration: 120,
      type: 'meeting',
      attendees: ['Emily Rodriguez', 'John Smith', 'Lisa Brown'],
      location: 'Conference Room A',
      status: 'confirmed',
      relatedTo: 'Digital Future Inc',
    },
    {
      id: 4,
      title: 'Follow-up Meeting',
      description: 'Follow up on proposal and next steps',
      date: '2024-01-19',
      time: '11:00',
      duration: 30,
      type: 'video',
      attendees: ['David Kim'],
      location: 'Google Meet',
      status: 'scheduled',
      relatedTo: 'StartupX',
    },
  ]);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.relatedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video size={16} className="text-blue-600" />;
      case 'call':
        return <Phone size={16} className="text-green-600" />;
      case 'meeting':
        return <User size={16} className="text-purple-600" />;
      default:
        return <CalendarIcon size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayAppointments = filteredAppointments.filter(apt => apt.date === dateStr);
      const isToday = today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
      
      days.push(
        <div key={day} className={`h-24 border border-gray-200 p-1 ${isToday ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50 transition-colors`}>
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayAppointments.slice(0, 2).map(apt => (
              <div key={apt.id} className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded truncate">
                {apt.time} {apt.title}
              </div>
            ))}
            {dayAppointments.length > 2 && (
              <div className="text-xs text-gray-500">+{dayAppointments.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Calendar & Appointments</h3>
          <p className="text-sm text-gray-600">Schedule and manage your appointments</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                view === 'month' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                view === 'week' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('day')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                view === 'day' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus size={20} />
            <span>Schedule Appointment</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                Today
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-0 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-0">
                {renderCalendarGrid()}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-4">Upcoming Appointments</h4>
            <div className="space-y-4">
              {filteredAppointments
                .filter(apt => new Date(apt.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map(appointment => (
                  <div key={appointment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getTypeIcon(appointment.type)}
                          <h5 className="font-medium text-gray-900 text-sm">{appointment.title}</h5>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{appointment.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon size={12} />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-4">This Week</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Appointments</span>
                <span className="font-semibold text-gray-900">{filteredAppointments.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Confirmed</span>
                <span className="font-semibold text-green-600">
                  {filteredAppointments.filter(apt => apt.status === 'confirmed').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-semibold text-blue-600">
                  {filteredAppointments.filter(apt => apt.status === 'scheduled').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;