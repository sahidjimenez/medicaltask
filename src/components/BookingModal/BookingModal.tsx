import React, { useState, useEffect } from 'react';
import { useAppointments } from '../../context/AppointmentsContext';
import TimeSelector from './TimeSelector';
import { TimeSlot } from '../../types';
import { X, Calendar } from 'lucide-react';
import { generateTimeSlots } from '../../data/mockData';

const BookingModal: React.FC = () => {
  const { 
    selectedDoctor, 
    setSelectedDoctor, 
    addAppointment, 
    selectedDate, 
    setSelectedDate,
    isDateBooked 
  } = useAppointments();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedDoctor) {
      setTimeSlots(generateTimeSlots(selectedDoctor.id));
      setSelectedTime(null);
    }
  }, [selectedDoctor, selectedDate]);

  if (!selectedDoctor) return null;

  const handleClose = () => {
    setSelectedDoctor(null);
    setSelectedTime(null);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime || !selectedDoctor) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      addAppointment({
        doctorId: selectedDoctor.id,
        date: selectedDate,
        time: selectedTime,
      });
      setIsSubmitting(false);
      handleClose();
    }, 600);
  };

  const today = new Date().toISOString().split('T')[0];
  const isDateUnavailable = selectedDoctor && isDateBooked(selectedDoctor.id, selectedDate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div
        role="dialog"
        aria-labelledby="booking-modal-title"
        aria-modal="true"
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fadeIn"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="booking-modal-title" className="text-xl font-semibold text-gray-800">
            Book Appointment
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{selectedDoctor.name}</h3>
              <p className="text-blue-600">{selectedDoctor.specialty}</p>
              <p className="text-sm text-gray-600">{selectedDoctor.location}</p>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="appointment-date"
                value={selectedDate}
                onChange={handleDateChange}
                min={today}
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  isDateUnavailable 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            {isDateUnavailable && (
              <p className="mt-1 text-sm text-red-600">
                This date is already booked. Please select another date.
              </p>
            )}
          </div>

          {!isDateUnavailable && (
            <TimeSelector
              timeSlots={timeSlots}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={!selectedTime || isSubmitting || isDateUnavailable}
              className={`w-full py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                selectedTime && !isSubmitting && !isDateUnavailable
                  ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal