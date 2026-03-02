'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  month: string;
  filed: number;
  published: number;
  granted: number;
}

interface PortfolioChartProps {
  data: ChartDataPoint[];
}

const PortfolioChart = ({ data }: PortfolioChartProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Patent Filing Trends</h3>
        <div className="h-80 flex items-center justify-center bg-muted rounded-lg">
          <div className="text-text-secondary">Loading chart...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Patent Filing Trends</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1E40AF]"></div>
            <span className="text-text-secondary">Filed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
            <span className="text-text-secondary">Published</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
            <span className="text-text-secondary">Granted</span>
          </div>
        </div>
      </div>
      <div className="h-80" aria-label="Patent Filing Trends Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" stroke="#64748B" style={{ fontSize: '12px' }} />
            <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px'
              }} 
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="filed" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="published" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="granted" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChart;
