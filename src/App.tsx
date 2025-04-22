import React, { useState, useEffect } from 'react';
import { AppointmentsProvider } from './context/AppointmentsContext';
import Header from './components/Layout/Header';
import DoctorDirectory from './components/DoctorDirectory/DoctorDirectory';
import AppointmentsSummary from './components/AppointmentsSummary/AppointmentsSummary';
import BookingModal from './components/BookingModal/BookingModal';

function App() {
  const [activeTab, setActiveTab] = useState('doctors');

  // Check for hash in URL to set initial active tab
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'appointments') {
      setActiveTab('appointments');
    }
  }, []);

  // Update hash when tab changes
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  return (
    <AppointmentsProvider>
      <div className="min-h-screen bg-gray-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'doctors' ? (
            <DoctorDirectory />
          ) : (
            <AppointmentsSummary />
          )}
        </main>
        
        <BookingModal />

        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} MedBook. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </AppointmentsProvider>
  );
}

export default App;