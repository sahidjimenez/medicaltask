import React from 'react';
import { TimeSlot } from '../../types';

interface TimeSelectorProps {
  timeSlots: TimeSlot[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ timeSlots, selectedTime, onSelectTime }) => {
  return (
    <div className="mt-4">
      <h3 className="text-base font-medium text-gray-800 mb-2">Select a Time</h3>
      
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => slot.available && onSelectTime(slot.time)}
            disabled={!slot.available}
            className={`px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              selectedTime === slot.time
                ? 'bg-blue-600 text-white'
                : slot.available
                ? 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            aria-label={`Select time ${slot.time}${!slot.available ? ' (not available)' : ''}`}
            aria-pressed={selectedTime === slot.time}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;