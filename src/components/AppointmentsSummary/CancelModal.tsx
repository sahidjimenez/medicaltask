import React from 'react';
import { X } from 'lucide-react';
import { Doctor } from '../../types';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  doctor: Doctor;
  appointmentDate: string;
  appointmentTime: string;
}

const CancelModal: React.FC<CancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  doctor,
  appointmentDate,
  appointmentTime,
}) => {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div
        role="dialog"
        aria-labelledby="cancel-modal-title"
        aria-modal="true"
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fadeIn"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="cancel-modal-title" className="text-xl font-semibold text-gray-800">
            Cancel Appointment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-blue-600">{doctor.specialty}</p>
              <p className="text-sm text-gray-600">{doctor.location}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              Are you sure you want to cancel your appointment on{' '}
              <span className="font-semibold">{formatDate(appointmentDate)}</span> at{' '}
              <span className="font-semibold">{appointmentTime}</span>?
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Keep Appointment
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;