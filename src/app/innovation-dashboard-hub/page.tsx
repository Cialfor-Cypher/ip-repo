import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import DashboardDataLoader from './components/DashboardDataLoader';

export const metadata: Metadata = {
  title: 'Cialfor Patents',
  description:
    'Strategic overview of your patent portfolio with real-time analytics, performance metrics, and AI-powered insights.',
};

export default function InnovationDashboardPage() {
  return (
    <>
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <DashboardDataLoader />
        </main>
      </div>
    </>
  );
}
