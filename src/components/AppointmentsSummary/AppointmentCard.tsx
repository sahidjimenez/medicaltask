import React, { useState } from 'react';
import { Appointment } from '../../types';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react';
import { doctors } from '../../data/mockData';
import { useAppointments } from '../../context/AppointmentsContext';
import CancelModal from './CancelModal';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const { deleteAppointment } = useAppointments();
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  const doctor = doctors.find(d => d.id === appointment.doctorId);
  
  if (!doctor) return null;
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-blue-600 text-sm">{doctor.specialty}</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-gray-500" />
              <span>{formatDate(appointment.date)}</span>
            </div>
            
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-gray-500" />
              <span>{appointment.time}</span>
            </div>
            
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-gray-500" />
              <span>{doctor.location}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Confirmed
            </span>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowCancelModal(true)}
                className="flex items-center text-sm text-red-600 hover:text-red-800 focus:outline-none focus:underline"
                aria-label={`Cancel appointment with ${doctor.name}`}
              >
                <Trash2 size={16} className="mr-1" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => deleteAppointment(appointment.id)}
        doctor={doctor}
        appointmentDate={appointment.date}
        appointmentTime={appointment.time}
      />
    </>
  );
};

export default AppointmentCard;