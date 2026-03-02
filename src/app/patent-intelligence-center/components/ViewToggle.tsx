'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ViewToggleProps {
  currentView: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex items-center gap-2 bg-surface border border-border rounded-lg p-1">
        <button className="px-3 py-2 rounded-md transition-colors" disabled>
          <Icon name="Squares2X2Icon" size={20} variant="outline" />
        </button>
        <button className="px-3 py-2 rounded-md transition-colors" disabled>
          <Icon name="ListBulletIcon" size={20} variant="outline" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-surface border border-border rounded-lg p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentView === 'grid' ?'bg-accent text-white' :'text-text-secondary hover:text-primary hover:bg-muted'
        }`}
        title="Grid view"
      >
        <Icon name="Squares2X2Icon" size={20} variant={currentView === 'grid' ? 'solid' : 'outline'} />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentView === 'list' ?'bg-accent text-white' :'text-text-secondary hover:text-primary hover:bg-muted'
        }`}
        title="List view"
      >
        <Icon name="ListBulletIcon" size={20} variant={currentView === 'list' ? 'solid' : 'outline'} />
      </button>
    </div>
  );
};

export default ViewToggle;
