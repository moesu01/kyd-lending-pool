import { StakingHeader } from "./components/StakingHeader";
import { StakingMetrics } from "./components/StakingMetrics";
import { StakingSection, KYDRewardsContainer } from "./components/StakingSection";
import { DashboardNavBar } from "./components/DashboardNavBar";

interface StakingPageProps {
  onNavigateToLanding?: () => void;
  onNavigateToLending?: () => void;
  onNavigateToStaking?: () => void;
}

export function StakingPage({ onNavigateToLanding, onNavigateToLending, onNavigateToStaking }: StakingPageProps) {
  return (
    <div className="bg-neutral-100 relative w-full min-h-screen" data-name="Dashboard Staking">
      {/* Navigation Bar - Now Sticky */}
      <div className="sticky top-0 z-30">
        <DashboardNavBar
          onNavigateToLanding={onNavigateToLanding}
          onNavigateToStaking={onNavigateToStaking}
          onNavigateToLending={onNavigateToLending}
          currentPage="stake"
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
        <StakingHeader />
        <StakingMetrics />
        <StakingSection />
        <KYDRewardsContainer />
      </div>
    </div>
  );
}
