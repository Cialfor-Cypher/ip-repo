import Icon from '@/components/ui/AppIcon';

interface Insight {
  id: number;
  type: 'opportunity' | 'risk' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

interface StrategicInsightsProps {
  insights: Insight[];
}

const StrategicInsights = ({ insights }: StrategicInsightsProps) => {
  const getInsightConfig = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity':
        return { icon: 'LightBulbIcon' as const, color: 'text-success', bg: 'bg-success/10' };
      case 'risk':
        return { icon: 'ExclamationTriangleIcon' as const, color: 'text-warning', bg: 'bg-warning/10' };
      case 'recommendation':
        return { icon: 'SparklesIcon' as const, color: 'text-accent', bg: 'bg-accent/10' };
    }
  };

  const getImpactBadge = (impact: Insight['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-error/10 text-error';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">AI-Powered Strategic Insights</h3>
        <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">AI Generated</span>
      </div>
      <div className="space-y-4">
        {insights.map((insight) => {
          const config = getInsightConfig(insight.type);
          return (
            <div key={insight.id} className="p-4 rounded-lg border border-border hover:border-accent/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${config.bg} ${config.color}`}>
                  <Icon name={config.icon} size={20} variant="solid" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-semibold text-text-primary">{insight.title}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getImpactBadge(insight.impact)} whitespace-nowrap`}>
                      {insight.impact.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{insight.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StrategicInsights;
