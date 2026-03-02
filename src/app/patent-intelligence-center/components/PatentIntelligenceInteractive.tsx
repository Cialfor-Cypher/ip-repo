'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import PatentCard from './PatentCard';
import PatentLandscapeMap from './PatentLandscapeMap';
import { getApiUrl } from '@/lib/api-url';

interface Patent {
  id: string;
  patentNumber?: string;
  abstract: string;
  category: string;
  status: string;
  inventors: string[];
  assignee: string;
  certificateUrl: string;
}

const PAGE_SIZE = 12;

const STATUS_FILTERS = ['Granted', 'Published'];

const CATEGORY_FILTERS = [
  'DLT',
  'AI',
  'CS',
  'Cloud Security',
  'Cryptography',
  'DF',
  'enterprise',
  'internet',
  'ML',
  'NS',
  'software',
  'Steganography',
  'virtual',
];

const PatentIntelligenceInteractive = () => {
  const [patents, setPatents] = useState<Patent[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  /* ----------------------------------------
     Reset pagination when filters change
  ----------------------------------------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatuses, selectedCategories]);

  /* ----------------------------------------
     Fetch patents
  ----------------------------------------- */
  useEffect(() => {
    const fetchPatents = async () => {
      setLoading(true);

      const params = new URLSearchParams();
      params.set('page', String(currentPage));
      params.set('limit', String(PAGE_SIZE));

      selectedStatuses.forEach((s) => params.append('status', s));
      selectedCategories.forEach((c) => params.append('category', c));

      try {
        const res = await fetch(getApiUrl('/patents', params));


        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const json = await res.json();

        setPatents(Array.isArray(json.data) ? json.data : []);
        setTotal(Number(json.total) || 0);
      } catch (error) {
        console.error('Failed to fetch patents:', error);
        setPatents([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPatents();
  }, [currentPage, selectedStatuses, selectedCategories]);

  /* ----------------------------------------
     Pagination helpers
  ----------------------------------------- */
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getVisiblePages = () => {
    const pages: number[] = [];
    const delta = 2;

    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push(-1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push(-1);
      pages.push(totalPages);
    }

    return pages;
  };

  /* ----------------------------------------
     Filter toggle helper
  ----------------------------------------- */
  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: (v: string[]) => void
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  /* ----------------------------------------
     Render
  ----------------------------------------- */
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">
          Patent Intelligence Center
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid'
                ? 'bg-accent text-white'
                : 'text-text-secondary hover:bg-muted'
            }`}
          >
            <Icon name="Squares2X2Icon" size={18} variant="outline" />
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list'
                ? 'bg-accent text-white'
                : 'text-text-secondary hover:bg-muted'
            }`}
          >
            <Icon name="Bars3Icon" size={18} variant="outline" />
          </button>
        </div>
      </div>

      {/* Landscape Map */}
      <div className="rounded-xl border border-border bg-surface p-4">
        <PatentLandscapeMap patents={patents} />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-border bg-surface p-4 space-y-4">
        <div>
          <div className="text-sm font-semibold mb-2">Status</div>
          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() =>
                  toggleFilter(status, selectedStatuses, setSelectedStatuses)
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  selectedStatuses.includes(status)
                    ? 'bg-accent text-white'
                    : 'bg-muted text-text-secondary hover:bg-muted/70'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold mb-2">Category</div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  toggleFilter(cat, selectedCategories, setSelectedCategories)
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  selectedCategories.includes(cat)
                    ? 'bg-accent text-white'
                    : 'bg-muted text-text-secondary hover:bg-muted/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Patent Cards */}
      {loading ? (
        <div className="text-center text-text-secondary py-12">
          Loading patents…
        </div>
      ) : patents.length === 0 ? (
        <div className="text-center text-text-secondary py-12">
          No patents found.
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {patents.map((patent, index) => (
            <PatentCard
              key={`${patent.id}-${patent.patentNumber ?? index}`}
              patent={patent}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 flex-wrap pt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-text-secondary hover:bg-muted rounded-lg disabled:opacity-50"
          >
            <Icon name="ChevronLeftIcon" size={20} variant="outline" />
          </button>

          {getVisiblePages().map((page, index) =>
            page === -1 ? (
              <span key={`ellipsis-${index}`} className="px-2 text-text-secondary">
                …
              </span>
            ) : (
              <button
                key={`page-${page}`}
                onClick={() => handlePageChange(page)}
                className={`min-w-[40px] h-10 px-3 rounded-lg font-semibold ${
                  currentPage === page
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:bg-muted'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 text-text-secondary hover:bg-muted rounded-lg disabled:opacity-50"
          >
            <Icon name="ChevronRightIcon" size={20} variant="outline" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PatentIntelligenceInteractive;
