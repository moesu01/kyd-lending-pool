import { StakingHeader } from "./components/StakingHeader";
import { StakingMetrics } from "./components/StakingMetrics";
import { StakingSection, KYDRewardsContainer } from "./components/StakingSection";
import { DashboardNavBar } from "./components/DashboardNavBar";
import { BlurredNavBar } from "./components/BlurredNavBar";

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
        {/* <DashboardNavBar
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
        /> */}
                <BlurredNavBar
          variant="dashboard"
          onNavigateToLanding={onNavigateToLanding}
          onNavigateToStaking={onNavigateToStaking}
          onNavigateToLending={onNavigateToLending}
          currentPage="stake"
          navClassName="before:from-black/100 before:via-black/100 border-t bg-black/50 border-white/0 invert"
          mobileMenuOverlayClassName="bg-white/40 backdrop-blur-md"
          mobileMenuContentClassName="before:from-black/90 before:via-black/80 invert"
          mobileMenuButtonClassName="bg-white/0 hover:bg-white/10 text-white"
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
