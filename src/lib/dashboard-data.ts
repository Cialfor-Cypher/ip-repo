import pool from './db';

/* =====================
   Types
===================== */

export type MetricData = {
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  description: string;
  icon: string;
};

export type ChartDataPoint = {
  month: string;
  filed: number;
  published: number;
  granted: number;
};

export type CategoryData = {
  name: string;
  value: number;
  color: string;
};

export type Activity = {
  id: number;
  type: 'published' | 'granted';
  title: string;
  patentNumber: string | null;
  date: string;
  user: string;
};

export type Deadline = {
  id: number;
  type: 'expiry';
  title: string;
  patentNumber: string | null;
  dueDate: string;
  daysRemaining: number;
  priority: 'low' | 'medium' | 'high';
};

export type QuickAction = {
  id: number;
  label: string;
  icon: string;
  description: string;
  href: string;
};

export type Insight = {
  id: number;
  type: 'opportunity' | 'risk';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
};

type DashboardData = {
  metrics: MetricData[];
  chartData: ChartDataPoint[];
  categoryData: CategoryData[];
  recentActivities: Activity[];
  upcomingDeadlines: Deadline[];
  quickActions: QuickAction[];
  strategicInsights: Insight[];
  lastUpdated: string;
};

/* =====================
   Main function
===================== */

export async function getDashboardData(): Promise<DashboardData> {
  /* =====================
     Metrics
  ===================== */

  const [[metricsRow]]: any = await pool.query(`
    SELECT
      COUNT(*) AS total,
      SUM(status = 'published') AS published,
      SUM(status = 'granted') AS granted
    FROM patents
  `);

  const metrics: MetricData[] = [
    {
      title: 'Total Applications',
      value: metricsRow.total,
      change: 0,
      trend: 'up',
      description: 'all filings',
      icon: 'M9 12h6m-6 4h6m2 5H7',
    },
    {
      title: 'Published',
      value: metricsRow.published,
      change: 0,
      trend: 'up',
      description: 'applications',
      icon: 'M12 8v4l3 3',
    },
    {
      title: 'Granted',
      value: metricsRow.granted,
      change: 0,
      trend: 'up',
      description: 'patents',
      icon: 'M9 12l2 2 4-4',
    },
  ];

  /* =====================
     Trend Chart
  ===================== */

  const [trendRows]: any = await pool.query(`
    SELECT
      DATE_FORMAT(filed_date, '%b %Y') AS month,
      COUNT(*) AS filed,
      SUM(status = 'published') AS published,
      SUM(status = 'granted') AS granted
    FROM patents
    GROUP BY YEAR(filed_date), MONTH(filed_date)
    ORDER BY filed_date
  `);

  const chartData: ChartDataPoint[] = trendRows.map((r: any) => ({
    month: r.month,
    filed: r.filed,
    published: r.published,
    granted: r.granted,
  }));

  /* =====================
     Category Distribution
  ===================== */

  const [categoryRows]: any = await pool.query(`
    SELECT category, COUNT(*) AS count
    FROM patents
    WHERE category IS NOT NULL
    GROUP BY category
  `);

  const colors = ['#1E40AF', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

  const categoryData: CategoryData[] = categoryRows.map(
    (r: any, i: number) => ({
      name: r.category,
      value: r.count,
      color: colors[i % colors.length],
    })
  );

  /* =====================
     Recent Activity
  ===================== */

  const [activityRows]: any = await pool.query(`
    SELECT id, title, patent_number, status,
           COALESCE(grant_date, published_date) AS activity_date
    FROM patents
    ORDER BY activity_date DESC
    LIMIT 5
  `);

  const recentActivities: Activity[] = activityRows.map((r: any) => ({
    id: r.id,
    type: r.status,
    title: r.title,
    patentNumber: r.patent_number,
    date: new Date(r.activity_date).toDateString(),
    user: 'IP Team',
  }));

  /* =====================
     Upcoming Expirations
  ===================== */

  const [deadlineRows]: any = await pool.query(`
    SELECT
      id,
      title,
      patent_number,
      expiration_date,
      DATEDIFF(expiration_date, CURDATE()) AS days_remaining
    FROM patents
    WHERE expiration_date IS NOT NULL
    ORDER BY expiration_date
    LIMIT 5
  `);

  const upcomingDeadlines: Deadline[] = deadlineRows.map((r: any) => ({
    id: r.id,
    type: 'expiry',
    title: r.title,
    patentNumber: r.patent_number,
    dueDate: new Date(r.expiration_date).toDateString(),
    daysRemaining: r.days_remaining,
    priority:
      r.days_remaining <= 180
        ? 'high'
        : r.days_remaining <= 365
        ? 'medium'
        : 'low',
  }));

  /* =====================
     Static UI Blocks
  ===================== */

  const quickActions: QuickAction[] = [
    {
      id: 1,
      label: 'View Patent',
      icon: 'PlusIcon',
      description: 'View filing information',
      href: '/patent-intelligence-center',
    },
    {
      id: 2,
      label: 'Search Patents',
      icon: 'MagnifyingGlassIcon',
      description: 'Browse portfolio',
      href: '/patent-intelligence-center',
    },
  ];

  const strategicInsights: Insight[] = [
    {
      id: 1,
      type: 'opportunity',
      title: 'Strong Filing Momentum',
      description:
        'Consistent filing activity indicates healthy innovation output.',
      impact: 'high',
    },
  ];

  return {
    metrics,
    chartData,
    categoryData,
    recentActivities,
    upcomingDeadlines,
    quickActions,
    strategicInsights,
    lastUpdated: new Date().toLocaleString(),
  };
}
