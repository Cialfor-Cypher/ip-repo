'use client';

import MetricsCard from './MetricsCard';
import PortfolioChart from './PortfolioChart';
import CategoryDistribution from './CategoryDistribution';
import RecentActivity from './RecentActivity';
import UpcomingDeadlines from './UpcomingDeadlines';
import QuickActions from './QuickActions';
import StrategicInsights from './StrategicInsights';
import Icon from '@/components/ui/AppIcon';

/* =======================
   Types
======================= */

export interface MetricData {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  trend: 'up' | 'down';
  description: string;
}

export interface ChartDataPoint {
  month: string;
  filed: number;
  published: number;
  granted: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export interface Activity {
  id: number;
  type: 'published' | 'granted';
  title: string;
  patentNumber: string;
  date: string;
  user: string;
}

export interface Deadline {
  id: number;
  type: 'expiry';
  title: string;
  patentNumber: string;
  dueDate: string;
  daysRemaining: number;
  priority: 'high' | 'medium' | 'low';
}

export interface QuickAction {
  id: number;
  label: string;
  icon: string;
  description: string;
  href: string;
}

export interface Insight {
  id: number;
  type: 'opportunity' | 'risk';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

/* =======================
   Props
======================= */

interface DashboardInteractiveProps {
  metrics: MetricData[];
  chartData: ChartDataPoint[];
  categoryData: CategoryData[];
  recentActivities: Activity[];
  upcomingDeadlines: Deadline[];
  quickActions: QuickAction[];
  strategicInsights: Insight[];
  lastUpdated: string;
}

/* =======================
   Component
======================= */

const DashboardInteractive = ({
  metrics,
  chartData,
  categoryData,
  recentActivities,
  upcomingDeadlines,
  quickActions,
  strategicInsights,
  lastUpdated,
}: DashboardInteractiveProps) => {

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Innovation Dashboard
              </h1>
              <p className="text-text-secondary">
                Strategic overview of your patent portfolio
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <Icon name="ClockIcon" size={14} variant="outline" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, i) => (
            <MetricsCard key={i} {...metric} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PortfolioChart data={chartData} />
          </div>
          <CategoryDistribution data={categoryData} />
        </div>

        {/* Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <RecentActivity activities={recentActivities} />
          <UpcomingDeadlines deadlines={upcomingDeadlines} />
          <QuickActions actions={quickActions} />
        </div>

        {/* Insights */}
        <StrategicInsights insights={strategicInsights} />

      </div>
    </div>
  );
};

export default DashboardInteractive;
