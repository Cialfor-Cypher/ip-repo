import Icon from '@/components/ui/AppIcon';

interface Activity {
  id: number;
  type: 'filed' | 'published' | 'granted' | 'renewed' | 'expired';
  title: string;
  patentNumber: string | null;
  date: string;
  user: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'filed':
        return { name: 'DocumentPlusIcon' as const, color: 'text-accent' };
      case 'published':
        return { name: 'DocumentTextIcon' as const, color: 'text-info' };
      case 'granted':
        return { name: 'CheckCircleIcon' as const, color: 'text-success' };
      case 'renewed':
        return { name: 'ArrowPathIcon' as const, color: 'text-warning' };
      case 'expired':
        return { name: 'XCircleIcon' as const, color: 'text-error' };
      default:
        return { name: 'InformationCircleIcon' as const, color: 'text-muted-foreground' };
    }
  };

  const getActivityLabel = (type: Activity['type']) => {
    switch (type) {
      case 'filed':
        return 'Filed';
      case 'published':
        return 'Published';
      case 'granted':
        return 'Granted';
      case 'renewed':
        return 'Renewed';
      case 'expired':
        return 'Expired';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Recent Activity
        </h3>
        <button className="text-sm font-medium text-accent hover:text-brand-primary transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const iconConfig = getActivityIcon(activity.type);

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className={`p-2 rounded-lg bg-muted ${iconConfig.color}`}>
                <Icon name={iconConfig.name} size={20} variant="solid" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-text-primary truncate">
                    {activity.title}
                  </h4>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${iconConfig.color} bg-muted whitespace-nowrap`}
                  >
                    {getActivityLabel(activity.type)}
                  </span>
                </div>

                {activity.patentNumber && (
                  <p className="text-xs text-text-secondary mb-1">
                    {activity.patentNumber}
                  </p>
                )}

                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <span>{activity.date}</span>
                  <span>•</span>
                  <span>{activity.user}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
