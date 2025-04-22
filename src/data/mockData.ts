import { Doctor, TimeSlot, Specialty } from '../types';

export const specialties: Specialty[] = [
  'Cardiology',
  'Dermatology',
  'Family Medicine',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry'
];

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    location: 'Medical Center, Building A',
    rating: 4.9,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    location: 'Wellness Clinic, Suite 204',
    rating: 4.7,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Family Medicine',
    location: 'Community Health Center',
    rating: 4.8,
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    location: 'Neuroscience Institute, Floor 3',
    rating: 4.9,
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 5,
    name: 'Dr. Olivia Martinez',
    specialty: 'Pediatrics',
    location: 'Children\'s Medical Plaza',
    rating: 4.9,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    image: 'https://images.pexels.com/photos/5214961/pexels-photo-5214961.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 6,
    name: 'Dr. David Park',
    specialty: 'Orthopedics',
    location: 'Sports Medicine Center',
    rating: 4.6,
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 7,
    name: 'Dr. Sophia Lee',
    specialty: 'Psychiatry',
    location: 'Behavioral Health Building',
    rating: 4.8,
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 8,
    name: 'Dr. Robert Garcia',
    specialty: 'Cardiology',
    location: 'Heart Institute, Wing B',
    rating: 4.7,
    availableDays: ['Wednesday', 'Friday', 'Saturday'],
    image: 'https://images.pexels.com/photos/5329042/pexels-photo-5329042.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 9,
    name: 'Dr. Amanda Taylor',
    specialty: 'Neurology',
    location: 'Brain & Spine Center',
    rating: 4.9,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    image: 'https://images.pexels.com/photos/5407237/pexels-photo-5407237.jpeg?auto=compress&cs=tinysrgb&w=600',
    isFullyBooked: true
  }
];

export const generateTimeSlots = (doctorId: number): TimeSlot[] => {
  // If doctor is fully booked, return all slots as unavailable
  const doctor = doctors.find(d => d.id === doctorId);
  if (doctor?.isFullyBooked) {
    return Array.from({ length: 17 }, (_, i) => ({
      id: i + 1,
      time: `${Math.floor(i/2) + 9}:${i % 2 === 0 ? '00' : '30'}`,
      available: false
    }));
  }

  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 17;
  
  for (let i = startHour; i <= endHour; i++) {
    slots.push({
      id: (i - startHour) * 2 + 1,
      time: `${i}:00`,
      available: Math.random() > 0.3
    });
    
    if (i < endHour) {
      slots.push({
        id: (i - startHour) * 2 + 2,
        time: `${i}:30`,
        available: Math.random() > 0.3
      });
    }
  }
  
  return slots;
};