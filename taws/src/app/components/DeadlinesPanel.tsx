import { Calendar, AlertCircle } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  dueDate: Date;
  daysUntil: number;
  type: 'assignment' | 'project' | 'quiz' | 'exam';
}

export function DeadlinesPanel() {
  const deadlines: Deadline[] = [
    {
      id: '1',
      title: 'Assignment 3: Process Scheduling',
      dueDate: new Date('2026-05-20'),
      daysUntil: 4,
      type: 'assignment',
    },
    {
      id: '2',
      title: 'Project 2: Virtual Memory',
      dueDate: new Date('2026-05-27'),
      daysUntil: 11,
      type: 'project',
    },
    {
      id: '3',
      title: 'Midterm Quiz',
      dueDate: new Date('2026-05-24'),
      daysUntil: 8,
      type: 'quiz',
    },
    {
      id: '4',
      title: 'Assignment 4: File Systems',
      dueDate: new Date('2026-06-03'),
      daysUntil: 18,
      type: 'assignment',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-50 border-blue-200';
      case 'project':
        return 'bg-purple-50 border-purple-200';
      case 'quiz':
        return 'bg-orange-50 border-orange-200';
      case 'exam':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTypeTextColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'text-blue-700';
      case 'project':
        return 'text-purple-700';
      case 'quiz':
        return 'text-orange-700';
      case 'exam':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil <= 3) return 'border-l-4 border-l-destructive';
    if (daysUntil <= 7) return 'border-l-4 border-l-yellow-500';
    return 'border-l-4 border-l-green-500';
  };

  const sortedDeadlines = [...deadlines].sort(
    (a, b) => a.daysUntil - b.daysUntil
  );

  return (
    <div className="w-80 h-full bg-sidebar border-l border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-foreground font-semibold">Upcoming Deadlines</h2>
        </div>
        <p className="text-xs text-muted-foreground">Stay on top of your coursework</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {sortedDeadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`${getUrgencyColor(deadline.daysUntil)} p-3 rounded-lg border ${getTypeColor(deadline.type)} transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-2">
                {deadline.daysUntil <= 3 && (
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {deadline.title}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getTypeTextColor(deadline.type)} ${getTypeColor(deadline.type)}`}>
                      {deadline.type.charAt(0).toUpperCase() + deadline.type.slice(1)}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {deadline.daysUntil} day{deadline.daysUntil !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {deadline.dueDate.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          📚 Stay focused on your learning goals!
        </p>
      </div>
    </div>
  );
}
