import React, { useState } from 'react';
import { MapPin, Calendar, Users, Wallet, Sparkles, X } from 'lucide-react';
import { TripFormData, TravelType, BudgetLevel } from '../types';

interface Props {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
  onReset: () => void;
}

const INTEREST_OPTIONS = [
  "Adventure", "History", "Foodie", "Nightlife", 
  "Shopping", "Nature", "Art & Culture", "Relaxation"
];

export const TripForm = ({ onSubmit, isLoading, onReset }: Props) => {
  const [formData, setFormData] = useState<TripFormData>({
    destination: '',
    days: 3,
    budget: 'Medium',
    type: 'Solo',
    startDate: new Date().toISOString().split('T')[0],
    interests: []
  });

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination) return;
    onSubmit(formData);
  };

  return (
    <div className="glass-card p-6 md:p-8 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Plan Your Journey</h2>
        <button 
          onClick={() => {
            setFormData({
              destination: '',
              days: 3,
              budget: 'Medium',
              type: 'Solo',
              startDate: new Date().toISOString().split('T')[0],
              interests: []
            });
            onReset();
          }}
          className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
        >
          <X size={14} /> Reset
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <MapPin size={16} className="text-primary-500" /> Destination
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Paris, Tokyo, Bali"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            value={formData.destination}
            onChange={e => setFormData(p => ({ ...p, destination: e.target.value }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Days */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Calendar size={16} className="text-primary-500" /> Duration (Days)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.days}
              onChange={e => setFormData(p => ({ ...p, days: parseInt(e.target.value) || 1 }))}
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Calendar size={16} className="text-primary-500" /> Start Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
              value={formData.startDate}
              onChange={e => setFormData(p => ({ ...p, startDate: e.target.value }))}
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Wallet size={16} className="text-primary-500" /> Budget
          </label>
          <div className="flex gap-2">
            {(['Low', 'Medium', 'High'] as BudgetLevel[]).map(b => (
              <button
                key={b}
                type="button"
                onClick={() => setFormData(p => ({ ...p, budget: b }))}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  formData.budget === b 
                    ? 'bg-primary-500 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Travel Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Users size={16} className="text-primary-500" /> Travel Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['Solo', 'Couple', 'Family', 'Friends'] as TravelType[]).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setFormData(p => ({ ...p, type: t }))}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${
                  formData.type === t 
                    ? 'bg-primary-500 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  formData.interests.includes(interest)
                    ? 'bg-primary-100 text-primary-700 border-primary-300 border shadow-sm'
                    : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <><Sparkles size={20} /> Generate Itinerary</>
          )}
        </button>
      </form>
    </div>
  );
};
