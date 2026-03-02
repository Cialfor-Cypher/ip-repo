'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

/* ----------------------------------------
   Types
----------------------------------------- */
export interface Patent {
  id: string;
  title?: string;
  patentNumber: string;
  status: 'Granted' | 'Published' | 'Pending' | 'Expired' | 'Abandoned' | string;
  category: string;
  inventors: string[];
  assignee: string;
  abstract: string;
  certificateUrl: string;
}

interface PatentCardProps {
  patent: Patent;
  viewMode: 'grid' | 'list';
}

/* ----------------------------------------
   Helpers
----------------------------------------- */
const getCategoryLabel = (category?: string) => {
  if (!category) return '—';
  switch (category) {
    case 'CS':
      return 'Cyber Security';
    case 'AI':
      return 'Artificial Intelligence';
    case 'DLT':
      return 'Blockchain';
    case 'NS':
      return 'Network Security';
    case 'ML':
      return 'Machine Learning';
    case 'DF':
      return 'Digital Forensics';
    case 'enterprise':
      return 'Enterprise Systems';
    case 'software':
      return 'Software';  
    case 'internet':
      return 'Internet Technology';
    case 'virtual':
      return 'Virtual Environment';
    default:
      return category;
  }
};

/* ----------------------------------------
   Component
----------------------------------------- */
const PatentCard = ({ patent, viewMode }: PatentCardProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isGranted = patent.status === 'Granted';
  const isPublished = patent.status === 'Published';

  /* ----------------------------------------
     GRID VIEW — GLASS FLIP CARD
  ----------------------------------------- */
  if (viewMode === 'grid') {
    const tintClass = isGranted
      ? 'glass-flip-granted'
      : isPublished
      ? 'glass-flip-published'
      : 'bg-white/60';

    return (
      <div className="group relative h-[440px] w-full max-w-[360px] [perspective:1200px]">
        <div className="absolute inset-0 duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">

{/* ---------- FRONT ---------- */}
<div
  className={`absolute inset-0 rounded-2xl p-6 glass-flip ${tintClass} [backface-visibility:hidden]`}
>
  <div className="flex flex-col h-full">
    {/* Header */}
    <div className="flex justify-between items-start mb-4">
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${
          isGranted
            ? 'bg-yellow-500/90 text-white'
            : isPublished
            ? 'bg-emerald-500/90 text-white'
            : 'bg-muted text-slate-600'
        }`}
      >
        {patent.status}
      </span>

      {isHydrated && (
        <button
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-white/20 rounded-lg"
          title="Bookmark"
        >
        </button>
      )}
    </div>

    {/* Title – FULLY VISIBLE */}
    {patent.title && (
      <h3 className="text-lg font-semibold text-slate-800 leading-snug mb-3">
        {patent.title}
      </h3>
    )}

    {/* Abstract – use remaining space */}
    <p className="text-sm text-slate-600 leading-relaxed overflow-hidden">
      {patent.abstract}
    </p>
  </div>
</div>


          {/* ---------- BACK ---------- */}
          <div
            className={`absolute inset-0 rounded-2xl p-6 glass-flip ${tintClass} [transform:rotateX(180deg)] [backface-visibility:hidden]`}
          >
            <div className="flex flex-col h-full">
              {/* Top: Application Number */}
              <div className="mb-4">
                <div className="text-xs uppercase tracking-wide text-text-slate-600 mb-1">
                  Application Number
                </div>
                <div className="text-lg font-bold text-slate-800">
                  {patent.patentNumber}
                </div>
              </div>

              {/* Info Grid (Premium replacement for list) */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-lg bg-white/40 px-3 py-2 ">
                  <div className="text-[11px] uppercase tracking-wide text-text-slate-600">
                    Category
                  </div>
                  <div className="max-w-[140px] whitespace-nowrap text-sm font-semibold text-slate-800">
                    {getCategoryLabel(patent.category)}
                  </div>
                </div>



                <div className="rounded-lg bg-white/40 px-3 py-2 col-span-2">
                    <div className="text-[11px] uppercase tracking-wide text-text-slate-600 mb-1">
                        Inventors
                    </div>
                    <div className="flex gap-4 text-sm font-semibold text-slate-800">
                        <span>{patent.inventors?.[0] || '—'}</span>
                            {patent.inventors?.[1] && (
                        <span className="opacity-80">{patent.inventors[1]}</span>
                        )}
                    </div>
                </div>



                <div className="rounded-lg bg-white/40 px-3 py-2 col-span-2">
                  <div className="text-[11px] uppercase tracking-wide text-text-slate-600">
                    Assignee
                  </div>
                  <div className="text-sm font-semibold text-slate-800 truncate">
                    {patent.assignee || '—'}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <a
                href={patent.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full text-center px-4 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-brand-primary transition-colors"
              >
                View Certificate
              </a>
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* ----------------------------------------
     LIST VIEW — UNCHANGED (SAFE)
  ----------------------------------------- */
  return (
    <div className="rounded-lg p-6 border border-border bg-surface transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-muted text-text-slate-600">
          {patent.status}
        </span>
      </div>

      {patent.title && (
        <h3 className="text-base font-semibold text-slate-800 mb-2">
          {patent.title}
        </h3>
      )}

      <p className="text-sm text-text-slate-600 line-clamp-3 mb-4">
        {patent.abstract}
      </p>

      <a
        href={patent.certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-accent hover:text-white hover:bg-accent rounded-lg transition-colors"
      >
        View Certificate
        <Icon name="ArrowRightIcon" size={16} variant="outline" />
      </a>
    </div>
  );
};

export default PatentCard;
