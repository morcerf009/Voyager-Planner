import React from 'react';
import { Bed, Car, Ticket, ExternalLink } from 'lucide-react';
import { BudgetLevel, BookingSuggestion } from '../types';

interface Props {
  budget: BudgetLevel;
}

export const BookingSuggestions = ({ budget }: Props) => {
  const getSuggestions = (level: BudgetLevel): BookingSuggestion[] => {
    switch (level) {
      case 'Low':
        return [
          { category: 'Stay', suggestion: 'Hostels or Budget Airbnbs nearby public transit', icon: 'Bed' },
          { category: 'Transit', suggestion: 'Public Metro, Buses, and Bike Rentals', icon: 'Car' },
          { category: 'Experiences', suggestion: 'Free walking tours and local parks', icon: 'Ticket' },
        ];
      case 'Medium':
        return [
          { category: 'Stay', suggestion: '3-star modern hotels or central boutique apartments', icon: 'Bed' },
          { category: 'Transit', suggestion: 'Ride-sharing and occasional car rentals', icon: 'Car' },
          { category: 'Experiences', suggestion: 'Guided small-group tours and entry-pass bundles', icon: 'Ticket' },
        ];
      case 'High':
        return [
          { category: 'Stay', suggestion: '5-star luxury resorts or high-end penthouse suites', icon: 'Bed' },
          { category: 'Transit', suggestion: 'Private chauffeurs and premium car rentals', icon: 'Car' },
          { category: 'Experiences', suggestion: 'Private VIP tours and exclusive club access', icon: 'Ticket' },
        ];
      default:
        return [];
    }
  };

  const suggestions = getSuggestions(budget);

  const IconMap: { [key: string]: any } = {
    Bed: Bed,
    Car: Car,
    Ticket: Ticket,
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <ExternalLink size={18} className="text-primary-500" /> Booking Guide ({budget})
      </h3>
      
      <div className="space-y-4">
        {suggestions.map((s, idx) => {
          const Icon = IconMap[s.icon];
          return (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary-200 transition-all group">
              <div className="p-2 bg-white rounded-lg shadow-sm text-primary-500 group-hover:scale-110 transition-transform">
                <Icon size={18} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">{s.category}</span>
                <p className="text-sm font-medium text-slate-700 leading-tight">{s.suggestion}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-100">
        <div className="bg-primary-50 p-4 rounded-xl">
          <p className="text-xs text-primary-700 leading-relaxed italic">
            "Pro tip: Book at least 4 weeks in advance to save up to 20% on {budget.toLowerCase()} budget stays."
          </p>
        </div>
      </div>
    </div>
  );
};
