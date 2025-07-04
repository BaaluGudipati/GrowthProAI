import React from 'react';
import { useBusiness } from './providers/BusinessProvider';
import BusinessForm from './BusinessForm';
import BusinessCard from './BusinessCard';
import BusinessList from './BusinessList';
import LoadingSpinner from './LoadingSpinner';
import { 
  Award,
  MessageSquare
} from 'lucide-react';

export default function Dashboard() {
  const { state, dispatch } = useBusiness();

  const handleSelectBusiness = (business) => {
    dispatch({ type: 'SET_CURRENT_BUSINESS', payload: business });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            GrowthPro<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock your business potential with AI-powered insights and analytics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <BusinessForm />
          </div>
          <div>
            {state.loading ? (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                <LoadingSpinner />
              </div>
            ) : state.currentBusiness ? (
              <BusinessCard business={state.currentBusiness} />
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Ready to analyze your business?
                </h3>
                <p className="text-gray-500">
                  Enter your business details to get started with AI-powered insights
                </p>
              </div>
            )}
          </div>
        </div>

        {state.businesses.length > 0 && (
          <BusinessList 
            businesses={state.businesses} 
            onSelectBusiness={handleSelectBusiness}
          />
        )}

        {state.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700">{state.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}