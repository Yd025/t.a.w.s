import { useState } from 'react';
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Target,
} from 'lucide-react';
import {
  CALENDAR_SUBSCRIBE_HINT,
  DEFAULT_CALENDAR_MONTH,
  DEFAULT_CALENDAR_YEAR,
  scheduleEvents,
  tasks,
  type Task,
} from '@/lib/cse451-schedule';
import { cn } from '@/app/components/ui/utils';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent: boolean;
  events: string[];
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();
  const days: CalendarDay[] = [];

  const startPadding = firstDay.getDay();
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startPadding - 1; i >= 0; i--) {
    days.push({
      date: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false,
      events: [],
    });
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const eventsForDay = scheduleEvents
      .filter((e) => e.year === year && e.month === month && e.day === i)
      .map((e) => e.title);

    days.push({
      date: i,
      isCurrentMonth: true,
      isToday:
        today.getDate() === i &&
        today.getMonth() === month &&
        today.getFullYear() === year,
      hasEvent: eventsForDay.length > 0,
      events: eventsForDay,
    });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      isToday: false,
      hasEvent: false,
      events: [],
    });
  }

  return days;
}

function formatDueDate(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) return 'Overdue';
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 7) return `In ${days} days`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getTypeIcon(type: Task['type']) {
  switch (type) {
    case 'quiz':
    case 'exam':
      return AlertCircle;
    case 'project':
      return Target;
    default:
      return FileText;
  }
}

function getPriorityStyles(priority: Task['priority']) {
  switch (priority) {
    case 'high':
      return 'border-l-[oklch(0.6_0.2_25)]';
    case 'medium':
      return 'border-l-[oklch(0.7_0.15_70)]';
    case 'low':
      return 'border-l-[oklch(0.6_0.15_150)]';
    default:
      return 'border-l-muted-foreground';
  }
}

export function TasksPanel() {
  const [taskList, setTaskList] = useState(tasks);
  const [currentMonth, setCurrentMonth] = useState(DEFAULT_CALENDAR_MONTH);
  const [currentYear, setCurrentYear] = useState(DEFAULT_CALENDAR_YEAR);
  const [hoveredDay, setHoveredDay] = useState<CalendarDay | null>(null);

  const toggleTask = (id: string) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const calendarDays = generateCalendarDays(currentYear, currentMonth);
  const incompleteTasks = taskList
    .filter((t) => !t.completed)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <aside className="hidden w-96 shrink-0 flex-col border-l border-border/60 bg-gradient-to-b from-background to-secondary/30 xl:flex">
      <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">Deadlines</h2>
          <p className="text-sm text-muted-foreground">
            {incompleteTasks.length} tasks remaining
          </p>
        </div>
        <div className="gradient-glow-pink flex h-10 w-10 items-center justify-center rounded-xl shadow-lg shadow-accent/30">
          <Target className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <div className="space-y-3">
          {incompleteTasks.map((task) => {
            const Icon = getTypeIcon(task.type);
            const dueText = formatDueDate(task.dueDate);
            const isUrgent =
              dueText === 'Today' || dueText === 'Tomorrow' || dueText === 'Overdue';

            return (
              <div
                key={task.id}
                className={cn(
                  'group flex items-start gap-4 rounded-xl border border-border/50 border-l-4 bg-card p-4 transition-all hover:border-border hover:shadow-md',
                  getPriorityStyles(task.priority),
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/50 transition-all hover:border-primary hover:bg-primary/10"
                  aria-label={`Mark ${task.title} complete`}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-tight text-foreground">
                    {task.title}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon className="h-3.5 w-3.5" />
                      {task.courseCode}
                    </span>
                    <span
                      className={cn(
                        'flex items-center gap-1.5 text-xs font-medium',
                        isUrgent ? 'text-[oklch(0.5_0.2_25)]' : 'text-muted-foreground',
                      )}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      {dueText}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 border-t border-border/60 bg-white/50 p-5">
        <p className="mb-4 text-center text-xs text-muted-foreground">
          {CALENDAR_SUBSCRIBE_HINT}
        </p>

        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevMonth}
              className="rounded-lg p-1.5 transition-colors hover:bg-secondary"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="rounded-lg p-1.5 transition-colors hover:bg-secondary"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="py-1 text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              onMouseEnter={() => day.hasEvent && setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              className={cn(
                'relative flex h-9 cursor-default items-center justify-center rounded-lg text-sm transition-all',
                !day.isCurrentMonth && 'text-muted-foreground/40',
                day.isCurrentMonth &&
                  !day.isToday &&
                  !day.hasEvent &&
                  'text-foreground hover:bg-secondary/50',
                day.isToday &&
                  'bg-primary font-bold text-primary-foreground shadow-md shadow-primary/30',
                day.hasEvent &&
                  !day.isToday &&
                  'bg-accent/20 font-medium text-accent hover:bg-accent/30',
              )}
            >
              {day.date}
              {day.hasEvent && !day.isToday && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </div>
          ))}

          {hoveredDay && hoveredDay.events.length > 0 && (
            <div className="absolute bottom-full left-1/2 z-10 mb-2 min-w-48 -translate-x-1/2 rounded-xl border border-border bg-popover p-3 shadow-xl">
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                {MONTHS[currentMonth]} {hoveredDay.date}, {currentYear}
              </p>
              <div className="space-y-1">
                {hoveredDay.events.map((event) => (
                  <p key={event} className="text-sm text-foreground">
                    {event}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 border-t border-border/50 pt-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-md bg-primary shadow-sm" />
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-md bg-accent/30" />
            <span className="text-xs text-muted-foreground">Scheduled</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
