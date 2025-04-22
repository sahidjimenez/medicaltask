import React from 'react';
import { useAppointments } from '../../context/AppointmentsContext';
import { specialties } from '../../data/mockData';
import { Availability } from '../../types';

const FilterSection: React.FC = () => {
  const { 
    filterSpecialty, 
    setFilterSpecialty,
    filterAvailability,
    setFilterAvailability
  } = useAppointments();

  const availabilityOptions: { value: Availability; label: string }[] = [
    { value: 'all', label: 'All Doctors' },
    { value: 'available', label: 'Available' },
    { value: 'busy', label: 'Fully Booked' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Doctors</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Specialty
          </label>
          <select
            id="specialty-filter"
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value as any)}
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by specialty"
          >
            <option value="All">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="availability-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            id="availability-filter"
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value as Availability)}
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Filter by availability"
          >
            {availabilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {['All', ...specialties].map((specialty) => (
            <button
              key={specialty}
              onClick={() => setFilterSpecialty(specialty as any)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filterSpecialty === specialty
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={filterSpecialty === specialty}
              aria-label={`Filter by ${specialty}`}
            >
              {specialty}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {availabilityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterAvailability(option.value)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filterAvailability === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-pressed={filterAvailability === option.value}
              aria-label={`Filter by ${option.label}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;