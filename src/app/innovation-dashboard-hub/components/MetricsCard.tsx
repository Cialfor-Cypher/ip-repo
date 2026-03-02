interface MetricsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  trend: 'up' | 'down';
  description: string;
}

const MetricsCard = ({ title, value, change, icon, trend, description }: MetricsCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-text-primary">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${trend === 'up' ? 'bg-success/10' : 'bg-error/10'}`}>
          <div className={trend === 'up' ? 'text-success' : 'text-error'}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${trend === 'up' ? 'text-success' : 'text-error'}`}>
          {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}%
        </span>
        <span className="text-xs text-text-secondary">{description}</span>
      </div>
    </div>
  );
};

export default MetricsCard;
