import React, { useState } from 'react';
import { CheckCircle2, Circle, ClipboardList, Bell } from 'lucide-react';
import { Reminder, AppNotification } from '../types';

const INITIAL_REMINDERS = [
  { id: '1', task: 'Passport/CNIC Validity Check', completed: false },
  { id: '2', task: 'Flight Ticket Confirmation', completed: false },
  { id: '3', task: 'Hotel Booking Confirmation', completed: false },
  { id: '4', task: 'Packing Checklist (Weather appropriate)', completed: false },
  { id: '5', task: 'Airport Arrival (3h early for Int)', completed: false },
  { id: '6', task: 'Foreign Currency / Forex card', completed: false },
];

interface RemindersProps {
  notifications?: AppNotification[];
  onAddNotification?: (message: string, type: 'alert' | 'reminder' | 'update') => void;
}

export const Reminders: React.FC<RemindersProps> = ({ notifications = [], onAddNotification }) => {
  const [reminders, setReminders] = useState<Reminder[]>(INITIAL_REMINDERS);
  const [activeTab, setActiveTab] = useState<'checklist' | 'updates'>('checklist');

  const toggle = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const progress = Math.round((reminders.filter(r => r.completed).length / reminders.length) * 100);

  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4 border-b border-slate-100 pb-2">
        <button 
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 text-sm font-bold pb-2 border-b-2 transition-colors ${activeTab === 'checklist' ? 'border-primary-500 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          <ClipboardList size={16} /> Checklist
        </button>
        <button 
          onClick={() => setActiveTab('updates')}
          className={`flex items-center gap-2 text-sm font-bold pb-2 border-b-2 transition-colors ${activeTab === 'updates' ? 'border-primary-500 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          <Bell size={16} /> Updates
          {notifications.length > 0 && (
            <span className="bg-primary-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{notifications.length}</span>
          )}
        </button>
      </div>

      {activeTab === 'checklist' ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Progress</span>
            <span className="text-xs font-bold text-primary-600 bg-primary-100 px-2 py-1 rounded-md">{progress}%</span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
            <div 
              className="h-full bg-primary-500 transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar flex-1 max-h-[250px]">
            {reminders.map(r => (
              <button
                key={r.id}
                onClick={() => toggle(r.id)}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
              >
                {r.completed ? (
                  <CheckCircle2 size={18} className="text-primary-500 shrink-0" />
                ) : (
                  <Circle size={18} className="text-slate-300 group-hover:text-primary-400 shrink-0" />
                )}
                <span className={`text-sm font-medium ${r.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {r.task}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => onAddNotification?.('Reminder activated successfully!', 'reminder')}
            className="mt-4 w-full py-3 bg-primary-500 text-white rounded-xl font-bold text-sm hover:bg-primary-600 transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2"
          >
            <Bell size={18} /> Enable Reminders
          </button>
        </>
      ) : (
        <div className="space-y-3 overflow-y-auto pr-1 custom-scrollbar flex-1 max-h-[300px]">
          {notifications.length === 0 ? (
            <div className="text-center text-slate-400 text-sm py-10">
              No updates yet. Check back later!
            </div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-800">{n.message}</p>
                <span className="text-xs text-slate-400">{n.timestamp.toLocaleTimeString()}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
