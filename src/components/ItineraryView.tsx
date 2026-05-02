import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Sun, Moon, Calendar, Copy, Check } from 'lucide-react';
import { Itinerary } from '../types';

interface Props {
  itinerary: Itinerary | null;
}

export const ItineraryView = ({ itinerary }: Props) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    if (!itinerary) return;
    navigator.clipboard.writeText(JSON.stringify(itinerary, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!itinerary) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Calendar size={64} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">No active itinerary</p>
        <p className="text-sm">Fill out the form to generate your AI journey</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{itinerary.tripTitle}</h1>
          <div className="h-1 w-20 bg-primary-500 rounded-full"></div>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy Plan'}
        </button>
      </div>

      <div className="grid gap-8">
        {itinerary.days.map((day, idx) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card overflow-hidden"
          >
            <div className="bg-primary-500 px-6 py-3 text-white flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <span className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  {day.day}
                </span>
                Day {day.day}
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Morning */}
              <div className="flex gap-4">
                <div className="mt-1 p-2 bg-amber-50 text-amber-500 rounded-lg h-fit">
                  <Coffee size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Morning</h4>
                  <p className="text-slate-600 leading-relaxed">{day.morning}</p>
                </div>
              </div>

              <div className="h-px bg-slate-100 ml-12"></div>

              {/* Afternoon */}
              <div className="flex gap-4">
                <div className="mt-1 p-2 bg-blue-50 text-blue-500 rounded-lg h-fit">
                  <Sun size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Afternoon</h4>
                  <p className="text-slate-600 leading-relaxed">{day.afternoon}</p>
                </div>
              </div>

              <div className="h-px bg-slate-100 ml-12"></div>

              {/* Evening */}
              <div className="flex gap-4">
                <div className="mt-1 p-2 bg-indigo-50 text-indigo-500 rounded-lg h-fit">
                  <Moon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Evening</h4>
                  <p className="text-slate-600 leading-relaxed">{day.evening}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
