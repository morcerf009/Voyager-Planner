import React from 'react';
import { Plane, Compass, User, Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass-card px-6 py-4 flex items-center justify-between mx-4 my-2">
      <div className="flex items-center gap-2">
        <div className="bg-primary-500 p-2 rounded-lg text-white">
          <Plane size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">Voyager<span className="text-primary-500"> Planner</span></span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a href="#" className="hover:text-primary-600 transition-colors">Explorer</a>
        <a href="#" className="hover:text-primary-600 transition-colors">My Journeys</a>
        <a href="#" className="hover:text-primary-600 transition-colors">Community</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-slate-600">
          <Menu size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold border border-primary-200">
          <User size={18} />
        </div>
      </div>
    </nav>
  );
};
