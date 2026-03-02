import Icon from '@/components/ui/AppIcon';

interface Deadline {
  id: number;
  type: 'renewal' | 'maintenance' | 'response' | 'filing';
  title: string;
  patentNumber: string;
  dueDate: string;
  daysRemaining: number;
  priority: 'high' | 'medium' | 'low';
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

const UpcomingDeadlines = ({ deadlines }: UpcomingDeadlinesProps) => {
  const getPriorityColor = (priority: Deadline['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
    }
  };

  const getTypeIcon = (type: Deadline['type']) => {
    switch (type) {
      case 'renewal':
        return 'ArrowPathIcon' as const;
      case 'maintenance':
        return 'WrenchScrewdriverIcon' as const;
      case 'response':
        return 'ChatBubbleLeftRightIcon' as const;
      case 'filing':
        return 'DocumentTextIcon' as const;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Upcoming Deadlines</h3>
        <button className="text-sm font-medium text-accent hover:text-brand-primary transition-colors">
          View Calendar
        </button>
      </div>
      <div className="space-y-3">
        {deadlines.map((deadline) => (
          <div key={deadline.id} className={`p-4 rounded-lg border ${getPriorityColor(deadline.priority)}`}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/50">
                <Icon name={getTypeIcon(deadline.type)} size={18} variant="outline" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-text-primary mb-1 truncate">{deadline.title}</h4>
                <p className="text-xs text-text-secondary mb-2">{deadline.patentNumber}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium">Due: {deadline.dueDate}</span>
                  <span className="text-xs font-bold">{deadline.daysRemaining} days</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
