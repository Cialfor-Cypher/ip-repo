'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SortDropdownProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

const SortDropdown = ({ currentSort, onSortChange }: SortDropdownProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'citations-desc', label: 'Most Citations' },
    { value: 'title-asc', label: 'Title (A-Z)' },
    { value: 'title-desc', label: 'Title (Z-A)' },
  ];

  const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort By';

  const handleSelect = (value: string) => {
    if (!isHydrated) return;
    onSortChange(value);
    setIsOpen(false);
  };

  if (!isHydrated) {
    return (
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-muted transition-colors"
          disabled
        >
          <Icon name="ArrowsUpDownIcon" size={18} variant="outline" />
          <span>Sort By</span>
          <Icon name="ChevronDownIcon" size={16} variant="outline" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-muted transition-colors"
      >
        <Icon name="ArrowsUpDownIcon" size={18} variant="outline" />
        <span>{currentLabel}</span>
        <Icon
          name="ChevronDownIcon"
          size={16}
          variant="outline"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-50">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  currentSort === option.value
                    ? 'bg-accent text-white font-semibold' :'text-text-secondary hover:bg-muted hover:text-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;
