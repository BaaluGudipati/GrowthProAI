import React, { useState } from 'react';
import { useBusiness } from './providers/BusinessProvider';
import { getBusinessData, regenerateHeadline } from '../services/api';
import { 
  TrendingUp, 
  Sparkles,
  Building2
} from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

export default function BusinessForm() {
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [errors, setErrors] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const [selectedHeadline, setSelectedHeadline] = useState('');
  const [generatingPreview, setGeneratingPreview] = useState(false);
  const { state, dispatch } = useBusiness();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Business name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.name.trim().length < 2) newErrors.name = 'Business name must be at least 2 characters';
    if (formData.location.trim().length < 2) newErrors.location = 'Location must be at least 2 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generatePreview = async () => {
    if (!validateForm()) return;
    
    setGeneratingPreview(true);
    try {
      const businessData = await getBusinessData(formData.name, formData.location);
      
      // Generate additional headline options
      const headlinePromises = Array(3).fill().map(() => 
        regenerateHeadline(formData.name, formData.location)
      );
      
      const headlines = await Promise.all(headlinePromises);
      
      setPreviewData({
        ...businessData,
        headlineOptions: [businessData.headline, ...headlines.map(h => h.headline)]
      });
      setSelectedHeadline(businessData.headline);
    } catch (error) {
      setErrors({ general: error.message || 'Failed to generate preview' });
    } finally {
      setGeneratingPreview(false);
    }
  };

  const handleSubmit = () => {
    if (previewData && selectedHeadline) {
      dispatch({
        type: 'ADD_BUSINESS',
        payload: {
          ...previewData,
          headline: selectedHeadline
        }
      });
      // Reset form
      setFormData({ name: '', location: '' });
      setPreviewData(null);
      setSelectedHeadline('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Analyze Your Business
        </h2>
        <p className="text-gray-600">
          Get instant insights about your business performance
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
              errors.name 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            placeholder="Enter your business name"
            disabled={state.loading}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
              errors.location 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            placeholder="Enter your business location"
            disabled={state.loading}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        <button
          onClick={generatePreview}
          disabled={generatingPreview}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
        >
          {generatingPreview ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
              <span className="ml-2">Generating Preview...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Generate Business Preview
            </div>
          )}
        </button>
        
        {errors.general && (
          <p className="mt-1 text-sm text-red-600 text-center">{errors.general}</p>
        )}
      </div>

      {/* Preview Section */}
      {previewData && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview & Finalize</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Business Info</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{previewData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{previewData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    {previewData.rating}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-medium">{previewData.reviews}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Visibility:</span>
                  <span className="font-medium text-green-600">{previewData.metrics.visibility}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engagement:</span>
                  <span className="font-medium text-blue-600">{previewData.metrics.engagement}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion:</span>
                  <span className="font-medium text-purple-600">{previewData.metrics.conversion}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">Choose Your SEO Headline</h4>
            <div className="space-y-3">
              {previewData.headlineOptions.map((headline, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedHeadline(headline)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedHeadline === headline
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      selectedHeadline === headline
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedHeadline === headline && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <span className="text-gray-800 font-medium">{headline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedHeadline}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Finalize & Add to Dashboard
            </div>
          </button>
        </div>
      )}
    </div>
  );
}