import React from 'react';
import { Doctor } from '../../types';
import { Star, Calendar } from 'lucide-react';
import { useAppointments } from '../../context/AppointmentsContext';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { setSelectedDoctor } = useAppointments();
  
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 focus-within:ring-blue-500">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={doctor.image} 
          alt={`Dr. ${doctor.name}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center gap-1">
            {renderRatingStars(doctor.rating)}
            <span className="text-white ml-1 text-sm">{doctor.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
        <p className="text-blue-600 font-medium">{doctor.specialty}</p>
        
        <div className="mt-2 text-sm text-gray-600">
          <p>{doctor.location}</p>
          <div className="mt-2">
            <p className="font-medium text-gray-700">Available on:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {doctor.availableDays.map(day => (
                <span 
                  key={day} 
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {doctor.isFullyBooked && (
          <div className="mt-2 flex items-center justify-center">
            <Calendar className="text-red-500 mr-1" size={16} />
            <span className="text-red-500 text-sm font-medium">No available slots</span>
          </div>
        )}
        
        <button
          onClick={() => !doctor.isFullyBooked && setSelectedDoctor(doctor)}
          disabled={doctor.isFullyBooked}
          className={`mt-4 w-full py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            doctor.isFullyBooked
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed focus:ring-gray-400'
              : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
          }`}
          aria-label={`Book appointment with ${doctor.name}${doctor.isFullyBooked ? ' (Fully Booked)' : ''}`}
        >
          {doctor.isFullyBooked ? 'Fully Booked' : 'Book Appointment'}
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;