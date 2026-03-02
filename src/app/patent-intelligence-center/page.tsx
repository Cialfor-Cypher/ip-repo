import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import PatentIntelligenceInteractive from './components/PatentIntelligenceInteractive';

export const metadata: Metadata = {
  title: 'Cialfor Patents',
  description:
    'Comprehensive patent listing with advanced filtering, analytics, and patent landscape insights.',
};

export default function PatentIntelligenceCenterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      <main className="lg:ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <PatentIntelligenceInteractive />
        </div>
      </main>
    </div>
  );
}
