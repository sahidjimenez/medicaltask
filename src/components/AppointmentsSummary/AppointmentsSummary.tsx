import React from 'react';
import { useAppointments } from '../../context/AppointmentsContext';
import AppointmentCard from './AppointmentCard';
import { Calendar } from 'lucide-react';

const AppointmentsSummary: React.FC = () => {
  const { appointments } = useAppointments();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Appointments</h1>
        <p className="mt-2 text-gray-600">Manage your upcoming medical visits</p>
      </div>
      
      {appointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <Calendar size={48} className="text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Appointments Scheduled</h2>
          <p className="text-gray-600 mb-6">
            You haven't scheduled any appointments yet. Browse our doctors and book your first appointment.
          </p>
          <button
            onClick={() => window.location.hash = '#doctors'}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Find a Doctor
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsSummary;