'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { FilterState } from './FilterPanel';

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveFilter: (category: keyof FilterState, value: string) => void;
  onClearAll: () => void;
}

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const activeFilters: Array<{ category: keyof FilterState; value: string; label: string }> = [];

  (Object.keys(filters) as Array<keyof FilterState>).forEach(category => {
    if (category === 'dateRange') {
      const dateRange = filters.dateRange;
      if (dateRange.start || dateRange.end) {
        const label = `${dateRange.start || 'Start'} - ${dateRange.end || 'End'}`;
        activeFilters.push({ category, value: 'dateRange', label });
      }
    } else {
      const values = filters[category] as string[];
      values.forEach(value => {
        activeFilters.push({ category, value, label: value });
      });
    }
  });

  if (activeFilters.length === 0) return null;

  if (!isHydrated) {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-primary">Active Filters:</span>
        <div className="flex items-center gap-2 flex-wrap">
          {activeFilters.map((filter, index) => (
            <span
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium"
            >
              <span>{filter.label}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-semibold text-primary">Active Filters:</span>
      <div className="flex items-center gap-2 flex-wrap">
        {activeFilters.map((filter, index) => (
          <button
            key={index}
            onClick={() => onRemoveFilter(filter.category, filter.value)}
            className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors group"
          >
            <span>{filter.label}</span>
            <Icon
              name="XMarkIcon"
              size={14}
              variant="outline"
              className="group-hover:text-white"
            />
          </button>
        ))}
        <button
          onClick={onClearAll}
          className="px-3 py-1.5 text-sm font-semibold text-error hover:bg-error/10 rounded-full transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default ActiveFilters;
