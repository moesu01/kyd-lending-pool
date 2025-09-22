import { DashboardNavBar } from './components/DashboardNavBar';
import { PoolHeader } from './components/PoolHeader';
import { PoolMetrics } from './components/PoolMetrics';
import { DepositSection } from './components/DepositSection';

interface DashboardPageProps {
  onNavigateToLanding?: () => void;
  onNavigateToStaking?: () => void;
  onNavigateToLending?: () => void;
}

export default function DashboardPage({ onNavigateToLanding, onNavigateToStaking, onNavigateToLending }: DashboardPageProps) {
  return (
    <div className="bg-neutral-100 relative w-full min-h-screen" data-name="Dashboard Lending">
      {/* Navigation Bar - Now Sticky */}
      <div className="sticky top-0 z-30">
        <DashboardNavBar
          onNavigateToLanding={onNavigateToLanding}
          onNavigateToStaking={onNavigateToStaking}
          onNavigateToLending={onNavigateToLending}
          currentPage="lend"
          className="
          backdrop-blur-sm
          border
          bg-white/80
          border-white/10
        "
        />
      </div>
      
      {/* Main Content - Natural Flow */}
      <div className="flex flex-col gap-6 items-center justify-start w-full max-w-7xl mx-auto px-4 py-8 border-none">
        <PoolHeader />
        <PoolMetrics />
        <DepositSection />
      </div>
    </div>
  );
}