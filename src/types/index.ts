export type Specialty = 
  | 'Cardiology'
  | 'Dermatology'
  | 'Family Medicine'
  | 'Neurology'
  | 'Orthopedics'
  | 'Pediatrics'
  | 'Psychiatry';

export type Doctor = {
  id: number;
  name: string;
  specialty: Specialty;
  location: string;
  rating: number;
  availableDays: string[];
  image: string;
  isFullyBooked?: boolean;
};

export type TimeSlot = {
  id: number;
  time: string;
  available: boolean;
};

export type Appointment = {
  id: number;
  doctorId: number;
  date: string;
  time: string;
  confirmed: boolean;
};

export type Availability = 'all' | 'available' | 'busy';