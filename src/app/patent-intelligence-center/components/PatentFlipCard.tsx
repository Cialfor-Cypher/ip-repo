'use client';

import type { Patent } from './PatentCard';

interface Props {
  patent: Patent;
}

const PatentFlipCard = ({ patent }: Props) => {
  const isGranted = patent.status === 'Granted';
  const isPublished = patent.status === 'Published';

  const tintClass = isGranted
    ? 'glass-flip-granted'
    : isPublished
    ? 'glass-flip-published'
    : 'bg-white/60';

  return (
    <div className="group relative h-[420px] w-full max-w-[340px] [perspective:1200px]">
      <div className="absolute inset-0 duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">

        {/* ---------- FRONT ---------- */}
        <div
          className={`absolute inset-0 rounded-2xl p-6 glass-flip ${tintClass} [backface-visibility:hidden]`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                isGranted
                  ? 'bg-yellow-500/90 text-white'
                  : 'bg-emerald-500/90 text-white'
              }`}>
                {patent.status}
              </span>
            </div>

            <p className="text-sm text-text-secondary line-clamp-5 mb-6">
              {patent.abstract}
            </p>

            <div className="mt-auto text-xs text-text-secondary">
              Hover to view details
            </div>
          </div>
        </div>

        {/* ---------- BACK ---------- */}
        <div
          className={`absolute inset-0 rounded-2xl p-6 glass-flip ${tintClass} [transform:rotateX(180deg)] [backface-visibility:hidden]`}
        >
          <div className="flex flex-col h-full text-sm">
            <div className="font-semibold text-primary mb-3">
              Application Number
              <div className="text-base font-bold text-accent">
                {patent.patentNumber}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div><strong>Category:</strong> {patent.category}</div>
              <div><strong>Inventor 1:</strong> {patent.inventors?.[0] || '—'}</div>
              <div><strong>Inventor 2:</strong> {patent.inventors?.[1] || '—'}</div>
              <div className="truncate">
                <strong>Assignee:</strong> {patent.assignee}
              </div>
            </div>

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
};

export default PatentFlipCard;
