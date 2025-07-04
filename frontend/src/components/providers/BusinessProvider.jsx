import React, { createContext, useContext, useReducer } from 'react';

const BusinessContext = createContext();

const initialState = {
  businesses: [],
  currentBusiness: null,
  loading: false,
  error: null
};

function businessReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_BUSINESS':
      return {
        ...state,
        businesses: [...state.businesses, action.payload],
        currentBusiness: action.payload,
        loading: false,
        error: null
      };
    case 'UPDATE_HEADLINE':
      const updatedBusinesses = state.businesses.map(business =>
        business.id === action.payload.id
          ? { ...business, headline: action.payload.headline }
          : business
      );
      return {
        ...state,
        businesses: updatedBusinesses,
        currentBusiness: state.currentBusiness?.id === action.payload.id 
          ? { ...state.currentBusiness, headline: action.payload.headline }
          : state.currentBusiness
      };
    case 'SET_CURRENT_BUSINESS':
      return { ...state, currentBusiness: action.payload };
    default:
      return state;
  }
}

export function BusinessProvider({ children }) {
  const [state, dispatch] = useReducer(businessReducer, initialState);

  return (
    <BusinessContext.Provider value={{ state, dispatch }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}