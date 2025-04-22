import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor, Appointment, Specialty, Availability } from '../types';
import { doctors, specialties } from '../data/mockData';

interface AppointmentsContextType {
  appointments: Appointment[];
  selectedDoctor: Doctor | null;
  filteredDoctors: Doctor[];
  filterSpecialty: Specialty | 'All';
  filterAvailability: Availability;
  selectedDate: string;
  bookedDates: Map<number, Set<string>>;
  
  setSelectedDoctor: (doctor: Doctor | null) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  deleteAppointment: (id: number) => void;
  setFilterSpecialty: (specialty: Specialty | 'All') => void;
  setFilterAvailability: (availability: Availability) => void;
  setSelectedDate: (date: string) => void;
  isDateBooked: (doctorId: number, date: string) => boolean;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [filterSpecialty, setFilterSpecialty] = useState<Specialty | 'All'>('All');
  const [filterAvailability, setFilterAvailability] = useState<Availability>('all');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bookedDates, setBookedDates] = useState<Map<number, Set<string>>>(new Map());

  const filteredDoctors = doctors
    .filter(doctor => filterSpecialty === 'All' || doctor.specialty === filterSpecialty)
    .filter(doctor => {
      if (filterAvailability === 'all') return true;
      return filterAvailability === 'busy' ? doctor.isFullyBooked : !doctor.isFullyBooked;
    });

  const isDateBooked = (doctorId: number, date: string) => {
    return bookedDates.get(doctorId)?.has(date) || false;
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(),
      confirmed: true
    };

    // Update booked dates
    const doctorBookedDates = bookedDates.get(appointment.doctorId) || new Set();
    doctorBookedDates.add(appointment.date);
    setBookedDates(new Map(bookedDates.set(appointment.doctorId, doctorBookedDates)));

    setAppointments(prev => [...prev, newAppointment]);
    setSelectedDoctor(null);
  };

  const deleteAppointment = (id: number) => {
    const appointment = appointments.find(app => app.id === id);
    if (appointment) {
      // Remove the date from booked dates
      const doctorBookedDates = bookedDates.get(appointment.doctorId);
      if (doctorBookedDates) {
        doctorBookedDates.delete(appointment.date);
        setBookedDates(new Map(bookedDates));
      }
      
      setAppointments(prev => prev.filter(app => app.id !== id));
    }
  };

  const value = {
    appointments,
    selectedDoctor,
    filteredDoctors,
    filterSpecialty,
    filterAvailability,
    selectedDate,
    bookedDates,
    
    setSelectedDoctor,
    addAppointment,
    deleteAppointment,
    setFilterSpecialty,
    setFilterAvailability,
    setSelectedDate,
    isDateBooked
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
};