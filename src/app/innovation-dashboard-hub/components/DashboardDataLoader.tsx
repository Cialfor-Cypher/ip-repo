'use client';

import { useEffect, useState } from 'react';
import DashboardInteractive from './DashboardInteractive';
import { getApiUrl } from '@/lib/api-url';

type DashboardResponse = {
  metrics: any[];
  chartData: any[];
  categoryData: any[];
  recentActivities: any[];
  upcomingDeadlines: any[];
  quickActions: any[];
  strategicInsights: any[];
  lastUpdated: string;
};

const emptyState: DashboardResponse = {
  metrics: [],
  chartData: [],
  categoryData: [],
  recentActivities: [],
  upcomingDeadlines: [],
  quickActions: [],
  strategicInsights: [],
  lastUpdated: '',
};

export default function DashboardDataLoader() {
  const [data, setData] = useState<DashboardResponse>(emptyState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch(getApiUrl('/dashboard'));
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const json = (await res.json()) as DashboardResponse;
        setData(json);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setData(emptyState);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-text-secondary">
        Loading dashboard...
      </div>
    );
  }

  return <DashboardInteractive {...data} />;
}
