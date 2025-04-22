import React, { useState, useEffect } from 'react';
import { useAppointments } from '../../context/AppointmentsContext';
import { Calendar, Users, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { appointments } = useAppointments();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    window.location.hash = tab;
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-blue-600 mr-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-8 h-8"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">MedBook</h1>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => handleTabChange('doctors')}
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                activeTab === 'doctors'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              aria-current={activeTab === 'doctors' ? 'page' : undefined}
            >
              <Users className="mr-2" size={18} />
              <span>Find Doctors</span>
            </button>
            
            <button
              onClick={() => handleTabChange('appointments')}
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                activeTab === 'appointments'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              aria-current={activeTab === 'appointments' ? 'page' : undefined}
            >
              <Calendar className="mr-2" size={18} />
              <span>My Appointments</span>
              {appointments.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                  {appointments.length}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => handleTabChange('doctors')}
              className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                activeTab === 'doctors'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600'
              }`}
            >
              <Users className="mr-2" size={18} />
              <span>Find Doctors</span>
            </button>
            
            <button
              onClick={() => handleTabChange('appointments')}
              className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                activeTab === 'appointments'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600'
              }`}
            >
              <Calendar className="mr-2" size={18} />
              <span>My Appointments</span>
              {appointments.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                  {appointments.length}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;