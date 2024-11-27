import { VacationCalendar } from '@/components/calendar/VacationCalendar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <main className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Dubai Vacation Planner</h1>
            <p className="text-muted-foreground">
              Plan and manage your Dubai adventure from November 27 to December 8, 2024
            </p>
          </div>
          <VacationCalendar />
        </div>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;