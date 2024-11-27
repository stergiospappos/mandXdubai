import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CalendarPlus, MapPin, Clock, Info } from 'lucide-react';
import { format } from 'date-fns';
import { useVacationStore } from '@/stores/vacation-store';
import { Activity } from '@/types/vacation';

export function DayDetails() {
  const { selectedDate, getActivitiesForDate, addToCalendar } = useVacationStore();

  if (!selectedDate) {
    return (
      <div className="text-center py-8 space-y-4">
        <Info className="w-8 h-8 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">
          Select a date to view your itinerary details
        </p>
      </div>
    );
  }

  const activities = getActivitiesForDate(selectedDate);

  const handleAddToCalendar = (activity: Activity) => {
    addToCalendar({
      title: activity.title,
      description: activity.description,
      startTime: activity.time?.split(' ')[0] || '09:00',
      location: activity.location,
      date: selectedDate,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">
          {format(selectedDate, 'EEEE, MMMM d')}
        </h2>
        <p className="text-muted-foreground mt-1">
          Day {Math.floor((selectedDate.getTime() - new Date(2024, 10, 27).getTime()) / (1000 * 60 * 60 * 24)) + 1} of your vacation
        </p>
      </div>

      <Separator />

      {activities?.map((activity, index) => (
        <Card key={index} className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Badge 
                variant={
                  activity.type === 'morning' 
                    ? 'default' 
                    : activity.type === 'afternoon' 
                      ? 'secondary' 
                      : 'outline'
                }
                className="w-fit"
              >
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                className="text-primary hover:text-primary-foreground w-full sm:w-auto"
                onClick={() => handleAddToCalendar(activity)}
              >
                <CalendarPlus className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
            </div>

            <div>
              <h3 className="font-semibold text-lg">{activity.title}</h3>
              <p className="text-muted-foreground mt-2">{activity.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {activity.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{activity.location}</span>
                </div>
              )}

              {activity.time && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{activity.time}</span>
                </div>
              )}
            </div>

            {activity.notes && (
              <div className="bg-muted p-4 rounded-md text-sm">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>{activity.notes}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}