export interface Activity {
  type: 'morning' | 'afternoon' | 'evening';
  title: string;
  description: string;
  location?: string;
  time?: string;
  notes?: string;
}

export interface Booking {
  title: string;
  time: string;
  location: string;
  bookingUrl?: string;
  tags?: string[];
}

export interface VacationStore {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  getActivitiesForDate: (date: Date) => Activity[];
  getBookingsForDate: (date: Date) => Booking[];
  addToCalendar: (event: CalendarEvent) => void;
}

export interface CalendarEvent {
  title: string;
  description?: string;
  startTime: string;
  location?: string;
  date: Date;
}