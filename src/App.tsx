import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TripForm } from './components/TripForm';
import { ItineraryView } from './components/ItineraryView';
import { BookingSuggestions } from './components/BookingSuggestions';
import { Reminders } from './components/Reminders';
import { Toast } from './components/Toast';
import { generateItinerary } from './services/itineraryService';
import { TripFormData, Itinerary, AppNotification } from './types';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentBudget, setCurrentBudget] = useState<any>('Medium');
  
  // Notification State
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Load saved plan on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('tripPlan');
    if (savedPlan) {
      try {
        setItinerary(JSON.parse(savedPlan));
      } catch (e) {
        console.error('Failed to load saved plan', e);
      }
    }
  }, []);

  const addNotification = (message: string, type: 'alert' | 'reminder' | 'update') => {
    const newNotif: AppNotification = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleFormSubmit = async (data: TripFormData) => {
    setIsLoading(true);
    setError(null);
    setCurrentBudget(data.budget);
    
    try {
      const result = await generateItinerary(data);
      setItinerary(result);
      localStorage.setItem('tripPlan', JSON.stringify(result));
      
      // Simulate real-time updates after generation
      setTimeout(() => {
        addNotification(`Update: Flight prices to ${data.destination} have dropped!`, 'update');
      }, 3000);
      
      setTimeout(() => {
        addNotification(`Reminder: Check in to your hotel opens in 24 hours.`, 'reminder');
      }, 8000);

      setTimeout(() => {
        addNotification(`Booking Alert: Only 2 rooms left at recommended hotels in ${data.destination}.`, 'alert');
      }, 15000);

    } catch (err: any) {
      setError(err.message || 'An error occurred while generating your plan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setItinerary(null);
    setError(null);
    setNotifications([]);
    localStorage.removeItem('tripPlan');
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
        {notifications.slice(0, 3).map(notif => (
          <Toast key={notif.id} notification={notif} onClose={removeNotification} />
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Form */}
          <div className="lg:col-span-4 sticky top-24">
            <TripForm 
              onSubmit={handleFormSubmit} 
              isLoading={isLoading} 
              onReset={handleReset} 
            />
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 text-red-600">
                <AlertCircle className="shrink-0" size={20} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Main Content: Itinerary & Recommendations */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Conditional Rendering of Intro Header */}
            {!itinerary && !isLoading && (
              <div className="glass-card p-10 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="max-w-md mx-auto">
                  <h2 className="text-2xl font-bold text-slate-800">Your Smart Travel Planner</h2>
                  <p className="text-slate-500 mt-2">
                    Enter your destination and preferences to get a professionally curated itinerary with booking suggestions.
                  </p>
                </div>
              </div>
            )}

            {/* Loading Skeleton */}
            {isLoading && (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="glass-card p-6 animate-pulse space-y-4">
                    <div className="h-6 w-32 bg-slate-100 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-slate-50 rounded"></div>
                      <div className="h-4 w-5/6 bg-slate-50 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Itinerary Display */}
            {itinerary && <ItineraryView itinerary={itinerary} />}

            {/* Bottom Grid for Secondary Info */}
            <div className="grid md:grid-cols-2 gap-8">
              <BookingSuggestions budget={currentBudget} />
              <Reminders notifications={notifications} onAddNotification={addNotification} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>&copy; 2026 Voyager Planner. Built for Travel Hackathon.</p>
      </footer>
    </div>
  );
}
