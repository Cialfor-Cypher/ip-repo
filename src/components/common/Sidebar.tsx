'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface SidebarProps {
  isCollapsed?: boolean;
  className?: string;
}

const Sidebar = ({ isCollapsed = false, className = '' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const pathname = usePathname();

  const navigationItems = [
    {
      label: 'Dashboard',
      href: '/innovation-dashboard-hub',
      icon: 'ChartBarIcon',
      description: 'Strategic overview',
    },
    {
      label: 'Intelligence Center',
      href: '/patent-intelligence-center',
      icon: 'LightBulbIcon',
      description: 'Patent insights',
    }
  ];

  const isActive = (href: string) => pathname === href;

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`lg:fixed top-16 left-0 bottom-0 z-40 bg-surface border-r border-border transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-end p-4 border-b border-border">
          <button
            onClick={toggleCollapse}
            className="p-2 text-text-secondary hover:text-primary hover:bg-muted rounded-md transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name={collapsed ? 'ChevronRightIcon' : 'ChevronLeftIcon'}
              size={20}
              variant="outline"
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  name={item.icon as any}
                  size={20}
                  variant={active ? 'solid' : 'outline'}
                  className={`flex-shrink-0 ${active ? 'text-white' : ''}`}
                />
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${active ? 'text-white' : ''}`}>
                      {item.label}
                    </div>
                    <div
                      className={`text-xs truncate ${
                        active ? 'text-white/80' : 'text-text-secondary'
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
      </div>
    </aside>
  );
};

export default Sidebar;
