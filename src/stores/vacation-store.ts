import { create } from 'zustand';
import { format } from 'date-fns';
import { activities, bookings } from '@/data/vacation-data';
import type { VacationStore } from '@/types/vacation';
import { toast } from 'sonner';

export const useVacationStore = create<VacationStore>((set) => ({
  selectedDate: undefined,
  setSelectedDate: (date) => set({ selectedDate: date }),
  getActivitiesForDate: (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return activities[dateKey] || [];
  },
  getBookingsForDate: (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return bookings[dateKey] || [];
  },
  addToCalendar: (event) => {
    const { title, description, startTime, location, date } = event;
    
    // Create Google Calendar URL
    const encodedTitle = encodeURIComponent(title);
    const encodedDesc = encodeURIComponent(description || '');
    const encodedLocation = encodeURIComponent(location || '');
    const dateString = format(date, "yyyyMMdd");
    const timeString = startTime.replace(':', '') + '00';
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&details=${encodedDesc}&location=${encodedLocation}&dates=${dateString}T${timeString}/${dateString}T${timeString}`;
    
    window.open(url, '_blank');
    toast.success('Opening calendar...');
  },
}));