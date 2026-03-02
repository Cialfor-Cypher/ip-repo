'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CategoryData {
  name: string;   // CS, AI, ML, DLT, etc.
  value: number;
}

interface CategoryDistributionProps {
  data: CategoryData[];
}

/**
 * Categories to show explicitly
 */
const TOP_CATEGORIES = ['CS', 'AI', 'ML', 'DLT'];

/**
 * Color palette (intentional & consistent)
 */
const CATEGORY_COLORS: Record<string, string> = {
  CS: '#EF4444',        // Cyber Security
  AI: '#3B82F6',        // Artificial Intelligence
  ML: '#60A5FA',        // Machine Learning
  DLT: '#8B5CF6',       // Distributed Ledger Technology
  Others: '#9CA3AF',    // Neutral gray
};

/**
 * Full display names (UI only)
 */
const CATEGORY_LABELS: Record<string, string> = {
  CS: 'Cyber Security',
  AI: 'Artificial Intelligence',
  ML: 'Machine Learning',
  DLT: 'Distributed Ledger Technology',
  Others: 'Others',
};

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ data }) => {
  /**
   * Aggregate categories into:
   * CS, AI, ML, DLT, Others
   */
  const processedData = React.useMemo(() => {
    const result: CategoryData[] = [];
    let othersValue = 0;

    data.forEach((item) => {
      if (TOP_CATEGORIES.includes(item.name)) {
        result.push(item);
      } else {
        othersValue += item.value;
      }
    });

    if (othersValue > 0) {
      result.push({
        name: 'Others',
        value: othersValue,
      });
    }

    return result;
  }, [data]);

  const total = processedData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Technology Categories
      </h2>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={processedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={2}
              labelLine={false}
              label={({ percent }) =>
                `${(percent * 100).toFixed(0)}%`
              }
            >
              {processedData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} patents`,
                CATEGORY_LABELS[name] || name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with full names */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        {processedData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 text-gray-700"
          >
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: CATEGORY_COLORS[item.name] }}
            />
            <span className="font-medium">
              {CATEGORY_LABELS[item.name] || item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        Total patents:{' '}
        <span className="font-medium text-gray-900">{total}</span>
      </div>
    </div>
  );
};

export default CategoryDistribution;
