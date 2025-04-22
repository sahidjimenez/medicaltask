import React from 'react';
import DoctorCard from './DoctorCard';
import FilterSection from './FilterSection';
import { useAppointments } from '../../context/AppointmentsContext';

const DoctorDirectory: React.FC = () => {
  const { filteredDoctors } = useAppointments();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Find a Doctor</h1>
        <p className="mt-2 text-gray-600">Schedule an appointment with our specialists</p>
      </div>
      
      <FilterSection />
      
      {filteredDoctors.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
          <p className="text-lg text-gray-600">No doctors match your current filters.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDirectory;