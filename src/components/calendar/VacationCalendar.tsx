import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CalendarPlus, MapPin, Clock, ExternalLink, Info } from 'lucide-react';
import { format } from 'date-fns';
import { DayDetails } from './DayDetails';
import { useVacationStore } from '@/stores/vacation-store';
import { Booking } from '@/types/vacation';

export function VacationCalendar() {
  const { selectedDate, setSelectedDate } = useVacationStore();
  const startDate = new Date(2024, 10, 27); // November 27, 2024
  const endDate = new Date(2024, 11, 8);    // December 8, 2024

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="grid lg:grid-cols-[380px,1fr] gap-8">
        <div className="space-y-6">
          <Card className="p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
              fromDate={startDate}
              toDate={endDate}
              modifiers={{
                booked: (date) => {
                  const d = format(date, 'yyyy-MM-dd');
                  return d >= format(startDate, 'yyyy-MM-dd') && d <= format(endDate, 'yyyy-MM-dd');
                },
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                },
              }}
            />
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Info className="w-4 h-4" />
                Calendar Legend
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                  <span>Vacation Days</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-secondary" />
                  <span>Available Days</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger 
                value="details" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Day Details
              </TabsTrigger>
              <TabsTrigger 
                value="bookings"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Bookings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <ScrollArea className="h-[600px] rounded-md border p-6">
                <DayDetails />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="bookings" className="mt-6">
              <ScrollArea className="h-[600px] rounded-md border p-6">
                {selectedDate && <BookingsList date={selectedDate} />}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function BookingsList({ date }: { date: Date }) {
  const { getBookingsForDate, addToCalendar } = useVacationStore();
  const bookings = getBookingsForDate(date);

  if (!bookings?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No bookings scheduled for this date
      </div>
    );
  }

  const handleAddToCalendar = (booking: Booking) => {
    addToCalendar({
      title: booking.title,
      startTime: booking.time.split(' ')[0],
      location: booking.location,
      date,
    });
  };

  return (
    <div className="space-y-6">
      {bookings.map((booking, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{booking.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{booking.location}</span>
                </div>
              </div>
              {booking.tags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {booking.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex sm:flex-col gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm"
                      variant="secondary"
                      className="w-full"
                      onClick={() => handleAddToCalendar(booking)}
                    >
                      <CalendarPlus className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Add to Calendar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add to Calendar</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {booking.bookingUrl && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        size="sm"
                        variant="default"
                        className="w-full"
                        asChild
                      >
                        <a 
                          href={booking.bookingUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Book Now</span>
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Book Now</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}