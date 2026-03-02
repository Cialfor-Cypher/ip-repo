'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface QuickAction {
  id: number;
  label: string;
  icon: string;
  description: string;
  href: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions = ({ actions }: QuickActionsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleActionClick = (href: string) => {
    if (!isHydrated) return;
    window.location.href = href;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.href)}
            disabled={!isHydrated}
            className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all text-left group disabled:opacity-50"
          >
            <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              <Icon name={action.icon as any} size={20} variant="outline" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-text-primary mb-1">{action.label}</h4>
              <p className="text-xs text-text-secondary">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
