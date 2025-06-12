import React, { useState } from 'react';
import { Plus, DollarSign, Calendar, User, Building, TrendingUp } from 'lucide-react';

interface Opportunity {
  id: number;
  title: string;
  company: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  closeDate: string;
  contact: string;
  description: string;
}

interface OpportunitiesProps {
  searchTerm: string;
}

const Opportunities: React.FC<OpportunitiesProps> = ({ searchTerm }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 1,
      title: 'Enterprise Software License',
      company: 'TechCorp Solutions',
      value: 50000,
      stage: 'negotiation',
      probability: 80,
      closeDate: '2024-02-15',
      contact: 'Sarah Johnson',
      description: 'Annual software license renewal with potential for expansion',
    },
    {
      id: 2,
      title: 'Cloud Migration Services',
      company: 'Innovate.io',
      value: 120000,
      stage: 'proposal',
      probability: 60,
      closeDate: '2024-02-28',
      contact: 'Michael Chen',
      description: 'Complete cloud infrastructure migration and optimization',
    },
    {
      id: 3,
      title: 'Digital Transformation Consulting',
      company: 'Digital Future Inc',
      value: 75000,
      stage: 'qualification',
      probability: 40,
      closeDate: '2024-03-10',
      contact: 'Emily Rodriguez',
      description: 'Strategic consulting for digital transformation initiative',
    },
    {
      id: 4,
      title: 'Custom Development Project',
      company: 'StartupX',
      value: 95000,
      stage: 'prospecting',
      probability: 25,
      closeDate: '2024-03-20',
      contact: 'David Kim',
      description: 'Custom application development with ongoing support',
    },
  ]);

  const stages = [
    { id: 'prospecting', name: 'Prospecting', color: 'bg-gray-100' },
    { id: 'qualification', name: 'Qualification', color: 'bg-blue-100' },
    { id: 'proposal', name: 'Proposal', color: 'bg-yellow-100' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100' },
    { id: 'closed-won', name: 'Closed Won', color: 'bg-green-100' },
    { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-100' },
  ];

  const filteredOpportunities = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return 'bg-gray-100 text-gray-800';
      case 'qualification':
        return 'bg-blue-100 text-blue-800';
      case 'proposal':
        return 'bg-yellow-100 text-yellow-800';
      case 'negotiation':
        return 'bg-orange-100 text-orange-800';
      case 'closed-won':
        return 'bg-green-100 text-green-800';
      case 'closed-lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-green-600';
    if (probability >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sales Pipeline</h3>
          <p className="text-sm text-gray-600">Track and manage your sales opportunities</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Opportunity</span>
        </button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stages.map((stage) => {
          const stageOpps = filteredOpportunities.filter(opp => opp.stage === stage.id);
          const stageValue = stageOpps.reduce((sum, opp) => sum + opp.value, 0);
          
          return (
            <div key={stage.id} className={`${stage.color} rounded-lg p-4`}>
              <h4 className="font-medium text-gray-900 text-sm mb-2">{stage.name}</h4>
              <p className="text-2xl font-bold text-gray-900">{stageOpps.length}</p>
              <p className="text-sm text-gray-600">${(stageValue / 1000).toFixed(0)}k</p>
            </div>
          );
        })}
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{opportunity.title}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building size={14} />
                  <span>{opportunity.company}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(opportunity.stage)}`}>
                {opportunity.stage.charAt(0).toUpperCase() + opportunity.stage.slice(1).replace('-', ' ')}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{opportunity.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign size={16} className="text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Value</p>
                  <p className="font-semibold">${opportunity.value.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp size={16} className={getProbabilityColor(opportunity.probability)} />
                <div>
                  <p className="text-sm text-gray-600">Probability</p>
                  <p className={`font-semibold ${getProbabilityColor(opportunity.probability)}`}>
                    {opportunity.probability}%
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Close Date</p>
                  <p className="font-semibold">{new Date(opportunity.closeDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <User size={16} className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-semibold">{opportunity.contact}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${opportunity.probability}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 ml-2">{opportunity.probability}%</span>
            </div>
          </div>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="text-center py-12">
          <DollarSign size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
          <p className="text-gray-600">Try adjusting your search terms or add a new opportunity.</p>
        </div>
      )}
    </div>
  );
};

export default Opportunities;