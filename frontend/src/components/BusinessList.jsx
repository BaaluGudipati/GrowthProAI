import React from 'react';
import { 
  Building2,
  ChevronRight,
  Calendar,
  BarChart3
} from 'lucide-react';

export default function BusinessList({ businesses, onSelectBusiness }) {
  if (businesses.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Your Business Analytics</h3>
        <div className="flex items-center text-gray-600">
          <BarChart3 className="w-5 h-5 mr-2" />
          <span>{businesses.length} businesses analyzed</span>
        </div>
      </div>

      <div className="space-y-4">
        {businesses.map((business) => (
          <div
            key={business.id}
            onClick={() => onSelectBusiness(business)}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{business.name}</h4>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-gray-500 mr-1">📍</span>
                  <span>{business.location}</span>
                  <span className="mx-2">•</span>
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{business.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                {new Date(business.createdAt).toLocaleDateString()}
              </span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}