'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const primaryNavItems = [
    {
      label: 'Dashboard',
      href: '/innovation-dashboard-hub',
      icon: 'ChartBarIcon',
    },
    {
      label: 'Intelligence',
      href: '/patent-intelligence-center',
      icon: 'LightBulbIcon',
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-sm ${className}`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link
            href="/innovation-dashboard-hub"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity "
          >
            <Image
              src="https://cialfor.com/assets/cialfor_logo-removebg-preview-PIbp628h.png"
              alt="Cialfor"
              width={120}
              height={32}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-muted rounded-md transition-all duration-200"
              >
                <Icon name={item.icon as any} size={18} variant="outline" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 text-text-secondary hover:text-primary hover:bg-muted rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
              size={24}
              variant="outline"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface">
            <nav className="px-4 py-4 space-y-1">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:text-primary hover:bg-muted rounded-md transition-colors"
                >
                  <Icon name={item.icon as any} size={20} variant="outline" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
