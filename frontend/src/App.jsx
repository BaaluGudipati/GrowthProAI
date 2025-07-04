import React from 'react';
import { BusinessProvider } from './components/providers/BusinessProvider';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <BusinessProvider>
      <Dashboard />
    </BusinessProvider>
  );
}