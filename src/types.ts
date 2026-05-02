export type TravelType = 'Solo' | 'Couple' | 'Family' | 'Friends';
export type BudgetLevel = 'Low' | 'Medium' | 'High';

export interface TripFormData {
  destination: string;
  days: number;
  budget: BudgetLevel;
  type: TravelType;
  startDate: string;
  interests: string[];
}

export interface DayPlan {
  day: number;
  morning: string;
  afternoon: string;
  evening: string;
}

export interface Itinerary {
  tripTitle: string;
  days: DayPlan[];
}

export interface BookingSuggestion {
  category: string;
  suggestion: string;
  icon: string;
}

export interface Reminder {
  id: string;
  task: string;
  completed: boolean;
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'alert' | 'reminder' | 'update';
  timestamp: Date;
}
