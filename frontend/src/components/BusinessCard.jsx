import React, { useState } from 'react';
import { useBusiness } from './providers/BusinessProvider';
import { regenerateHeadline } from '../services/api';
import { 
  MapPin,
  Sparkles
} from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

export default function BusinessCard({ business }) {
  const { dispatch } = useBusiness();
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const { headline } = await regenerateHeadline(business.name, business.location);
      dispatch({
        type: 'UPDATE_HEADLINE',
        payload: {
          id: business.id,
          headline
        }
      });
    } catch (error) {
      console.error('Error regenerating headline:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transform hover:scale-105 transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{business.name}</h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{business.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end mb-1">
            <span className="text-yellow-400 text-2xl mr-1">★</span>
            <span className="text-2xl font-bold text-gray-800">{business.rating}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <span className="text-sm">{business.reviews} reviews</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm font-semibold text-purple-600">Finalized SEO Headline</span>
            </div>
            <p className="text-gray-800 font-medium text-lg leading-relaxed">
              {business.headline}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{business.metrics.visibility}%</div>
          <div className="text-sm text-green-700 font-medium">Visibility</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{business.metrics.engagement}%</div>
          <div className="text-sm text-blue-700 font-medium">Engagement</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{business.metrics.conversion}%</div>
          <div className="text-sm text-purple-700 font-medium">Conversion</div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex justify-center items-center"
        >
          {isRegenerating ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">Regenerating...</span>
            </>
          ) : (
            'Regenerate SEO Headline'
          )}
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-center mt-6">
        <div className="flex items-center justify-center text-gray-600">
          <span className="font-medium">Business Analysis Complete</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Added on {new Date(business.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}